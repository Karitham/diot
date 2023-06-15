package store

import (
	"context"

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
