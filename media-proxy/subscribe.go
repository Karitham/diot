package main

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os/exec"

	"github.com/go-chi/chi/v5"
	"github.com/nareix/joy4/av"
	"github.com/nareix/joy4/av/avutil"
	"github.com/nareix/joy4/format/flv"
)

func SubscribeVideoHandler(
	validToken func(token string) bool,
	pq *PubQ,
) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "video/x-flv")
		w.Header().Set("Transfer-Encoding", "chunked")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		w.WriteHeader(200)
		flusher := w.(http.Flusher)
		flusher.Flush()

		chann, ok := pq.files[chi.URLParam(r, "channel")]
		if !ok {
			log.Error("channel not found", "channel", chi.URLParam(r, "channel"))
			return
		}

		f, err := jpegFramesToFLV(chann)
		if err != nil {
			log.Error("streaming error", "error", err)
			return
		}

		muxer := flv.NewMuxerWriteFlusher(writeFlusher{httpflusher: flusher, Writer: w})
		err = avutil.CopyFile(muxer, f)
		if err != nil {
			log.Error("streaming error", "error", err)
		}
	}
}

func jpegFramesToFLV(dir fs.FS) (av.Demuxer, error) {
	matches, err := fs.Glob(dir, "*.jpg")
	if err != nil {
		return nil, err
	}

	log.Info("found files", "len", len(matches))
	multiFileReader := &jpegToMJPEGReader{files: matches, dir: dir}

	pr, pw := io.Pipe()
	go func() {
		ffmpegFromJPGToFLV(context.Background(), multiFileReader, pw)
	}()

	return flv.NewDemuxer(pr), nil
}

type jpegToMJPEGReader struct {
	files  []string
	dir    fs.FS
	offset int

	buf *bufio.Reader

	currentFile fs.File
}

func (m *jpegToMJPEGReader) Read(p []byte) (n int, err error) {
	if m.currentFile == nil {
		m.currentFile, err = m.dir.Open(m.files[m.offset])
		if err != nil {
			return 0, err
		}

		m.buf = bufio.NewReader(m.currentFile)
	}

	n, err = m.buf.Read(p)
	if err == io.EOF {
		m.currentFile.Close()
		if m.offset == len(m.files)-1 {
			return n, err
		}

		m.offset++
		m.currentFile = nil
		return n, nil
	}

	return n, err
}

func (m *jpegToMJPEGReader) Close() error {
	if m.currentFile != nil {
		return m.currentFile.Close()
	}

	return nil
}

func ffmpegFromJPGToFLV(ctx context.Context, r io.Reader, w io.Writer) error {
	cmd := exec.CommandContext(ctx, "ffmpeg",
		"-f", "mjpeg",
		"-i", "pipe:0",
		"-r", "60",
		"-c:v", "libx264",
		"-f", "flv",
		"pipe:1",
	)
	buf := bytes.Buffer{}
	cmd.Stdin = r
	cmd.Stderr = &buf
	cmd.Stdout = w

	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("ffmpeg error: %w, stderr: %s", err, buf.String())
	}

	return nil
}
