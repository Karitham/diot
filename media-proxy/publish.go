package main

import (
	"io"
	"mime"
	"mime/multipart"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

// read all files from the request body (multipart form data)
// for each file, write to file-system and pass fs path to publish q
// return 200 if all files were written to fs and published to q
func PostFramesHandler(validBasicAuth func(user, pass string) error, pubQ *PubQ) func(w http.ResponseWriter, r *http.Request) {
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
			w.WriteHeader(500)
			return
		}

		log.Debug("got request", "channel", channel, "content-type", mt, "boundary", mu["boundary"])

		if mt != "multipart/form-data" {
			w.WriteHeader(400)
			return
		}

		mr := multipart.NewReader(r.Body, mu["boundary"])
		for mpart, err := mr.NextPart(); err == nil; mpart, err = mr.NextPart() {
			buf, err := io.ReadAll(mpart)
			if err != nil {
				w.WriteHeader(500)
				return
			}

			log.Debug("got part", "part", mpart.FileName(), "size", len(buf))
			err = pubQ.PublishFile(r.Context(), channel, buf, time.Hour)
			if err != nil {
				w.WriteHeader(500)
				return
			}
		}

		w.WriteHeader(200)
	}
}
