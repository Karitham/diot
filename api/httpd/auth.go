package httpd

import (
	"net/http"
	"strings"
	"time"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/go-chi/render"
	"github.com/oklog/ulid"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/net/publicsuffix"
)

func (s Service) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// check both cookie and header
		headerValue := r.Header.Get("Authorization")
		headerValue = strings.TrimPrefix(headerValue, "Bearer ")

		// api-key query param
		if headerValue == "" {
			headerValue = r.URL.Query().Get("api-key")
		}

		sessID, err := session.Parse([]byte(headerValue))
		if err != nil {
			WError(w, r, err, 401, "Unauthorized, invalid token")
			return
		}

		sess, err := s.store.GetSession(r.Context(), sessID)
		if err != nil {
			WError(w, r, err, 401, "Unauthorized, session not found")
			return
		}

		r = r.WithContext(sess.Context(r.Context()))
		next.ServeHTTP(w, r)
	})
}

func (s Service) PermissionsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		perms := r.Context().Value(api.BearerAuthScopes).([]string)
		if len(perms) == 0 {
			next.ServeHTTP(w, r)
			return
		}

		s := session.FromContext(r.Context())
		if s == nil {
			panic("session not found")
		}

		err := s.Permissions.Can(session.FromString(perms...)...)
		if err != nil {
			WError(w, r, err, 403, err.Error())
			return
		}

		next.ServeHTTP(w, r)
	})
}

const AuthCookieName = "idiot_session_id"

// Login
// (POST /auth/login)
func (s Service) AuthLogin(w http.ResponseWriter, r *http.Request) *api.Response {
	body := api.AuthLoginJSONRequestBody{}
	if err := render.DecodeJSON(r.Body, &body); err != nil {
		return WError(w, r, err, 400, err.Error())
	}

	if body.Email == "" {
		return WError(w, r, nil, 400, "email is required")
	}

	if body.Password == "" {
		return WError(w, r, nil, 400, "password is required")
	}

	u, err := s.store.GetUserByEmail(r.Context(), body.Email)
	if err != nil {
		return WError(w, r, err, 401, "Unauthorized")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(body.Password)); err != nil {
		return WError(w, r, err, 401, "Unauthorized")
	}

	expire := time.Hour * 24

	id, err := s.store.NewSession(r.Context(), ulid.MustParse(u.ID), u.Permissions, expire)
	if err != nil {
		return WError(w, r, err, 500, err.Error())
	}

	return api.AuthLoginJSON200Response(struct {
		ExpireAt time.Time "json:\"expire_at\""
		Token    string    "json:\"token\""
	}{
		Token:    id.String(),
		ExpireAt: time.Now().Add(expire),
	})
}

// Logout
// (POST /auth/logout)
func (s Service) AuthLogout(w http.ResponseWriter, r *http.Request) *api.Response {
	err := s.store.DeleteSession(r.Context(), session.FromContext(r.Context()).ID)
	if err != nil {
		return WError(w, r, err, 500, err.Error())
	}

	return nil
}

// tldFromHost allows us to use the same cookie across subdomains
func tldFromHost(r *http.Request) string {
	h, _ := publicsuffix.EffectiveTLDPlusOne(r.Host)
	return h
}
