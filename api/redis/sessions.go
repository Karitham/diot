package redis

import (
	"context"
	"time"

	"github.com/Karitham/iDIoT/api/session"
	"github.com/go-json-experiment/json"
	"github.com/oklog/ulid"
)

const sessionPrefix = "session:"

func prefix(s session.ID) string {
	return sessionPrefix + s.String()
}

func (s *Store) NewSession(ctx context.Context, userID ulid.ULID, perms session.Permissions, TTL time.Duration) (session.ID, error) {
	id := session.New()

	sess := session.Session{
		ID:          id,
		UserID:      userID,
		Permissions: perms,
	}

	data, err := json.Marshal(sess)
	if err != nil {
		return session.ID{}, err
	}

	return id, s.client.Do(ctx, s.client.B().Set().Key(prefix(id)).Value(string(data)).Ex(TTL).Build()).Error()
}

func (s *Store) GetSession(ctx context.Context, id session.ID) (session.Session, error) {
	var sess session.Session

	data, err := s.client.Do(ctx, s.client.B().Get().Key(prefix(id)).Build()).AsBytes()
	if err != nil {
		return sess, err
	}

	err = json.Unmarshal(data, &sess)
	return sess, err
}

func (s *Store) DeleteSession(ctx context.Context, id session.ID) error {
	return s.client.Do(ctx, s.client.B().Del().Key(prefix(id)).Build()).Error()
}

func (s *Store) ListSessions(ctx context.Context) ([]session.Session, error) {
	var sess []session.Session

	keys, err := s.client.Do(ctx, s.client.B().Keys().Pattern(
		sessionPrefix+"*",
	).Build()).AsStrSlice()
	if err != nil {
		return sess, err
	}

	for _, v := range keys {
		o, err := s.client.Do(ctx, s.client.B().Get().Key(v).Build()).AsBytes()
		if err != nil {
			return sess, err
		}

		var s session.Session
		err = json.Unmarshal(o, &s)
		if err != nil {
			log.Info("redis", "error", err)
			continue
		}

		sess = append(sess, s)
	}

	return sess, nil
}
