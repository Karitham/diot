package redis

import "context"

// AlertSub blocks and waits for messages on the alerts channel.
func (s *Store) AlertSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel(alertChannel).Build(), eh.OnEvent)
}
