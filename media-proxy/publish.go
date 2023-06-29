package main

import (
	"context"
	"io"
	"mime"
	"mime/multipart"
	"net/http"
	"time"

	"github.com/Karitham/iDIoT/api/redis"
	"github.com/go-chi/chi/v5"
)

// read all files from the request body (multipart form data)
// for each file, write to file-system and pass fs path to publish q
// return 200 if all files were written to fs and published to q
func PostFramesHandler(
	validBasicAuth func(user, pass string) error,
	publishPublisher func(ctx context.Context, channel string) error,
	pubQ *PubQ,
) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		// use basic auth to authenticate the publisher
		user, pass, _ := r.BasicAuth()
		if err := validBasicAuth(user, pass); err != nil {
			w.WriteHeader(401)
			return
		}

		channel := chi.URLParam(r, "channel")
		mt, mu, err := mime.ParseMediaType(r.Header.Get("Content-Type"))
		if err != nil {
			log.Error("failed to parse content-type", "err", err)
			w.WriteHeader(500)
			return
		}

		log.Debug("got request", "channel", channel, "content-type", mt, "boundary", mu["boundary"])

		if mt != "multipart/form-data" {
			w.WriteHeader(400)
			return
		}

		go publishPublisher(context.Background(), channel)

		mr := multipart.NewReader(r.Body, mu["boundary"])
		for mpart, err := mr.NextPart(); err == nil; mpart, err = mr.NextPart() {
			buf, err := io.ReadAll(mpart)
			if err != nil {
				w.WriteHeader(500)
				return
			}

			log.Debug("got part", "part", mpart.FileName(), "size", len(buf))
			err = pubQ.PublishFile(r.Context(), channel, buf, 24*time.Hour)
			if err != nil {
				w.WriteHeader(500)
				return
			}
		}

		w.WriteHeader(200)
	}
}

// read all files from the request body (multipart form data)
// for each file, write to file-system and pass fs path to publish q
// return 200 if all files were written to fs and published to q
func PostFrameHandler(
	validBasicAuth func(user, pass string) error,
	publishPublisher func(ctx context.Context, channel string) error,
	publishIntrusion func(ctx context.Context, intrusion redis.Intrusion) error,
	pubQ *PubQ,
) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		// use basic auth to authenticate the publisher
		user, pass, _ := r.BasicAuth()
		if err := validBasicAuth(user, pass); err != nil {
			w.WriteHeader(401)
			return
		}

		channel := chi.URLParam(r, "channel")
		log.Debug("got request", "channel", channel)

		if v := r.Header.Get("X-Intrusion"); v != "" {
			log.Debug("got intrusion", "channel", channel, "intrusion", v)
			err := publishIntrusion(r.Context(), redis.Intrusion{
				IDIoT: channel,
				Image: v,
			})
			if err != nil {
				log.Error("failed to publish intrusion", "err", err)
				w.WriteHeader(500)
				return
			}
		}

		go publishPublisher(context.Background(), channel)

		buf, err := io.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(500)
			return
		}

		err = pubQ.PublishFile(r.Context(), channel, buf, 24*time.Hour)
		if err != nil {
			w.WriteHeader(500)
			return
		}

		w.WriteHeader(200)
	}
}
