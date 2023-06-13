package store

import (
	"context"
	"crypto/rand"

	"github.com/Karitham/iDIoT/api/store/models"
	"github.com/SherClockHolmes/webpush-go"
	"github.com/oklog/ulid"
)

type KeyPair struct {
	ID         string `db:"id"`
	PublicKey  string `db:"public_key"`
	PrivateKey string `db:"private_key"`
}

func (s *Store) RotateKeyPair(ctx context.Context) (KeyPair, error) {
	pk, pubk, err := webpush.GenerateVAPIDKeys()
	if err != nil {
		return KeyPair{}, err
	}

	key := KeyPair{
		PublicKey:  pubk,
		PrivateKey: pk,
		ID:         ulid.MustNew(ulid.Now(), rand.Reader).String(),
	}

	err = s.conn.Query(models.Keys.Insert()).BindStruct(key).WithContext(ctx).ExecRelease()
	if err != nil {
		return KeyPair{}, err
	}

	return key, nil
}

func (s *Store) GetKeypair(ctx context.Context) (KeyPair, error) {
	var key KeyPair
	if err := s.conn.Query(models.Keys.Select()).WithContext(ctx).Get(&key); err != nil {
		return KeyPair{}, err
	}

	return key, nil
}
