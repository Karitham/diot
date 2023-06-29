package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"os/exec"

	"github.com/Karitham/iDIoT/api/session"
	"github.com/Karitham/iDIoT/media-server/ioutils"
	"github.com/go-chi/chi/v5"
	"github.com/nareix/joy4/av"
	"github.com/nareix/joy4/av/avutil"
	"github.com/nareix/joy4/format/flv"
)

func SubscribeVideoHandler(
	auth func(ctx context.Context, token string, has ...session.Permission) bool,
	pq *PubQ,
) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		channel := chi.URLParam(r, "channel")
		key := r.URL.Query().Get("api-key")
		if !auth(r.Context(), key, session.PermSensorRead.Customize(channel)) {
			w.WriteHeader(401)
			return
		}

		w.Header().Set("Content-Type", "video/x-flv")
		w.Header().Set("Transfer-Encoding", "chunked")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		w.WriteHeader(200)
		flusher := w.(http.Flusher)
		flusher.Flush()

		chann, err := pq.GetFilesFromChannel(r.Context(), channel)
		if err != nil {
			log.Error("getting files from channel", "error", err)
			return
		}

		f, err := jpegFramesToFLV(r.Context(), chann)
		if err != nil {
			log.Error("streaming error", "error", err)
			return
		}

		muxer := flv.NewMuxerWriteFlusher(ioutils.WriteFlusher{HTTPFlusher: flusher, Writer: w})
		err = avutil.CopyFile(muxer, f)
		if err != nil {
			log.Error("streaming error", "error", err)
		}
	}
}

func jpegFramesToFLV(ctx context.Context, r io.Reader) (av.Demuxer, error) {
	pr, pw := io.Pipe()

	go func() {
		err := ffmpegFromJPGToFLV(ctx, r, pw)
		if err != nil {
			log.Error("streaming error", "error", err)
		}
	}()

	return flv.NewDemuxer(pr), nil
}

const FPS = 4

func ffmpegFromJPGToFLV(ctx context.Context, r io.Reader, w io.Writer) error {
	cmd := exec.CommandContext(ctx, "ffmpeg",
		"-f", "mjpeg", // input format
		"-i", "pipe:0", // input from stdin
		"-r", fmt.Sprintf("%d", FPS), // framerate
		"-an",             // no audio
		"-c:v", "libx264", // h264
		"-preset", "ultrafast", // needed for low latency
		"-pix_fmt", "yuv420p", // needed for html5 video
		"-g", fmt.Sprintf("%d", FPS), // keyframe every FPS frames
		"-f", "flv", // output format
		"pipe:1", // output to stdout
	)
	buf := &bytes.Buffer{}

	cmd.Stdin = r
	cmd.Stderr = buf
	cmd.Stdout = w

	err := cmd.Run()
	if err != nil && ctx.Err() == nil {
		return fmt.Errorf("ffmpeg error: %w, stderr: %s", err, buf.String())
	}

	return nil
}
