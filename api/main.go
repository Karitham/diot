package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/Karitham/iDIoT/api/httpd"
	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	"github.com/urfave/cli/v2"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr)).With("pkg", "main")

func main() {
	app := cli.NewApp()
	app.Name = "iDIoT"
	app.Usage = "iDIoT"
	app.Commands = []*cli.Command{
		DB(),
	}
	app.Flags = []cli.Flag{
		&cli.StringSliceFlag{
			Name:    "cass",
			Usage:   "IP address of cassandra nodes",
			EnvVars: []string{"CASSANDRA_IPS"},
			Value:   cli.NewStringSlice("localhost:9042"),
		},
		&cli.IntFlag{
			Name:    "port",
			Usage:   "Port for HTTP server",
			EnvVars: []string{"PORT"},
			Value:   7667,
		},
	}
	app.Action = HTTPD
	if err := app.Run(os.Args); err != nil {
		log.Error("main", "error", err)
	}
}

func HTTPD(c *cli.Context) error {
	port := c.Int("port")
	cassIPs := c.StringSlice("cass")

	store := store.New(context.Background(), cassIPs...)
	defer store.Close()

	httpdApi := httpd.New(store)

	ch := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
		MaxAge:           300,
	})

	r := chi.NewRouter()
	r.Use(ch.Handler)
	r.Use(httpd.Log(slog.New(slog.NewTextHandler(os.Stderr)).With("pkg", "httpd")))
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})
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

	log.Info(fmt.Sprintf("Listening on port %d", port))
	s := &http.Server{
		Handler: r,
		Addr:    fmt.Sprintf("0.0.0.0:%d", port),
	}

	return s.ListenAndServe()
}

func errorH(w http.ResponseWriter, r *http.Request, err error) {
	slog.Error("errorHandler", "error", err)
	rsp := httpd.WError(r.Context(), 400, api.Error{Message: err.Error()})
	render.Render(w, r, rsp)
}
