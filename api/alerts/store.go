package alerts

import (
	"github.com/redis/rueidis"
)

type Store struct {
	client rueidis.Client
}

func NewStore(address []string, pass string) (*Store, error) {
	client, err := rueidis.NewClient(rueidis.ClientOption{
		InitAddress: address,
		Password:    pass,
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
