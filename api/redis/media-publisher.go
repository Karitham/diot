package redis

import (
	"context"

	"github.com/go-json-experiment/json"
)

const mediaPublisherChannel = "media-publisher"

type MediaPublisher struct {
	IoTID string `json:"iot_id"`
}

func (s *Store) MediaPublisherSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel(mediaPublisherChannel).Build(), eh.OnEvent)
}

func (s *Store) MediaPublisherPub(ctx context.Context, e MediaPublisher) error {
	jsonData, err := json.Marshal(e)
	if err != nil {
		return err
	}

	return s.client.Do(ctx, s.client.B().Publish().Channel(mediaPublisherChannel).Message(string(jsonData)).Build()).Error()
}
