package session

import (
	"crypto/rand"
	"errors"
	"strings"

	"github.com/google/uuid"
	"github.com/oklog/ulid"
)

// keeps the sortability of ulid and the randomness of uuid
type ID struct {
	hi ulid.ULID
	lo uuid.UUID
}

func (s ID) String() string {
	return "sess_" + s.hi.String() + "-" + s.lo.String()
}

func Parse(b []byte) (ID, error) {
	if strings.HasPrefix(string(b), "sess_") {
		b = b[5:]
	} else {
		return ID{}, errors.New("invalid session id")
	}

	parts := strings.SplitN(string(b), "-", 2)
	if len(parts) != 2 {
		return ID{}, errors.New("invalid session id")
	}

	hi, err := ulid.Parse(parts[0])
	if err != nil {
		return ID{}, err
	}

	lo, err := uuid.Parse(parts[1])
	if err != nil {
		return ID{}, err
	}

	return ID{
		hi: hi,
		lo: lo,
	}, nil
}

func (s *ID) MarshalText() ([]byte, error) {
	return []byte(s.String()), nil
}

func (s *ID) UnmarshalText(b []byte) error {
	id, err := Parse(b)
	if err != nil {
		return err
	}

	s.hi = id.hi
	s.lo = id.lo

	return nil
}

func New() ID {
	sessionIDHi := ulid.MustNew(ulid.Now(), rand.Reader)
	sessionIDLo, err := uuid.NewRandom()
	if err != nil {
		return ID{}
	}

	sessionID := ID{
		hi: sessionIDHi,
		lo: sessionIDLo,
	}

	return sessionID
}
