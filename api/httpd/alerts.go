package httpd

import (
	"net/http"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/session"
)

func (s *Service) GetAlerts(w http.ResponseWriter, r *http.Request) *api.Response {
	sess := session.FromContext(r.Context())
	if sess == nil {
		return WError(w, r, nil, 401, "Unauthorized")
	}

	if err := sess.Permissions.Can(session.PermAlertsRead); err != nil {
		return WError(w, r, err, 403, "Forbidden")
	}

	alerts, err := s.store.GetAlerts(r.Context())
	if err != nil {
		return WError(w, r, err, 500, err.Error())
	}

	out := make([]api.AlertHistoryEntry, 0, len(alerts))
	for _, alert := range alerts {
		out = append(out, api.AlertHistoryEntry{
			CreatedAt: alert.Time,
			ID:        alert.ID,
			Kind:      alert.Kind,
			SensorID:  alert.DeviceID,
			Value:     alert.Value,
		})
	}

	return api.GetAlertsJSON200Response(out)
}
