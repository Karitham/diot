package main

import (
	"context"
	"encoding/json"
	"time"

	badrand "math/rand"

	"github.com/Karitham/iDIoT/api/redis"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/urfave/cli/v2"
)

func mockESP32() *cli.Command {
	return &cli.Command{
		Name:  "mock",
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
	}
}

func mockData(deviceID string) store.SensorReading {
	p := func() *float32 {
		x := badrand.Float32() * 100
		return &x
	}

	return store.SensorReading{
		IoTID:       deviceID,
		Time:        time.Now(),
		Temperature: p(),
		Humidity:    p(),
		Iaq:         p(),
	}
}
