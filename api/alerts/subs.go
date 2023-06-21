package alerts

import "context"

const (
	iotPrefix = "iot:"

	sensorChannel = iotPrefix + "sensor"
	alertChannel  = iotPrefix + "alert"
)

// ReadingsSub blocks and waits for messages on the sensor channel.
func (s *Store) ReadingsSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel(sensorChannel).Build(), eh.OnEvent)
}

// AlertSub blocks and waits for messages on the alerts channel.
func (s *Store) AlertSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel(alertChannel).Build(), eh.OnEvent)
}
