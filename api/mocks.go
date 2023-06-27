package main

import (
	"context"
	"encoding/json"
	"time"

	badrand "math/rand"

	"github.com/Karitham/iDIoT/api/redis"
	"github.com/urfave/cli/v2"
)

func mockESP32() *cli.Command {
	return &cli.Command{
		Name:  "mock",
		Usage: "mock data",
		Flags: []cli.Flag{},
		Subcommands: []*cli.Command{
			{
				Name:  "esp32",
				Usage: "mock esp32 data",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:  "device_id",
						Value: "esp32_snowflake",
					},
				},
				Action: func(c *cli.Context) error {
					alertStore, err := redis.New(c.StringSlice("redis-addr"), c.String("redis-user"), c.String("redis-pass"))
					if err != nil {
						return err
					}

					defer alertStore.Close()

					for {
						data := mockData(c.String("device_id"))
						err := alertStore.ReadingsPub(context.Background(), data)
						if err != nil {
							log.Error("mock", "error", err)
						}

						jsonData, err := json.Marshal(data)
						if err != nil {
							log.Error("mock", "error", err)
						}

						log.Info("mock", "message", string(jsonData))

						time.Sleep(time.Second)
					}
				},
			},
			{
				Name:  "alerts",
				Usage: "mock alerts",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:  "device_id",
						Value: "esp32_snowflake",
					},
					&cli.StringFlag{
						Name:  "criticity",
						Value: "2",
					},
					&cli.StringFlag{
						Name:  "message",
						Value: "mock alert",
					},
					&cli.StringFlag{
						Name:  "type",
						Value: "fire",
					},
				},
				Action: func(c *cli.Context) error {
					alertStore, err := redis.New(c.StringSlice("redis-addr"), c.String("redis-user"), c.String("redis-pass"))
					if err != nil {
						return err
					}

					defer alertStore.Close()

					return alertStore.AlertsPub(context.Background(), redis.AlertEvent{
						IDIot:         c.String("device_id"),
						Type:          c.String("type"),
						IncidentField: c.String("message"),
						Criticity:     c.String("criticity"),
						Time:          time.Now(),
					})
				},
			},
		},
	}
}

func mockData(deviceID string) redis.SensorReading {
	p := func() *float32 {
		x := badrand.Float32() * 100
		return &x
	}

	return redis.SensorReading{
		IoTID:       deviceID,
		Time:        time.Now(),
		Temperature: p(),
		Humidity:    p(),
		Iaq:         p(),
	}
}
