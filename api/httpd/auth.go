package httpd

import (
	"net/http"
	"strings"
	"time"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/oklog/ulid"
	"golang.org/x/crypto/bcrypt"
)

func (s Service) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// check both cookie and header
		headerValue := r.Header.Get("Authorization")
		headerValue = strings.TrimPrefix(headerValue, "Bearer ")
		if headerValue == "" {
			s, err := r.Cookie(AuthCookieName)
			if err != nil {
				WError(w, r, 401, "Unauthorized")
				return
			}
			headerValue = s.Value
		}

		sessID, err := session.Parse([]byte(headerValue))
		if err != nil {
			WError(w, r, 401, "Unauthorized")
			return
		}

		sess, err := s.store.GetSession(r.Context(), sessID)
		if err != nil {
			WError(w, r, 401, "Unauthorized")
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
			WError(w, r, 403, err.Error())
			return
		}

		next.ServeHTTP(w, r)
	})
}

const AuthCookieName = "idiot_session_id"

// Login
// (POST /auth/login)
func (s Service) AuthLogin(w http.ResponseWriter, r *http.Request) *api.Response {
	email := r.URL.Query().Get("email")
	if email == "" {
		return WError(w, r, 400, "email is required")
	}

	password := r.URL.Query().Get("password")
	if password == "" {
		return WError(w, r, 400, "password is required")
	}

	u, err := s.store.GetUserByEmail(r.Context(), email)
	if err != nil {
		return WError(w, r, 500, err.Error())
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		return WError(w, r, 401, "Unauthorized")
	}

	id, err := s.store.NewSession(r.Context(), ulid.MustParse(u.ID), session.Permissions{})
	if err != nil {
		return WError(w, r, 500, err.Error())
	}

	http.SetCookie(w, &http.Cookie{
		Name:     AuthCookieName,
		MaxAge:   int(time.Second * 60 * 60 * 24),
		Value:    id.String(),
		SameSite: http.SameSiteLaxMode,
		HttpOnly: true,
	})

	return api.AuthLoginJSON200Response(struct {
		Token string `json:"token"`
	}{
		Token: id.String(),
	})
}

// Logout
// (POST /auth/logout)
func (s Service) AuthLogout(w http.ResponseWriter, r *http.Request) *api.Response {
	err := s.store.DeleteSession(r.Context(), session.FromContext(r.Context()).ID)
	if err != nil {
		return WError(w, r, 500, err.Error())
	}

	http.SetCookie(w, &http.Cookie{
		Name:     AuthCookieName,
		MaxAge:   -1,
		SameSite: http.SameSiteLaxMode,
		HttpOnly: true,
	})
	return nil
}
