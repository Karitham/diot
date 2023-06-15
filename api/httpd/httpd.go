package httpd

import (
	"context"
	"net/http"
	"os"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/go-chi/render"
	"github.com/oklog/ulid"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{})).With("pkg", "httpd")

type Store interface {
	CreateUser(ctx context.Context, user store.User) error
	GetUsers(ctx context.Context) ([]store.User, error)
	GetUser(ctx context.Context, id ulid.ULID) (store.User, error)
	GetUserByEmail(ctx context.Context, email string) (store.User, error)
	DeleteUser(ctx context.Context, id ulid.ULID) error

	NewSession(ctx context.Context, sess session.Permissions) (session.ID, error)
	GetSession(ctx context.Context, id session.ID) (session.Session, error)
	DeleteSession(ctx context.Context, id session.ID) error

	GetWebpushKey(ctx context.Context) (store.KeyPair, error)
}

func New(store Store) *Service {
	return &Service{
		store: store,
	}
}

type Service struct {
	store Store
}

func WError(w http.ResponseWriter, r *http.Request, code int, m string) *api.Response {
	log.WarnCtx(r.Context(), "api returned an error", "message", m, "code", code)
	render.Status(r, code)
	render.JSON(w, r, api.Error{Message: m})
	return nil
}
