package store

// scyllab
import (
	"context"
	"os"

	"github.com/Karitham/iDIoT/api/store/models"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"golang.org/x/exp/slog"
)

var log = slog.New(slog.NewTextHandler(os.Stderr)).With("pkg", "store")

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
		return err
	}

	err = conn.ExecStmt(migTable)
	if err != nil {
		return err
	}

	var id int
	err = conn.Query(`SELECT COUNT(*) FROM idiot.migrations`, nil).WithContext(ctx).GetRelease(&id)
	if err != nil {
		return err
	}

	if id == len(migrations) {
		log.Debug("database is up to date")
		return nil
	}

	log.Info("migrating database", "current", id, "target", len(migrations))

	for _, m := range migrations {
		err := conn.ExecStmt(m)
		if err != nil {
			return err
		}

		err = conn.Query(qb.Insert("idiot.migrations").Columns(models.Migrations.Metadata().Columns...).ToCql()).BindMap(qb.M{
			"content": m,
			"time":    gocql.TimeUUID(),
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
