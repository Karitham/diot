package scylla

import (
	"context"

	"github.com/Karitham/iDIoT/api/scylla/models"
	"github.com/Karitham/iDIoT/api/session"
	"github.com/oklog/ulid"
	"github.com/scylladb/gocqlx/v2/qb"
)

type User struct {
	ID          string              `db:"id"`
	Email       string              `db:"email"`
	Name        string              `db:"name"`
	Password    string              `db:"password"`
	Permissions session.Permissions `db:"permissions"`
}

func (s *Store) CreateUser(ctx context.Context, user User) error {
	return s.conn.Query(models.Users.Insert()).
		WithContext(ctx).
		BindStruct(user).
		ExecRelease()
}

func (s *Store) GetUser(ctx context.Context, id ulid.ULID) (User, error) {
	var user User

	err := s.conn.Query(models.Users.Select()).
		BindMap(qb.M{"id": id.String()}).
		WithContext(ctx).
		GetRelease(&user)
	return user, err
}

func (s *Store) UpdateUser(ctx context.Context, user User) error {
	return s.conn.Query(models.Users.Update()).
		BindStruct(user).
		WithContext(ctx).
		ExecRelease()
}

func (s *Store) GetUserByEmail(ctx context.Context, email string) (User, error) {
	var user User

	err := s.conn.Query(`SELECT * FROM idiot.users WHERE email=?`, []string{"email"}).
		BindMap(qb.M{"email": email}).
		WithContext(ctx).
		GetRelease(&user)
	return user, err
}

func (s *Store) GetUsers(ctx context.Context) ([]User, error) {
	var users []User

	err := s.conn.Query(models.Users.SelectAll()).
		WithContext(ctx).
		SelectRelease(&users)
	return users, err
}

func (s *Store) DeleteUser(ctx context.Context, id ulid.ULID) error {
	return s.conn.Query(`DELETE FROM idiot.users WHERE id=?`, []string{"id"}).
		BindMap(qb.M{"id": id.String()}).
		WithContext(ctx).
		ExecRelease()
}
