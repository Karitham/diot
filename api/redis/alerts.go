package redis

import (
	"context"
	"time"

	"github.com/go-json-experiment/json"
)

type AlertEvent struct {
	IDIot string `json:"id_iot"`
	// fire or flooding or bad air quality or battery low or intrusion
	Type string `json:"type"`
	// no value for intrusion and incident field = temperature or humidity or air quality or battery
	IncidentField string `json:"incident field"`

	// "2023-06-18 10:20:05"
	Time time.Time `json:"time"`
	// no value for intrusion or battery
	Criticity string `json:"criticity"`
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
