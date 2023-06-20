package httpd

import (
	"net/http"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/go-json-experiment/json"
)

// Send a webpush notification key
//
// (GET /notifications/webpush)
func (s *Service) GetWebpushKey(w http.ResponseWriter, r *http.Request) *api.Response {
	key, err := s.store.GetWebpushKey(r.Context())
	if err != nil {
		return WError(w, r, err, 500, err.Error())
	}

	return api.GetWebpushKeyJSON200Response(api.WebpushKey{
		Key: key.PublicKey,
	})
}

// Send a webpush notification registration payload
// (POST /notifications/webpush)
func (s *Service) RegisterWebpush(w http.ResponseWriter, r *http.Request) *api.Response {
	var u api.RegisterWebpushJSONRequestBody
	err := json.UnmarshalFull(r.Body, &u)
	if err != nil {
		return WError(w, r, err, 400, "Bad request")
	}

	sess := session.FromContext(r.Context())
	if sess == nil {
		return WError(w, r, err, 401, "Unauthorized")
	}

	err = s.store.RegisterWebpush(r.Context(), sess.UserID, u.Endpoint, u.Keys.Auth, u.Keys.P256dh)
	if err != nil {
		return WError(w, r, err, 500, err.Error())
	}

	return nil
}
