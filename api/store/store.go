package store

// scyllab
import (
	"context"
	"fmt"
	"os"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{})).With("pkg", "store")

type Store struct {
	conn gocqlx.Session
}

func New(ctx context.Context, clusterAddr ...string) *Store {
	cluster := gocql.NewCluster(clusterAddr...)
	session, err := gocqlx.WrapSession(cluster.CreateSession())
	if err != nil {
		panic(err)
	}

	err = Migrate(ctx, session)
	if err != nil {
		panic(err)
	}

	cluster.Keyspace = keyspace
	session, err = gocqlx.WrapSession(cluster.CreateSession())
	if err != nil {
		panic(err)
	}

	return &Store{
		conn: session,
	}
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

	if lastIndex >= (len(migrations) - 1) {
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
			"id":      lastIndex + i,
		}).WithContext(ctx).Exec()
		if err != nil {
			return err
		}
	}

	log.Info("database migrated")

	return nil
}

func (s *Store) Close() {
	s.conn.Close()
}
