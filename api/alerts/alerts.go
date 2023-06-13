package alerts

import (
	"context"
	"sync"

	"github.com/go-json-experiment/json"
	"github.com/redis/rueidis"
	"github.com/sourcegraph/conc"
)

type SubFanHandle[T any] struct {
	subMu   sync.Mutex
	subs    map[string]func(ctx context.Context, message T)
	wg      conc.WaitGroup
	ctx     context.Context
	onEvent func(message rueidis.PubSubMessage)
}

func (sh *SubFanHandle[T]) OnEvent(message rueidis.PubSubMessage) {
	sh.onEvent(message)
}

func (sh *SubFanHandle[T]) Subscribe(k string, sub func(ctx context.Context, message T)) {
	sh.subMu.Lock()
	defer sh.subMu.Unlock()
	sh.subs[k] = sub
}

func (sh *SubFanHandle[T]) Unsubscribe(k string) {
	sh.subMu.Lock()
	defer sh.subMu.Unlock()
	delete(sh.subs, k)
}

// SubFan allows to fan out messages to all registered callbacks
func SubFan[T any](ctx context.Context) *SubFanHandle[T] {
	sh := &SubFanHandle[T]{
		subMu: sync.Mutex{},
		subs:  make(map[string]func(ctx context.Context, message T)),
		ctx:   ctx,
	}

	sh.onEvent = func(message rueidis.PubSubMessage) {
		var msg T
		json.Unmarshal([]byte(message.Message), &msg)
		sh.subMu.Lock()
		for _, sub := range sh.subs {
			sh.wg.Go(func() {
				sub(sh.ctx, msg)
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

// AlertSub blocks and waits for messages on the alerts channel.
func (s *Store) AlertSub(ctx context.Context, eh EventHandler) error {
	return s.client.Receive(ctx, s.client.B().Subscribe().Channel("alerts").Build(), eh.OnEvent)
}
