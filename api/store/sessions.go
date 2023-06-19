package store

import (
	"context"
	"time"

	"github.com/Karitham/iDIoT/api/session"
	"github.com/Karitham/iDIoT/api/store/models"
	"github.com/oklog/ulid"
)

// NewSession creates a new session
func (s *Store) NewSession(ctx context.Context, userID ulid.ULID, permissions session.Permissions, TTL time.Duration) (session.ID, error) {
	sid := session.New()
	err := s.conn.Query(
		models.Sessions.InsertBuilder().
			TTL(TTL).
			ToCql(),
	).
		WithContext(ctx).
		BindStruct(
			models.SessionsStruct{
				Id:          sid.String(),
				UserId:      userID.String(),
				Permissions: permissions.Strings(),
			},
		).
		ExecRelease()
	return sid, err
}

// GetSession returns the permissions of a session
func (s *Store) GetSession(ctx context.Context, sessionID session.ID) (session.Session, error) {
	var ss models.SessionsStruct

	err := s.conn.Query(models.Sessions.SelectAll()).
		BindStruct(models.SessionsStruct{Id: sessionID.String()}).
		WithContext(ctx).
		GetRelease(&ss)

	uID, _ := ulid.Parse(ss.UserId)
	return session.Session{
		ID:          sessionID,
		UserID:      uID,
		Permissions: session.FromString(ss.Permissions...),
	}, err
}

// ListSessions returns all sessions
func (s *Store) ListSessions(ctx context.Context) ([]session.Session, error) {
	var ss []models.SessionsStruct

	err := s.conn.Query(models.Sessions.SelectAll()).
		WithContext(ctx).
		SelectRelease(&ss)

	sessions := make([]session.Session, 0, len(ss))
	for _, s := range ss {
		sID, err := session.Parse([]byte(s.Id))
		if err != nil {
			return nil, err
		}

		uID, _ := ulid.Parse(s.UserId)

		sessions = append(sessions, session.Session{
			ID:          sID,
			UserID:      uID,
			Permissions: session.FromString(s.Permissions...),
		})
	}

	return sessions, err
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
