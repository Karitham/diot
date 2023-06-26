package redis

import (
	"os"

	"github.com/redis/rueidis"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
	Level: slog.LevelError,
})).With("pkg", "redis")

const (
	iotPrefix = "iot:"

	sensorChannel = iotPrefix + "sensor"
	alertChannel  = iotPrefix + "alert"
)

type Store struct {
	client rueidis.Client
}

func New(address []string, user, pass string) (*Store, error) {
	client, err := rueidis.NewClient(rueidis.ClientOption{
		InitAddress: address,
		Password:    pass,
		Username:    user,
	})
	if err != nil {
		return nil, err
	}

	return &Store{client: client}, nil
}

func (s *Store) Close() error {
	s.client.Close()
	return nil
}
