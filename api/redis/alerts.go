package redis

import (
	"context"
	"time"

	"github.com/go-json-experiment/json"
)

type AlertEvent struct {
	ID          string    `json:"id"`
	Type        string    `json:"type"`
	Temperature *float32  `json:"temperature,omitempty"`
	Humidity    *float32  `json:"humidity,omitempty"`
	AirQuality  *float32  `json:"air quality,omitempty"`
	Timestamp   time.Time `json:"timestamp"`
	Criticity   int       `json:"criticity"`
}

// AlertsSub blocks and waits for messages on the alerts channel.
func (s *Store) AlertsSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel(alertChannel).Build(), eh.OnEvent)
}

// AlertsPub publishes an alert event.
func (s *Store) AlertsPub(ctx context.Context, e AlertEvent) error {
	jsonData, err := json.Marshal(e)
	if err != nil {
		return err
	}

	return s.client.Do(ctx, s.client.B().Publish().Channel(alertChannel).Message(string(jsonData)).Build()).Error()
}
