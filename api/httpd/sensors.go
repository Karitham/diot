package httpd

import (
	"crypto/rand"
	"net/http"
	"time"

	badrand "math/rand"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/bxcodec/faker/v3"
	"github.com/oklog/ulid"
	"nhooyr.io/websocket"
	"nhooyr.io/websocket/wsjson"
)

func (s *Service) GetSensors(w http.ResponseWriter, r *http.Request) *api.Response {
	return api.GetSensorsJSON200Response([]api.SensorInfo{
		{
			Label: faker.Sentence(),
			SensorData: api.SensorData{
				ID:   ulid.MustNew(ulid.Now(), rand.Reader),
				Kind: api.SensorDataKindHumidity,
				Data: api.SensorInfoHumidity{
					Humidity: badrand.Float32() * 100,
				},
			},
		},
		{
			Label: faker.Sentence(),
			SensorData: api.SensorData{
				ID:   ulid.MustNew(ulid.Now(), rand.Reader),
				Kind: api.SensorDataKindTemperature,
				Data: api.SensorInfoTemperature{
					Temperature: badrand.Float32() * 100,
				},
			},
		},
		{
			Label: faker.Sentence(),
			SensorData: api.SensorData{
				ID:   ulid.MustNew(ulid.Now(), rand.Reader),
				Kind: api.SensorDataKindCamera,
				Data: api.SensorInfoCamera{
					FeedURI: faker.URL(),
				},
			},
		},
	})
}

// GetSensorsLive returns the live data for all of the available sensors when it's available
// It's all streamed through a websocket
// (GET /sensors/live)
func (s *Service) GetSensorsLive(w http.ResponseWriter, r *http.Request) *api.Response {
	c, err := websocket.Accept(w, r, nil)
	if err != nil {
		return WError(w, r, 400, err.Error())
	}

	defer c.Close(websocket.StatusInternalError, "the sky is falling")

	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		err := wsjson.Write(r.Context(), c, api.SensorData{
			ID:   ulid.MustNew(ulid.Now(), rand.Reader),
			Kind: api.SensorDataKindCamera,
			Data: api.SensorInfoHumidity{
				Humidity: badrand.Float32() * 100,
			},
		})
		if err != nil {
			return WError(w, r, 400, err.Error())
		}

		err = wsjson.Write(r.Context(), c, api.SensorData{
			ID:   ulid.MustNew(ulid.Now(), rand.Reader),
			Kind: api.SensorDataKindTemperature,
			Data: api.SensorInfoHumidity{
				Humidity: badrand.Float32() * 100,
			},
		})
		if err != nil {
			return WError(w, r, 400, err.Error())
		}
	}

	return nil
}
