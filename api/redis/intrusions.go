package redis

import (
	"context"
	"encoding/base64"

	"github.com/go-json-experiment/json"
)

const IntrusionChannel = iotPrefix + "camera"

type Intrusion struct {
	IDIoT string `json:"id_iot"`
	Image string `json:"image"`
}

type Base64String string

func (b Base64String) MarshalJSON() ([]byte, error) {
	out := make([]byte, base64.RawStdEncoding.EncodedLen(len(b)))
	base64.RawStdEncoding.Encode(out, []byte(b))
	return out, nil
}

func (b *Base64String) UnmarshalJSON(data []byte) error {
	decoded := make([]byte, base64.RawStdEncoding.DecodedLen(len(data)))
	n, err := base64.RawStdEncoding.Decode(decoded, data)
	if err != nil {
		return err
	}
	*b = Base64String(decoded[:n])
	return nil
}

func (s *Store) IntrusionPub(ctx context.Context, intrusion Intrusion) error {
	jsonData, err := json.Marshal(intrusion)
	if err != nil {
		return err
	}

	return s.client.Do(ctx, s.client.B().Publish().Channel(IntrusionChannel).Message(string(jsonData)).Build()).Error()
}
