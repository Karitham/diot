package main

import (
	"context"
	"fmt"
	"io"
	"time"

	"github.com/dgraph-io/badger/v4"
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
	return []byte(fmt.Sprintf("channel:%s:", channel))
}

func (p *PubQ) GetFilesFromChannel(ctx context.Context, channel string) (io.Reader, error) {
	reader, writer := io.Pipe()
	go func() {
		log.Debug("starting to get files from channel", "channel", channel)

		for {
			select {
			case <-ctx.Done():
				log.Debug("done getting files from channel", "channel", channel, "error", ctx.Err())
				return
			default:
				item, err := p.badger.NewTransaction(false).Get(prefixChannel(channel))
				if err != nil {
					log.ErrorCtx(ctx, "error while getting files from channel", "error", err)
					return
				}

				err = item.Value(func(val []byte) error {
					writer.Write(val)
					return nil
				})
				if err != nil {
					log.ErrorCtx(ctx, "error while getting files from channel", "error", err)
					continue
				}
			}

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
