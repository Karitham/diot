package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/Karitham/iDIoT/api/httpd"
	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"golang.org/x/exp/slog"
)

func main() {
	port := flag.Int("port", 7667, "Port for test HTTP server")
	cassIP := flag.String("cass", "localhost", "IP address of cassandra")
	flag.Parse()

	store := store.New(*cassIP)
	defer store.Close()

	r := chi.NewRouter()
	r.Route("/v1", func(r chi.Router) {
		api.Handler(httpd.New(store), api.WithRouter(r), api.WithErrorHandler(errorH))
	})

	s := &http.Server{
		Handler: r,
		Addr:    fmt.Sprintf("0.0.0.0:%d", *port),
	}

	log.Fatal(s.ListenAndServe())
}

func errorH(w http.ResponseWriter, r *http.Request, err error) {
	slog.Error("errorHandler", "error", err)
	rsp := httpd.WError(r.Context(), 400, api.Error{Message: err.Error()})
	render.Render(w, r, rsp)
}
