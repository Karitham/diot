package httpd

import (
	"net/http"

	"github.com/Karitham/iDIoT/api/httpd/api"
)

// Send a webpush notification key
//
// (GET /notifications/webpush)
func (s *Service) GetWebpushKey(w http.ResponseWriter, r *http.Request) *api.Response {
	key, err := s.store.GetWebpushKey(r.Context())
	if err != nil {
		return WError(w, r, 500, err.Error())
	}

	return api.GetWebpushKeyJSON200Response(api.WebpushKey{
		Key: key.PublicKey,
	})
}
