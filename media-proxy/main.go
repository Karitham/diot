package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/Karitham/iDIoT/api/httpd"
	"github.com/Karitham/iDIoT/api/redis"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/dgraph-io/badger/v4"
	"github.com/go-chi/chi/v5"
	"github.com/nareix/joy4/format"
	"github.com/urfave/cli/v2"
	"golang.org/x/exp/slog"
)

func init() {
	format.RegisterAll()
}

var logLevel = &slog.LevelVar{}
var log = slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
	Level:     logLevel,
	AddSource: true,
}))

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

			&cli.StringFlag{
				Name:    "data-dir",
				Usage:   "Directory to store data",
				EnvVars: []string{"DATA_DIR"},
				Value:   "data",
			},

			&cli.IntFlag{
				Name:    "log-level",
				Usage:   "Log level",
				EnvVars: []string{"LOG_LEVEL"},
				Value:   0,
			},
		},
		Action: Main,
	}

	app.Run(os.Args)
}

func Main(c *cli.Context) error {
	logLevel.Set(slog.Level(c.Int("log-level")))
	opts := badger.DefaultOptions(c.String("data-dir"))
	opts.Logger = nil
	b, err := badger.Open(opts)
	if err != nil {
		return err
	}
	pq := NewPubQ(b)

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
