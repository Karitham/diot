package store

import (
	"bytes"
	"context"

	"github.com/go-json-experiment/json"
	"github.com/oklog/ulid"

	"github.com/Karitham/iDIoT/api/store/models"
	"github.com/SherClockHolmes/webpush-go"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
)

type KeyPair struct {
	ID         string `db:"id"`
	PublicKey  string `db:"public_key"`
	PrivateKey string `db:"private_key"`
}

func (s *Store) RotateWebpushKey(ctx context.Context) (KeyPair, error) {
	pk, pubk, err := webpush.GenerateVAPIDKeys()
	if err != nil {
		return KeyPair{}, err
	}

	key := KeyPair{
		PublicKey:  pubk,
		PrivateKey: pk,
		ID:         "webpush",
	}

	err = s.conn.Query(models.Keys.Insert()).BindStruct(key).WithContext(ctx).ExecRelease()
	if err != nil {
		return KeyPair{}, err
	}

	return key, nil
}

func (s *Store) GetWebpushKey(ctx context.Context) (KeyPair, error) {
	var key KeyPair
	err := s.conn.Query(models.Keys.Select()).WithContext(ctx).BindMap(qb.M{
		"id": "webpush",
	}).Get(&key)
	if err == gocql.ErrNotFound {
		// create it if it doesn't exist
		return s.RotateWebpushKey(ctx)
	}

	if err != nil {
		return KeyPair{}, err
	}

	return key, nil
}

func (s *Store) RegisterWebpush(ctx context.Context, userID ulid.ULID, endpoint, auth, p256dh string) error {
	buf := bytes.Buffer{}
	err := json.MarshalFull(&buf, WebpushSubscription{
		Endpoint: endpoint,
		Keys: struct {
			Auth   string "db:\"auth\""
			P256dh string "db:\"p256dh\""
		}{
			Auth:   auth,
			P256dh: p256dh,
		},
	})
	if err != nil {
		return err
	}

	// add to the list of subscriptions
	err = s.conn.Query(models.WebpushSubscriptions.UpdateBuilder().Add("subscription").ToCql()).WithContext(ctx).BindStruct(models.WebpushSubscriptionsStruct{
		UserId:       userID.String(),
		Subscription: [][]byte{buf.Bytes()},
	}).ExecRelease()
	if err != nil {
		return err
	}

	return nil
}

type UserWebpushSubscriptions struct {
	UserID ulid.ULID             `db:"user_id"`
	Subs   []WebpushSubscription `db:"subscription"`
}

type WebpushSubscription struct {
	Endpoint string `db:"endpoint"`
	Keys     struct {
		Auth   string `db:"auth"`
		P256dh string `db:"p256dh"`
	} `db:"keys"`
}

func (s *Store) GetWebpushSubscriptions(ctx context.Context, userID ulid.ULID) (UserWebpushSubscriptions, error) {
	var subs []models.WebpushSubscriptionsStruct
	err := s.conn.Query(models.WebpushSubscriptions.Select()).WithContext(ctx).BindMap(qb.M{
		"user_id": userID.String(),
	}).SelectRelease(&subs)
	if err != nil {
		return UserWebpushSubscriptions{}, err
	}

	out := UserWebpushSubscriptions{
		UserID: userID,
	}
	for _, sub := range subs {
		for _, s := range sub.Subscription {
			var sub WebpushSubscription
			err := json.Unmarshal(s, &sub)
			if err != nil {
				return UserWebpushSubscriptions{}, err
			}

			out.Subs = append(out.Subs, sub)
		}
	}

	return out, nil
}
