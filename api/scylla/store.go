package scylla

// scyllab
import (
	"context"
	"os"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
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

func (s *Store) Close() {
	s.conn.Close()
}
