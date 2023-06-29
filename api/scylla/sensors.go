package scylla

import (
	"context"
	"fmt"
	"time"

	"github.com/Karitham/iDIoT/api/redis"
	"github.com/Karitham/iDIoT/api/scylla/models"
	"github.com/go-json-experiment/json"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
)

const ReadingTTL = time.Hour * 24 * 30 * 12 // 1 year~

type SensorInfoWithLastReading struct {
	IoTID    string
	Name     string
	URL      string
	Readings []redis.SensorReading // readings for each kind
}

func (s *Store) GetSensors(ctx context.Context) ([]SensorInfoWithLastReading, error) {
	readings := []models.SensorReadingsStruct{}

	// query all pairs of iot_id and kind
	err := s.conn.Query("SELECT * FROM sensor_readings PER PARTITION LIMIT 1", nil).
		WithContext(ctx).
		SelectRelease(&readings)
	if err != nil {
		return nil, fmt.Errorf("selecting readings: %w", err)
	}

	// get all sensors
	devices := []models.DevicesStruct{}
	err = s.conn.Query(models.Devices.SelectAll()).WithContext(ctx).SelectRelease(&devices)
	if err != nil {
		return nil, fmt.Errorf("selecting devices: %w", err)
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
				return nil, fmt.Errorf("inserting device: %w", err)
			}
		}
	}

	// map readings
	out := []SensorInfoWithLastReading{}
	for _, device := range devices {
		out = append(out, SensorInfoWithLastReading{
			IoTID: device.Id,
			Name:  device.Name,
			URL:   device.Url,
		})
	}

	// assign all readings to their sensor
	for _, reading := range readings {
		for i, sensor := range out {
			if sensor.IoTID != reading.IotId {
				continue
			}

			data := redis.SensorReading{}
			err := json.Unmarshal(reading.Value, &data)
			if err != nil {
				return nil, fmt.Errorf("unmarshalling reading: %w", err)
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
		data := redis.SensorReading{}
		err = json.Unmarshal(reading.Value, &data)
		if err != nil {
			return SensorInfoWithLastReading{}, err
		}

		out.Readings = append(out.Readings, data)
	}

	return out, nil
}

func (s *Store) createSensorReading(ctx context.Context, data redis.SensorReading) error {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	return s.conn.Query(models.SensorReadings.InsertBuilder().TTL(ReadingTTL).ToCql()).
		BindStruct(models.SensorReadingsStruct{
			IotId: data.IoTID,
			Time:  data.Time,
			Value: jsonData,
		}).
		WithContext(ctx).
		ExecRelease()
}

func (s *Store) ReadingsSubscriber(ctx context.Context, data redis.SensorReading) {
	err := s.createSensorReading(ctx, data)
	if err != nil {
		log.ErrorCtx(ctx, err.Error())
	}
}

func (s *Store) MediaPublisherSubscriber(ctx context.Context, data redis.MediaPublisher) {
	err := s.conn.Query(models.Devices.Insert()).
		BindStruct(models.DevicesStruct{
			Id:   data.IoTID,
			Name: "Sensor " + data.IoTID,
			Url:  data.IoTID,
		}).
		WithContext(ctx).
		ExecRelease()
	if err != nil {
		log.ErrorCtx(ctx, err.Error())
	}
}

func (s *Store) RenameSensor(ctx context.Context, id string, name string) error {
	return s.conn.Query(models.Devices.UpdateBuilder().Set("name").Where(qb.Eq("id")).ToCql()).
		BindMap(qb.M{
			"id":   id,
			"name": name,
		}).
		WithContext(ctx).
		ExecRelease()
}
