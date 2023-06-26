package main

import (
	"io"
	"mime"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
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

		pubQ.mu.Lock()
		tmpDir, err := os.MkdirTemp(os.TempDir(), "mediaproxy-*-"+chi.URLParam(r, "channel"))
		if err != nil {
			w.WriteHeader(500)
			return
		}
		pubQ.files[chi.URLParam(r, "channel")] = os.DirFS(tmpDir)
		pubQ.mu.Unlock()

		mt, mu, err := mime.ParseMediaType(r.Header.Get("Content-Type"))
		if err != nil {
			w.WriteHeader(500)
			return
		}

		if mt != "multipart/form-data" {
			w.WriteHeader(400)
			return
		}

		mr := multipart.NewReader(r.Body, mu["boundary"])
		for mpart, err := mr.NextPart(); err == nil; mpart, err = mr.NextPart() {
			log.Debug("received frame", "channel", chi.URLParam(r, "channel"), "user", user, "filename", mpart.FileName())
			tf, err := os.Create(filepath.Join(tmpDir, time.Now().Format(time.RFC3339Nano)+".jpg"))
			if err != nil {
				w.WriteHeader(500)
				return
			}

			defer tf.Close()
			io.Copy(tf, mpart)
		}

		w.WriteHeader(200)
	}
}
