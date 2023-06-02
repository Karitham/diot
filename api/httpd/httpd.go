package httpd

import (
	"context"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/oklog/ulid"
	"golang.org/x/exp/slog"
)

type Store interface {
	CreateUser(ctx context.Context, user store.User) error
	GetUsers(ctx context.Context) ([]store.User, error)
	GetUserByID(ctx context.Context, id ulid.ULID) (store.User, error)
	GetUserByEmail(ctx context.Context, email string) (store.User, error)
	DeleteUser(ctx context.Context, id ulid.ULID) error
}

func New(store Store) *Service {
	return &Service{
		store: store,
	}
}

type Service struct {
	store Store
}

func WError(_ context.Context, code int, m api.Error) *api.Response {
	r := api.GetUserByIDJSONDefaultResponse(m)
	r.Status(code)
	slog.Info("error", "message", m.Message, "code", code)
	return r
}
