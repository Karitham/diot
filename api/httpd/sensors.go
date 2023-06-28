package httpd

import (
	"context"
	"net/http"
	"net/url"
	"strconv"
	"time"

	badrand "math/rand"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/redis"
	"nhooyr.io/websocket"
	"nhooyr.io/websocket/wsjson"
)

func (s *Service) GetSensors(w http.ResponseWriter, r *http.Request) *api.Response {
	sensors, err := s.store.GetSensors(r.Context())
	if err != nil {
		return WError(w, r, err, 500, err.Error())
	}

	out := make([]api.SensorInfo, 0, len(sensors))
	for _, sensor := range sensors {
		for _, info := range sensor.Readings {
			for _, data := range sensorToData(info) {
				out = append(out, api.SensorInfo{
					Label:      sensor.Name,
					SensorData: data,
				})
			}
		}

		if sensor.URL == "" {
			continue
		}

		path, _ := url.JoinPath("video", sensor.URL)
		out = append(out, api.SensorInfo{
			Label: sensor.Name,
			SensorData: api.SensorData{
				ID:   sensor.IoTID,
				Kind: api.SensorDataKindCamera,
				Data: api.SensorInfoCamera{
					FeedURI: (&url.URL{
						Scheme: "http",
						Host:   s.CDNHost,
						Path:   path,
					}).String(),
				},
			},
		})
	}

	return api.GetSensorsJSON200Response(out)
}

func sensorToData(reading redis.SensorReading) []api.SensorData {
	out := []api.SensorData{}
	if reading.Humidity != nil {
		out = append(out, api.SensorData{
			ID:   reading.IoTID,
			Kind: api.SensorDataKindHumidity,
			Data: api.SensorInfoHumidity{
				Humidity: *reading.Humidity,
			},
		})
	}

	if reading.Temperature != nil {
		out = append(out, api.SensorData{
			ID:   reading.IoTID,
			Kind: api.SensorDataKindTemperature,
			Data: api.SensorInfoTemperature{
				Temperature: *reading.Temperature,
			},
		})
	}

	if reading.Iaq != nil {
		out = append(out, api.SensorData{
			ID:   reading.IoTID,
			Kind: api.SensorDataKindIaq,
			Data: api.SensorInfoIAQ{
				Iaq: *reading.Iaq,
			},
		})
	}

	return out
}

// GetSensorsLive returns the live data for all of the available sensors when it's available
// It's all streamed through a websocket
// (GET /sensors/live)
func (s *Service) GetSensorsLive(w http.ResponseWriter, r *http.Request) *api.Response {
	c, err := websocket.Accept(w, r, &websocket.AcceptOptions{
		InsecureSkipVerify: true,
	})
	if err != nil {
		return WError(w, r, err, 400, err.Error())
	}

	rid := strconv.FormatInt(badrand.Int63(), 10)
	subctx, cancel := context.WithCancel(r.Context())
	defer cancel()

	s.readings.Subscribe(rid, subctx, func(ctx context.Context, message redis.SensorReading) {
		subctx, subcancel := context.WithTimeout(ctx, 15*time.Second)
		defer subcancel()
		for _, data := range sensorToData(message) {
			err := wsjson.Write(subctx, c, data)
			if err != nil {
				cancel()
				log.DebugCtx(ctx, "error writing to websocket", "error", err)
				return
			}
		}
	})

	<-subctx.Done()
	s.readings.Unsubscribe(rid)
	return nil
}
