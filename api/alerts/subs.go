package alerts

import (
	"context"

	"github.com/Karitham/iDIoT/api/store"
	"github.com/go-json-experiment/json"
)

const (
	iotPrefix = "iot:"

	sensorChannel = iotPrefix + "sensor"
	alertChannel  = iotPrefix + "alert"
)

// ReadingsSub blocks and waits for messages on the sensor channel.
func (s *Store) ReadingsSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel(sensorChannel).Build(), eh.OnEvent)
}

func (s *Store) ReadingsPub(ctx context.Context, r store.SensorReading) error {
	jsonData, err := json.Marshal(r)
	if err != nil {
		return err
	}

	return s.client.Do(ctx, s.client.B().Publish().Channel(sensorChannel).Message(string(jsonData)).Build()).Error()
}

// AlertSub blocks and waits for messages on the alerts channel.
func (s *Store) AlertSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel(alertChannel).Build(), eh.OnEvent)
}
