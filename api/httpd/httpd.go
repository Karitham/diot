package httpd

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/go-chi/render"
	"github.com/oklog/ulid"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
	Level: slog.LevelDebug,
})).With("pkg", "httpd")

type Store interface {
	CreateUser(ctx context.Context, user store.User) error
	GetUsers(ctx context.Context) ([]store.User, error)
	GetUser(ctx context.Context, id ulid.ULID) (store.User, error)
	GetUserByEmail(ctx context.Context, email string) (store.User, error)
	DeleteUser(ctx context.Context, id ulid.ULID) error

	NewSession(ctx context.Context, userID ulid.ULID, sess session.Permissions, TTL time.Duration) (session.ID, error)
	GetSession(ctx context.Context, id session.ID) (session.Session, error)
	DeleteSession(ctx context.Context, id session.ID) error

	GetWebpushKey(ctx context.Context) (store.KeyPair, error)
	RegisterWebpush(ctx context.Context, userID ulid.ULID, endpoint, auth, p256dh string) error
}

func New(store Store) *Service {
	return &Service{
		store: store,
	}
}

type Service struct {
	store Store
}

func WError(w http.ResponseWriter, r *http.Request, err error, code int, m string) *api.Response {
	vars := []any{
		slog.String("message", m),
		slog.Int("code", code),
	}
	if err != nil {
		vars = append(vars, slog.Any("error", err))
	}
	log.WarnCtx(r.Context(), "api returned an error", vars...)
	render.Status(r, code)
	render.JSON(w, r, api.Error{Message: m})
	return nil
}
