package store

import (
	"context"

	"github.com/Karitham/iDIoT/api/session"
	"github.com/Karitham/iDIoT/api/store/models"
)

// NewSession creates a new session
func (s *Store) NewSession(ctx context.Context, permissions session.Permissions) (session.ID, error) {
	sid := session.New()
	err := s.conn.Query(models.Sessions.Insert()).
		WithContext(ctx).
		BindStruct(models.SessionsStruct{
			Id:          sid.String(),
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
		Permissions: session.FromString(ss.Permissions...),
	}, err
}
