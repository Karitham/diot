package scylla

import (
	"context"
	"fmt"
	"sort"

	"github.com/Karitham/iDIoT/api/scylla/models"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
)

const keyspace = "idiot"
const migKeyspace = `CREATE KEYSPACE IF NOT EXISTS idiot WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`
const migTable = `CREATE TABLE IF NOT EXISTS idiot.migrations (
	id int PRIMARY KEY,
	time timeuuid,
	content text
);`

var migrations = []string{
	`CREATE TABLE idiot.users (
		id varchar,
		email varchar,
		name varchar,
		password varchar,
		permissions set<varchar>,
		PRIMARY KEY (id, email)
	);`,

	`CREATE INDEX users_email_idx ON idiot.users (email);`,

	`CREATE TABLE idiot.webpush_subscriptions (
		user_id varchar PRIMARY KEY,
		subscription set<blob>
	);`,

	`CREATE TABLE idiot.keys (
		id varchar PRIMARY KEY,
		private_key blob,
		public_key blob
	);`,

	`CREATE TABLE idiot.devices (
		id varchar PRIMARY KEY,
		name varchar
	);`,

	`CREATE TABLE idiot.sensor_readings (
		iot_id varchar,
		time timestamp,
		value blob,
		PRIMARY KEY (iot_id, time)
	) WITH CLUSTERING ORDER BY (time DESC);`,

	`CREATE TABLE idiot.alerts (
		id varchar,
		device_id varchar,
		alert_type varchar,
		alert_value varchar,
		alert_status varchar,
		criticity varchar,
		PRIMARY KEY (id)
	);`,
}

func Migrate(ctx context.Context, conn gocqlx.Session) error {
	err := conn.ExecStmt(migKeyspace)
	if err != nil {
		return fmt.Errorf("migKeyspace failed: %w", err)
	}

	err = conn.ExecStmt(migTable)
	if err != nil {
		return fmt.Errorf("migTable failed: %w", err)
	}

	var lastIndex int
	err = conn.Query(`SELECT MAX(id) FROM idiot.migrations LIMIT 1`, nil).WithContext(ctx).GetRelease(&lastIndex)
	if err != nil && err != gocql.ErrNotFound {
		return fmt.Errorf("migLastIndex failed: %w", err)
	}

	if lastIndex >= len(migrations) {
		log.Debug("database is up to date")
		return nil
	}

	log.Info("migrating database", "current", lastIndex, "target", len(migrations))

	for i, m := range migrations[lastIndex:] {
		err := conn.ExecStmt(m)
		if err != nil {
			return fmt.Errorf("mig %d failed: %w", lastIndex+i, err)
		}

		err = conn.Query("INSERT INTO idiot.migrations (id, content, time) VALUES (?, ?, ?);", []string{
			"id",
			"content",
			"time",
		}).BindMap(qb.M{
			"content": m,
			"time":    gocql.TimeUUID(),
			"id":      lastIndex + i + 1, // +1 because we start at 0
		}).WithContext(ctx).Exec()
		if err != nil {
			return err
		}
	}

	log.Info("database migrated")

	return nil
}

func (s *Store) GetMigrations(ctx context.Context) ([]models.MigrationsStruct, error) {
	var migrations []models.MigrationsStruct
	err := s.conn.Query(models.Migrations.SelectAll()).WithContext(ctx).SelectRelease(&migrations)
	if err != nil {
		return migrations, fmt.Errorf("getMigrations failed: %w", err)
	}

	sort.Slice(migrations, func(i, j int) bool {
		return migrations[i].Id < migrations[j].Id
	})

	return migrations, nil
}
