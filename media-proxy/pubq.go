package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"time"

	"github.com/dgraph-io/badger/v4"
	"golang.org/x/exp/slog"
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

func (p *PubQ) GetFilesFromChannel(ctx context.Context, channel string) (<-chan io.Reader, error) {
	out := make(chan io.Reader, 4)
	go func() {
		log.Debug("starting to get files from channel", "channel", channel)
		defer func() {
			log.Debug("closing channel", "channel", channel)
			close(out)
		}()

		for {

			select {
			case <-ctx.Done():
				log.Debug("done getting files from channel", "channel", channel, "error", ctx.Err())
				return
			default:
				if len(out) == cap(out) {
					time.Sleep(20 * time.Millisecond)
					continue
				}

				it := p.badger.NewTransaction(false).NewIterator(badger.IteratorOptions{
					PrefetchSize:   1,
					PrefetchValues: true,
					Prefix:         prefixChannel(channel),
				})
				it.Seek(prefixFile(channel, time.Now().Add(-1*time.Second)))
				if !it.Valid() {
					it.Close()
					time.Sleep(20 * time.Millisecond)
					continue
				}

				outbuf := make([]byte, 0, it.Item().ValueSize())
				item, err := it.Item().ValueCopy(outbuf)
				if err != nil {
					log.ErrorCtx(ctx, "error while getting files from channel", "error", err)
					return
				}

				if log.Enabled(ctx, slog.LevelDebug) {
					key := it.Item().KeyCopy(nil)
					log.Debug("sending file", "channel", channel, "file", key)
				}

				out <- bytes.NewBuffer(item)
				it.Close()
			}

		}
	}()

	return out, nil
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
