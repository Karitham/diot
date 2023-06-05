package httpd

import (
	"context"
	"os"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/oklog/ulid"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr)).With("pkg", "httpd")

type Store interface {
	CreateUser(ctx context.Context, user store.User) error
	GetUsers(ctx context.Context) ([]store.User, error)
	GetUser(ctx context.Context, id ulid.ULID) (store.User, error)
	GetUserByEmail(ctx context.Context, email string) (store.User, error)
	DeleteUser(ctx context.Context, id ulid.ULID) error

	NewSession(ctx context.Context, sess session.Permissions) (session.ID, error)
	GetSession(ctx context.Context, id session.ID) (session.Session, error)
}

func New(store Store) *Service {
	return &Service{
		store: store,
	}
}

type Service struct {
	store Store
}

func WError(ctx context.Context, code int, m api.Error) *api.Response {
	r := api.GetUserByIDJSONDefaultResponse(m)
	r.Status(code)
	log.WarnCtx(ctx, "api returned an error", "message", m.Message, "code", code)
	return r
}
