package main

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os"
	"sync"

	"github.com/Karitham/iDIoT/api/httpd"
	"github.com/Karitham/iDIoT/api/redis"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/go-chi/chi/v5"
	"github.com/nareix/joy4/format"
	"github.com/urfave/cli/v2"
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
	app := &cli.App{
		Name: "media-proxy",
		Flags: []cli.Flag{
			&cli.StringSliceFlag{
				Name:    "redis-addr",
				Usage:   "Redis address",
				EnvVars: []string{"REDIS_ADDR"},

				Value: cli.NewStringSlice("localhost:6379"),
			},

			&cli.StringFlag{
				Name:    "redis-pass",
				Usage:   "Redis password",
				EnvVars: []string{"REDIS_PASS"},
				Value:   "",
			},

			&cli.StringFlag{
				Name:    "redis-user",
				Usage:   "Redis user",
				EnvVars: []string{"REDIS_USER"},
				Value:   "",
			},

			&cli.IntFlag{
				Name:    "port",
				Usage:   "Port for HTTP server",
				EnvVars: []string{"PORT"},
				Value:   8089,
			},
		},
		Action: Main,
	}

	app.Run(os.Args)
}

func Main(c *cli.Context) error {
	pq := &PubQ{
		files: make(map[string]fs.FS),
		mu:    sync.Mutex{},
	}

	rd, err := redis.New(c.StringSlice("redis-addr"), c.String("redis-user"), c.String("redis-pass"))
	if err != nil {
		return err
	}

	r := chi.NewRouter()

	r.Use(httpd.Log(log))
	r.Get("/video/{channel}", SubscribeVideoHandler(ValidToken(rd), pq))
	r.Post("/video/{channel}", PostFramesHandler(func(user, pass string) error { return nil }, pq))

	log.Info("starting server", "port", c.Int("port"))
	return http.ListenAndServe(fmt.Sprintf(":%d", c.Int("port")), r)
}

func ValidToken(r *redis.Store) func(ctx context.Context, token string, has ...session.Permission) bool {
	return func(ctx context.Context, token string, has ...session.Permission) bool {
		sid, err := session.Parse([]byte(token))
		if err != nil {
			return false
		}

		session, err := r.GetSession(ctx, sid)
		if err != nil {
			return false
		}

		if err := session.Permissions.Can(has...); err != nil {
			return false
		}

		return true
	}
}
