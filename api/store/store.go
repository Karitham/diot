package store

// scyllab
import (
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
)

type Store struct {
	conn gocqlx.Session
}

func New(clusterAddr ...string) *Store {
	cluster := gocql.NewCluster(clusterAddr...)
	session, err := gocqlx.WrapSession(cluster.CreateSession())
	if err != nil {
		panic(err)
	}

	err = Migrate(session)
	if err != nil {
		panic(err)
	}

	cluster.Keyspace = "idiot"
	session, err = gocqlx.WrapSession(cluster.CreateSession())
	if err != nil {
		panic(err)
	}

	return &Store{
		conn: session,
	}
}

var migrations = []string{
	`CREATE KEYSPACE IF NOT EXISTS idiot WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`,
	`CREATE TABLE IF NOT EXISTS idiot.users (
		id varchar,
		email varchar,
		name varchar,
		password varchar,
		PRIMARY KEY (id, email)
	)`,
	`CREATE INDEX IF NOT EXISTS users_email_idx ON idiot.users (email);`,
}

func Migrate(conn gocqlx.Session) error {
	for _, m := range migrations {
		err := conn.ExecStmt(m)
		if err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) Close() {
	s.conn.Close()
}
