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

type UserStore interface {
	CreateUser(ctx context.Context, user store.User) error
	GetUsers(ctx context.Context) ([]store.User, error)
	GetUser(ctx context.Context, id ulid.ULID) (store.User, error)
	GetUserByEmail(ctx context.Context, email string) (store.User, error)
	DeleteUser(ctx context.Context, id ulid.ULID) error
}

type WebpushStore interface {
	GetWebpushKey(ctx context.Context) (store.KeyPair, error)
	RegisterWebpush(ctx context.Context, userID ulid.ULID, endpoint, auth, p256dh string) error
}

type SensorStore interface {
	GetSensors(ctx context.Context) ([]store.SensorInfoWithLastReading, error)
}

type DBStore interface {
	UserStore
	WebpushStore
	SensorStore
}

type SessionStore interface {
	NewSession(ctx context.Context, userID ulid.ULID, sess session.Permissions, TTL time.Duration) (session.ID, error)
	GetSession(ctx context.Context, id session.ID) (session.Session, error)
	DeleteSession(ctx context.Context, id session.ID) error
}

type ReadingSubscriber interface {
	Subscribe(k string, ctx context.Context, sub func(ctx context.Context, message store.SensorReading))
}

func New(dbstore DBStore, sessionStore SessionStore, readings ReadingSubscriber) *Service {
	return &Service{
		store:        dbstore,
		readings:     readings,
		sessionStore: sessionStore,
	}
}

type Service struct {
	store        DBStore
	readings     ReadingSubscriber
	sessionStore SessionStore
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
