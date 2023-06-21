package httpd

import (
	"context"
	"net/http"
	"strconv"

	badrand "math/rand"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/store"
	"nhooyr.io/websocket"
	"nhooyr.io/websocket/wsjson"
)

func (s *Service) GetSensors(w http.ResponseWriter, r *http.Request) *api.Response {
	readings, err := s.store.GetSensors(r.Context())
	if err != nil {
		return WError(w, r, err, 500, err.Error())
	}

	out := make([]api.SensorInfo, 0, len(readings))
	for _, reading := range readings {
		for _, info := range reading.Readings {
			for _, data := range sensorToData(info) {
				out = append(out, api.SensorInfo{
					Label:      reading.Name,
					SensorData: data,
				})
			}
		}
	}

	return api.GetSensorsJSON200Response(out)
}

func sensorToData(reading store.SensorReading) []api.SensorData {
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
	randomID := badrand.Int63()

	s.readings.Subscribe(strconv.FormatInt(randomID, 10), r.Context(), func(ctx context.Context, message store.SensorReading) {
		for _, data := range sensorToData(message) {
			err := wsjson.Write(ctx, c, data)
			if err != nil {
				log.DebugCtx(ctx, "error writing to websocket: %v", err)
				return
			}
		}
	})

	<-r.Context().Done()
	return nil
}
