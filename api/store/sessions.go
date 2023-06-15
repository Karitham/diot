package store

import (
	"context"

	"github.com/Karitham/iDIoT/api/session"
	"github.com/Karitham/iDIoT/api/store/models"
	"github.com/oklog/ulid"
)

// NewSession creates a new session
func (s *Store) NewSession(ctx context.Context, userID ulid.ULID, permissions session.Permissions) (session.ID, error) {
	sid := session.New()
	err := s.conn.Query(models.Sessions.Insert()).
		WithContext(ctx).
		BindStruct(models.SessionsStruct{
			Id:          sid.String(),
			UserId:      userID.String(),
			Permissions: permissions.Strings(),
		}).
		ExecRelease()
	return sid, err
}

// GetSession returns the permissions of a session
func (s *Store) GetSession(ctx context.Context, sessionID session.ID) (session.Session, error) {
	var ss models.SessionsStruct

	err := s.conn.Query(models.Sessions.Select()).
		BindStruct(models.SessionsStruct{
			Id: sessionID.String(),
		}).
		WithContext(ctx).
		GetRelease(&ss)

	return session.Session{
		ID:          sessionID,
		UserID:      ulid.MustParse(ss.UserId),
		Permissions: session.FromString(ss.Permissions...),
	}, err
}

// DeleteSession deletes a session
func (s *Store) DeleteSession(ctx context.Context, sessionID session.ID) error {
	return s.conn.Query(models.Sessions.Delete()).
		BindStruct(models.SessionsStruct{
			Id: sessionID.String(),
		}).
		WithContext(ctx).
		ExecRelease()
}
