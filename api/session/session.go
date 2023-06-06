package session

import "context"

type Session struct {
	ID          ID
	Permissions Permissions
}

type sessionKeyT struct{}

var sessionKey = sessionKeyT{}

func (s *Session) Context(ctx context.Context) context.Context {
	return context.WithValue(ctx, sessionKey, s)
}

func FromContext(ctx context.Context) *Session {
	s, _ := ctx.Value(sessionKey).(*Session)
	return s
}
