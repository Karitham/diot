package redis

import (
	"context"
	"os"
	"sync"

	"github.com/go-json-experiment/json"
	"github.com/redis/rueidis"
	"github.com/sourcegraph/conc"
)

type SubFanHandle[T any] struct {
	subMu   sync.Mutex
	subs    map[string]subscriber[T]
	wg      conc.WaitGroup
	ctx     context.Context
	onEvent func(message rueidis.PubSubMessage)
}

type subscriber[T any] struct {
	ctx context.Context
	sub func(ctx context.Context, message T)
}

func (sh *SubFanHandle[T]) OnEvent(message rueidis.PubSubMessage) {
	go sh.onEvent(message)
}

func (sh *SubFanHandle[T]) Subscribe(k string, ctx context.Context, sub func(ctx context.Context, message T)) {
	sh.subMu.Lock()
	sh.subs[k] = subscriber[T]{ctx: ctx, sub: sub}
	sh.subMu.Unlock()
}

func (sh *SubFanHandle[T]) Unsubscribe(k string) {
	sh.subMu.Lock()
	delete(sh.subs, k)
	sh.subMu.Unlock()
}

// NewFan allows to fan out messages to all registered callbacks
func NewFan[T any]() *SubFanHandle[T] {
	sh := &SubFanHandle[T]{
		subMu: sync.Mutex{},
		subs:  make(map[string]subscriber[T]),
	}

	sh.onEvent = func(message rueidis.PubSubMessage) {
		var msg T
		os.Stderr.WriteString(message.Message + "\n")
		json.Unmarshal([]byte(message.Message), &msg)
		for k, sub := range sh.subs {
			if sub.ctx.Err() != nil {
				sh.subMu.Lock()
				delete(sh.subs, k)
				sh.subMu.Unlock()
				continue
			}

			sh.wg.Go(func() {
				sub.sub(sub.ctx, msg)
			})
		}
		sh.wg.Wait()
	}

	return sh
}

type EventHandler interface {
	OnEvent(message rueidis.PubSubMessage)
}
