package redis

import (
	"context"
	"encoding/json"
	"time"
)

type SensorReading struct {
	IoTID       string    `json:"id_iot"`
	Time        time.Time `json:"time"`
	Temperature *float32  `json:"temperature"`
	Humidity    *float32  `json:"humidity"`
	Iaq         *float32  `json:"iaq"`
	Battery     *float32  `json:"battery"`
}

// ReadingsSub blocks and waits for messages on the sensor channel.
func (s *Store) ReadingsSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel(sensorChannel).Build(), eh.OnEvent)
}

func (s *Store) ReadingsPub(ctx context.Context, r SensorReading) error {
	jsonData, err := json.Marshal(r)
	if err != nil {
		return err
	}

	return s.client.Do(ctx, s.client.B().Publish().Channel(sensorChannel).Message(string(jsonData)).Build()).Error()
}
