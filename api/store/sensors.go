package store

import (
	"context"
	"time"

	"github.com/Karitham/iDIoT/api/store/models"
	"github.com/go-json-experiment/json"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
)

type SensorReading struct {
	IoTID       string    `json:"id_iot"`
	Time        time.Time `json:"time"`
	Temperature *float32  `json:"temperature"`
	Humidity    *float32  `json:"humidity"`
	Iaq         *float32  `json:"iaq"`
	Battery     *float32  `json:"battery"`
}

const ReadingTTL = time.Hour * 24 * 30 * 365 // 1 year~

type SensorInfoWithLastReading struct {
	IoTID    string
	Name     string
	Readings []SensorReading // readings for each kind
}

func (s *Store) GetSensors(ctx context.Context) ([]SensorInfoWithLastReading, error) {
	readings := []models.SensorReadingsStruct{}

	// query all pairs of iot_id and kind
	err := s.conn.Query("SELECT DISTINCT iot_id FROM sensor_readings PER PARTITION LIMIT 1", nil).
		WithContext(ctx).
		SelectRelease(&readings)
	if err != nil {
		return nil, err
	}

	// get all sensors
	devices := []models.DevicesStruct{}
	err = s.conn.Query(models.Devices.SelectAll()).WithContext(ctx).SelectRelease(&devices)
	if err != nil {
		return nil, err
	}

	// find readings with no sensor and insert them
	for _, reading := range readings {
		found := false
		for _, device := range devices {
			if reading.IotId == device.Id {
				found = true
				break
			}
		}

		if !found {
			// insert sensor with random name
			err = s.conn.Query(models.Devices.InsertBuilder().ToCql()).
				BindStruct(models.DevicesStruct{
					Id:   reading.IotId,
					Name: "Sensor " + reading.IotId,
				}).
				WithContext(ctx).
				ExecRelease()
			if err != nil {
				return nil, err
			}
		}
	}

	// map readings
	out := []SensorInfoWithLastReading{}
	for _, device := range devices {
		out = append(out, SensorInfoWithLastReading{
			IoTID: device.Id,
			Name:  device.Name,
		})
	}

	// assign all readings to their sensor
	for _, reading := range readings {
		for i, sensor := range out {
			if sensor.IoTID != reading.IotId {
				continue
			}

			data := SensorReading{}
			err = json.Unmarshal(reading.Value, &data)
			if err != nil {
				return nil, err
			}

			out[i].Readings = append(out[i].Readings, data)
		}
	}

	return out, nil
}

func (s *Store) GetSensor(ctx context.Context, id string) (SensorInfoWithLastReading, error) {
	readings := []models.SensorReadingsStruct{}
	err := s.conn.Query(models.SensorReadings.SelectBuilder().Where(qb.Eq("iot_id")).ToCql()).
		BindMap(qb.M{
			"iot_id": id,
		}).
		WithContext(ctx).
		SelectRelease(&readings)
	if err != nil {
		return SensorInfoWithLastReading{}, err
	}

	// get sensor
	device := models.DevicesStruct{}
	err = s.conn.Query(models.Devices.SelectBuilder().Where(qb.Eq("id")).ToCql()).
		BindMap(qb.M{
			"id": id,
		}).
		WithContext(ctx).
		GetRelease(&device)
	if err != nil && err != gocql.ErrNotFound {
		return SensorInfoWithLastReading{}, err
	}
	if err == gocql.ErrNotFound {
		err = s.conn.Query(models.Devices.InsertBuilder().ToCql()).
			BindStruct(models.DevicesStruct{
				Id:   id,
				Name: "Sensor " + id,
			}).
			WithContext(ctx).
			ExecRelease()
		if err != nil {
			return SensorInfoWithLastReading{}, err
		}
	}

	out := SensorInfoWithLastReading{
		IoTID: device.Id,
		Name:  device.Name,
	}

	// assign all readings to their sensor
	for _, reading := range readings {
		data := SensorReading{}
		err = json.Unmarshal(reading.Value, &data)
		if err != nil {
			return SensorInfoWithLastReading{}, err
		}

		out.Readings = append(out.Readings, data)
	}

	return out, nil
}

func (s *Store) CreateSensorReading(ctx context.Context, data SensorReading) error {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	s.conn.Query(models.SensorReadings.InsertBuilder().TTL(ReadingTTL).ToCql()).
		BindStruct(models.SensorReadingsStruct{
			IotId: data.IoTID,
			Time:  data.Time,
			Value: jsonData,
		}).
		WithContext(ctx).
		ExecRelease()

	return nil
}

func (s *Store) ReadingsSubscriber(ctx context.Context, data SensorReading) {
	err := s.CreateSensorReading(ctx, data)
	if err != nil {
		log.ErrorCtx(ctx, err.Error())
	}
}
