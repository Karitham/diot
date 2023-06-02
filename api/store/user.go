package store

import (
	"context"

	"github.com/oklog/ulid"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
)

var userTableMeta = table.Metadata{
	Name:    "users",
	Columns: []string{"id", "email", "name", "password"},
	PartKey: []string{"id"},
	SortKey: []string{"id"},
}

var userTable = table.New(userTableMeta)

type User struct {
	ID       string `db:"id"`
	Email    string `db:"email"`
	Name     string `db:"name"`
	Password []byte `db:"password"`
}

func (s *Store) CreateUser(ctx context.Context, user User) error {
	return s.conn.Query(userTable.Insert()).
		WithContext(ctx).
		BindStruct(user).
		ExecRelease()
}

func (s *Store) GetUserByID(ctx context.Context, id ulid.ULID) (User, error) {
	var user User

	err := s.conn.Query(userTable.Select()).
		BindMap(qb.M{"id": id.String()}).
		WithContext(ctx).
		GetRelease(&user)
	return user, err
}

func (s *Store) UpdateUser(ctx context.Context, user User) error {
	return s.conn.Query(userTable.Update()).
		BindStruct(user).
		WithContext(ctx).
		ExecRelease()
}

func (s *Store) GetUserByEmail(ctx context.Context, email string) (User, error) {
	var user User

	err := s.conn.Query(userTable.Select()).
		BindMap(qb.M{"email": email}).
		WithContext(ctx).
		GetRelease(&user)
	return user, err
}

func (s *Store) GetUsers(ctx context.Context) ([]User, error) {
	var users []User

	err := s.conn.Query(userTable.SelectAll()).
		WithContext(ctx).
		SelectRelease(&users)
	return users, err
}

func (s *Store) DeleteUser(ctx context.Context, id ulid.ULID) error {
	return s.conn.Query(userTable.Delete()).
		BindMap(qb.M{"id": id.String()}).
		WithContext(ctx).
		ExecRelease()
}
