package scylla

import (
	"context"
	"crypto/rand"
	"time"

	"github.com/Karitham/iDIoT/api/redis"
	"github.com/Karitham/iDIoT/api/scylla/models"
	"github.com/go-json-experiment/json"
	"github.com/oklog/ulid"
	"github.com/sourcegraph/conc"
)

type Alert struct {
	ID       ulid.ULID `db:"id"`
	DeviceID string    `db:"device_id"`
	Kind     string    `db:"alert_type"`
	Value    string    `db:"alert_value"`
	Status   string    `db:"alert_status"`
	Time     time.Time `db:"time"`
}

func (s *Store) AlertsSubscriber(ctx context.Context, data redis.AlertEvent) {
	log.InfoCtx(ctx, "alert", "device_id", data.IDIot, "type", data.Type, "message", data.IncidentField, "criticity", data.Criticity)

	err := s.createAlert(ctx, models.AlertsStruct{
		Id:          ulid.MustNew(ulid.Now(), rand.Reader).String(),
		DeviceId:    data.IDIot,
		AlertType:   data.Type,
		AlertValue:  data.IncidentField,
		AlertStatus: data.Criticity,
	})
	if err != nil {
		log.ErrorCtx(ctx, err.Error())
	}

	// send out event to all subscribers
	err = s.distributeAlerts(ctx, data)
	if err != nil {
		log.ErrorCtx(ctx, err.Error())
	}
}

func (s *Store) GetAlerts(ctx context.Context) ([]Alert, error) {
	var alerts []models.AlertsStruct
	err := s.conn.Query(models.Alerts.Select()).WithContext(ctx).GetRelease(&alerts)
	if err != nil {
		return nil, err
	}

	out := make([]Alert, len(alerts))
	for i, a := range alerts {
		aid := ulid.MustParse(a.Id)
		out[i] = Alert{
			ID:       aid,
			DeviceID: a.DeviceId,
			Kind:     a.AlertType,
			Value:    a.AlertValue,
			Status:   a.AlertStatus,
			Time:     ulid.Time(aid.Time()),
		}
	}

	return out, nil
}

func (s *Store) createAlert(ctx context.Context, data models.AlertsStruct) error {
	return s.conn.Query(models.Alerts.InsertBuilder().ToCql()).
		BindStruct(data).
		WithContext(ctx).
		ExecRelease()
}

func (s *Store) distributeAlerts(ctx context.Context, alert redis.AlertEvent) error {
	subscriptions, err := s.GetAllWebpushSubs(ctx)
	if err != nil {
		return err
	}

	kp, err := s.GetWebpushKey(ctx)
	if err != nil {
		return err
	}

	jsonData, err := json.Marshal(alert)
	if err != nil {
		return err
	}

	pool := conc.NewWaitGroup()
	for i := range subscriptions {
		sub := subscriptions[i]
		pool.Go(func() {
			err := SendWebpush(ctx, kp, sub, jsonData)
			if err != nil {
				log.WarnCtx(ctx, err.Error())
			}
		})
	}

	pool.Wait()
	return nil
}
