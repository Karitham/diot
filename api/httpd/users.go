package httpd

import (
	"crypto/rand"
	"net/http"

	"github.com/go-json-experiment/json"
	"github.com/oklog/ulid"
	"golang.org/x/crypto/bcrypt"

	"github.com/Karitham/iDIoT/api/httpd/api"
	"github.com/Karitham/iDIoT/api/scylla"
	"github.com/Karitham/iDIoT/api/session"
)

// (POST /users)
func (s Service) CreateUser(w http.ResponseWriter, r *http.Request) *api.Response {
	var u api.CreateUserJSONRequestBody
	err := json.UnmarshalFull(r.Body, &u)
	if err != nil {
		return WError(w, r, err, 400, "Bad request")
	}

	// check if email exists
	_, err = s.store.GetUserByEmail(r.Context(), u.Email)
	if err == nil {
		return WError(w, r, err, 400, "Email already exists")
	}

	p, err := bcrypt.GenerateFromPassword([]byte(u.Password), 12)
	if err != nil {
		return WError(w, r, err, 400, "Bad request")
	}

	// hash password
	su := scylla.User{
		Email:       u.Email,
		Name:        u.Name,
		ID:          ulid.MustNew(ulid.Now(), rand.Reader).String(),
		Password:    string(p),
		Permissions: session.FromString(u.Permissions...),
	}

	err = s.store.CreateUser(r.Context(), su)
	if err != nil {
		return WError(w, r, err, 500, err.Error())
	}

	return api.CreateUserJSON200Response(api.User{
		ID:          ulid.MustParse(su.ID),
		Email:       su.Email,
		Name:        su.Name,
		Permissions: su.Permissions.Strings(),
	})
}

// (GET /users/{id})
func (us Service) GetUserByID(w http.ResponseWriter, r *http.Request, id ulid.ULID) *api.Response {
	u, err := us.store.GetUser(r.Context(), id)
	if err != nil {
		return WError(w, r, err, 404, err.Error())
	}

	return api.GetUserByIDJSON200Response(api.User{
		ID:          ulid.MustParse(u.ID),
		Email:       u.Email,
		Name:        u.Name,
		Permissions: u.Permissions.Strings(),
	})
}

// (GET /users)
func (us Service) GetUsers(w http.ResponseWriter, r *http.Request) *api.Response {
	u, err := us.store.GetUsers(r.Context())
	if err != nil {
		return WError(w, r, err, 404, err.Error())
	}

	// convert []store.User to []api.User
	var users []api.User
	for _, v := range u {
		users = append(users, api.User{
			ID:          ulid.MustParse(v.ID),
			Email:       v.Email,
			Name:        v.Name,
			Permissions: v.Permissions.Strings(),
		})
	}

	return api.GetUsersJSON200Response(users)
}

// (DELETE /users/{id})
func (us Service) DeleteUserByID(w http.ResponseWriter, r *http.Request, id ulid.ULID) *api.Response {
	err := us.store.DeleteUser(r.Context(), id)
	if err != nil {
		return WError(w, r, err, 404, err.Error())
	}

	return nil
}
