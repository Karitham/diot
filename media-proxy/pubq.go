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

func prefixFile(channel string, t time.Time) []byte {
	return []byte(fmt.Sprintf("channel:%s:%d", channel, t.UnixMilli()))
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
				p.badger.View(func(txn *badger.Txn) error {
					it := txn.NewIterator(badger.IteratorOptions{
						Prefix:  prefixChannel(channel),
						Reverse: true,
					})
					defer it.Close()

					it.Seek(prefixFile(channel, time.Now()))
					if !it.Valid() {
						log.Debug("no files in channel", "channel", channel)
						time.Sleep(20 * time.Millisecond)
						return nil
					}

					err := it.Item().Value(func(val []byte) error {
						writer.Write(val)
						return nil
					})
					if err != nil {
						log.ErrorCtx(ctx, "error while getting files from channel", "error", err)
						return err
					}

					return nil
				})
			}
		}
	}()

	return reader, nil
}

func (p *PubQ) PublishFile(ctx context.Context, channel string, contents []byte, TTL time.Duration) error {
	return p.badger.Update(func(txn *badger.Txn) error {
		key := prefixFile(channel, time.Now())

		err := txn.SetEntry(&badger.Entry{
			Key:       []byte(key),
			Value:     contents,
			ExpiresAt: uint64(time.Now().Add(TTL).Unix()),
		})
		if err != nil {
			return err
		}

		return nil
	})
}
