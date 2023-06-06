package httpd

import (
	"net/http"
	"strings"
	"time"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
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
				WError(r.Context(), 401, api.Error{Message: "Unauthorized"})
				return
			}
			headerValue = s.Value
		}

		sessID, err := session.Parse([]byte(headerValue))
		if err != nil {
			WError(r.Context(), 401, api.Error{Message: "Unauthorized"})
			return
		}

		sess, err := s.store.GetSession(r.Context(), sessID)
		if err != nil {
			WError(r.Context(), 401, api.Error{Message: "Unauthorized"})
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
			WError(r.Context(), 403, api.Error{Message: err.Error()})
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
		return WError(r.Context(), 400, api.Error{Message: "email is required"})
	}

	password := r.URL.Query().Get("password")
	if password == "" {
		return WError(r.Context(), 400, api.Error{Message: "password is required"})
	}

	u, err := s.store.GetUserByEmail(r.Context(), password)
	if err != nil {
		return WError(r.Context(), 500, api.Error{Message: err.Error()})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		return WError(r.Context(), 401, api.Error{Message: "Unauthorized"})
	}

	id, err := s.store.NewSession(r.Context(), session.Permissions{})
	if err != nil {
		return WError(r.Context(), 500, api.Error{Message: err.Error()})
	}

	http.SetCookie(w, &http.Cookie{
		Name:     AuthCookieName,
		MaxAge:   int(time.Second * 60 * 60 * 24),
		Value:    id.String(),
		SameSite: http.SameSiteLaxMode,
		HttpOnly: true,
	})

	return nil
}

// Logout
// (POST /auth/logout)
func (s Service) AuthLogout(w http.ResponseWriter, r *http.Request) *api.Response {
	err := s.store.DeleteSession(r.Context(), session.FromContext(r.Context()).ID)
	if err != nil {
		return WError(r.Context(), 500, api.Error{Message: err.Error()})
	}

	http.SetCookie(w, &http.Cookie{
		Name:     AuthCookieName,
		MaxAge:   -1,
		SameSite: http.SameSiteLaxMode,
		HttpOnly: true,
	})
	return nil
}
