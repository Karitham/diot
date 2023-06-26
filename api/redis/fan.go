package redis

import (
	"context"
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
	sh.onEvent(message)
}

func (sh *SubFanHandle[T]) Subscribe(k string, ctx context.Context, sub func(ctx context.Context, message T)) {
	sh.subMu.Lock()
	defer sh.subMu.Unlock()
	sh.subs[k] = subscriber[T]{ctx: ctx, sub: sub}
}

func (sh *SubFanHandle[T]) Unsubscribe(k string) {
	sh.subMu.Lock()
	defer sh.subMu.Unlock()
	delete(sh.subs, k)
}

// NewFan allows to fan out messages to all registered callbacks
func NewFan[T any]() *SubFanHandle[T] {
	sh := &SubFanHandle[T]{
		subMu: sync.Mutex{},
		subs:  make(map[string]subscriber[T]),
	}

	sh.onEvent = func(message rueidis.PubSubMessage) {
		var msg T
		json.Unmarshal([]byte(message.Message), &msg)
		sh.subMu.Lock()
		for k, sub := range sh.subs {
			if sub.ctx.Err() != nil {
				delete(sh.subs, k)
				continue
			}

			sh.wg.Go(func() {
				sub.sub(sub.ctx, msg)
			})
		}
		sh.subMu.Unlock()
		sh.wg.Wait()
	}

	return sh
}

type EventHandler interface {
	OnEvent(message rueidis.PubSubMessage)
}
