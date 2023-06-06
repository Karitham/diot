package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/Karitham/iDIoT/api/httpd"
	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr)).With("pkg", "main")

func main() {
	port := flag.Int("port", 7667, "Port for test HTTP server")
	cassIPs := flag.String("cass", "localhost:9040", "IP address of cassandra")
	flag.Parse()

	IPs := strings.Split(*cassIPs, ",")
	store := store.New(context.Background(), IPs...)
	defer store.Close()

	httpdApi := httpd.New(store)

	r := chi.NewRouter()
	r.Use(httpd.Log(slog.New(slog.NewTextHandler(os.Stderr)).With("pkg", "httpd")))
	r.Route("/v1", func(r chi.Router) {
		api.Handler(
			httpdApi,
			api.WithRouter(r),
			api.WithErrorHandler(errorH),
			api.WithMiddleware("auth", func(h http.Handler) http.Handler {
				return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
					httpdApi.AuthMiddleware(httpdApi.PermissionsMiddleware(h)).ServeHTTP(w, r)
				})
			}))
	})

	log.Info(fmt.Sprintf("Listening on port %d", *port))
	s := &http.Server{
		Handler: r,
		Addr:    fmt.Sprintf("0.0.0.0:%d", *port),
	}

	err := s.ListenAndServe()
	if err != nil {
		log.Error("ListenAndServe", "error", err)
	}
}

func errorH(w http.ResponseWriter, r *http.Request, err error) {
	slog.Error("errorHandler", "error", err)
	rsp := httpd.WError(r.Context(), 400, api.Error{Message: err.Error()})
	render.Render(w, r, rsp)
}
