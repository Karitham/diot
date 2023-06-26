package main

import (
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os"
	"sync"

	"github.com/Karitham/iDIoT/api/httpd"
	"github.com/go-chi/chi/v5"
	"github.com/nareix/joy4/format"
	"golang.org/x/exp/slog"
)

func init() {
	format.RegisterAll()
}

type writeFlusher struct {
	httpflusher http.Flusher
	io.Writer
}

func (wf writeFlusher) Flush() error {
	wf.httpflusher.Flush()
	return nil
}

var log = slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
	Level: slog.LevelDebug,
}))

type PubQ struct {
	mu    sync.Mutex
	files map[string]fs.FS
}

func main() {
	pq := &PubQ{
		files: make(map[string]fs.FS),
		mu:    sync.Mutex{},
	}
	r := chi.NewRouter()

	r.Use(httpd.Log(log))
	r.Get("/video/{channel}", SubscribeVideoHandler(func(token string) bool { return true }, pq))
	r.Post("/video/{channel}", PostFramesHandler(func(user, pass string) error { return nil }, pq))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8089"
	}

	log.Info("starting server", "port", port)
	http.ListenAndServe(fmt.Sprintf(":%s", port), r)
}
