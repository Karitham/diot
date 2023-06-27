package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/Karitham/iDIoT/api/httpd"
	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/redis"
	"github.com/Karitham/iDIoT/api/scylla"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/urfave/cli/v2"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{})).With("pkg", "main")

func main() {
	app := cli.NewApp()
	app.Name = "iDIoT"
	app.Usage = "iDIoT"
	app.Commands = []*cli.Command{
		DB(),
		mockESP32(),
	}
	app.Flags = []cli.Flag{
		&cli.StringSliceFlag{
			Name:    "cass",
			Usage:   "IP address of cassandra nodes",
			EnvVars: []string{"CASS_ADDR"},
			Value:   cli.NewStringSlice("localhost:9042"),
			Hidden:  true,
		},
		&cli.IntFlag{
			Name:    "port",
			Usage:   "Port for HTTP server",
			EnvVars: []string{"PORT"},
			Value:   7667,
			Hidden:  true,
		},
		&cli.StringSliceFlag{
			Name:    "redis-addr",
			Usage:   "Redis address",
			EnvVars: []string{"REDIS_ADDR"},
			Value:   cli.NewStringSlice("localhost:6379"),
			Hidden:  true,
		},
		&cli.StringFlag{
			Name:    "redis-pass",
			Usage:   "Redis password",
			EnvVars: []string{"REDIS_PASS"},
			Value:   "",
			Hidden:  true,
		},
		&cli.StringFlag{
			Name:    "redis-user",
			Usage:   "Redis user",
			EnvVars: []string{"REDIS_USER"},
			Value:   "default",
			Hidden:  true,
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

	scyllaStore := scylla.New(context.Background(), cassIPs...)
	defer scyllaStore.Close()

	redisStore, err := redis.New(c.StringSlice("redis-addr"), c.String("redis-user"), c.String("redis-pass"))
	if err != nil {
		return err
	}

	defer redisStore.Close()
	subSensor := redis.NewFan[redis.SensorReading]()

	// default db subscriber
	subSensor.Subscribe("db", context.Background(), scyllaStore.ReadingsSubscriber)
	go func() {
		err := redisStore.ReadingsSub(context.Background(), subSensor)
		if err != nil {
			log.Error("main", "error", err)
		}
	}()

	subAlerts := redis.NewFan[redis.AlertEvent]()
	// default db subscriber
	subAlerts.Subscribe("db", context.Background(), scyllaStore.AlertsSubscriber)
	go func() {
		err := redisStore.AlertsSub(context.Background(), subAlerts)
		if err != nil {
			log.Error("main", "error", err)
		}
	}()

	// TODO(@Karitham): add alerts subscriber
	httpdApi := httpd.New(scyllaStore, redisStore, subSensor)

	r := chi.NewRouter()
	r.Use(httpd.Log(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{})).With("pkg", "httpd")))
	r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})
	r.Route("/v1", func(r chi.Router) {
		api.Handler(
			httpdApi,
			api.WithRouter(r),
			api.WithErrorHandler(errorH),
			api.WithAuthMiddleware(func(h http.Handler) http.Handler {
				return httpdApi.AuthMiddleware(httpdApi.PermissionsMiddleware(h))
			}),
		)
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
	rsp := httpd.WError(w, r, err, 400, err.Error())
	render.Render(w, r, rsp)
}
