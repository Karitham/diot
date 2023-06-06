package httpd

import (
	"net/http"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
)

func (s Service) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// check both cookie and header
		headerValue := r.Header.Get("Authorization")
		if headerValue == "" {
			s, err := r.Cookie("session")
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
		}

		r = r.WithContext(sess.Context(r.Context()))
		next.ServeHTTP(w, r)
	})
}
