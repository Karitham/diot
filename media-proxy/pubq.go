package main

import (
	"context"
	"fmt"
	"io"
	"time"

	"github.com/dgraph-io/badger/v4"
	"github.com/dgraph-io/badger/v4/pb"
)

type PubQ struct {
	badger *badger.DB
}

func NewPubQ(db *badger.DB) *PubQ {
	return &PubQ{
		badger: db,
	}
}

func prefixChannel(channel string) []byte {
	return []byte(fmt.Sprintf("channel:%s", channel))
}

func (p *PubQ) GetFilesFromChannel(ctx context.Context, channel string) (io.Reader, error) {
	reader, writer := io.Pipe()
	err := p.badger.View(func(txn *badger.Txn) error {
		item, err := txn.Get(prefixChannel(channel))
		if err != nil {
			return fmt.Errorf("error getting file from badger: %w", err)
		}

		return item.Value(func(val []byte) error {
			_, err := writer.Write(val)
			if err != nil {
				return fmt.Errorf("error writing to pipe: %w", err)
			}
			return nil
		})
	})
	if err != nil {
		log.Error("error getting file from badger", "error", err)
		return nil, err
	}

	go func() {
		log.Debug("starting to get files from channel", "channel", channel)
		err := p.badger.Subscribe(ctx, func(kv *badger.KVList) error {
			for _, item := range kv.Kv {
				_, err := writer.Write(item.Value)
				if err != nil {
					log.Error("error writing to pipe", "error", err)
					return err
				}
			}
			return nil
		}, []pb.Match{
			{
				Prefix: prefixChannel(channel),
			},
		})
		if err != nil {
			log.Error("error subscribing to badger", "error", err)
			return
		}
	}()

	return reader, nil
}

func (p *PubQ) PublishFile(ctx context.Context, channel string, contents []byte, TTL time.Duration) error {
	return p.badger.Update(func(txn *badger.Txn) error {
		return txn.SetEntry(&badger.Entry{
			Key:       prefixChannel(channel),
			Value:     contents,
			ExpiresAt: uint64(time.Now().Add(TTL).Unix()),
		})
	})
}
