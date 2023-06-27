package session

import (
	"fmt"
	"strings"
)

// Permission represents a permission prefix;
// it is used to check if a user has the permission to do something.
// It might be suffixed with a resource ID to check if the user has the permission to do something on a specific resource.
type Permission string

const (
	// PermRoot has all permissions
	PermRoot Permission = "perm"

	// PermUserCreate is the permission to create a user
	PermUserCreate Permission = "perm:users:create"
	PermUserRead   Permission = "perm:users:read"
	PermUserDelete Permission = "perm:users:delete"

	// PermSensorRead is the permission to read a sensor
	PermSensorRead   Permission = "perm:sensors:read"
	PermSensorUpdate Permission = "perm:sensors:update"
	PermSensorDelete Permission = "perm:sensors:delete"

	// PermAlertsRead is the permission to read alerts
	PermAlertsRead Permission = "perm:alerts:read"

	// PermSensorsStateUpdate is the permission to update a sensor state
	PermSensorsStateUpdate Permission = "perm:sensors:state:update"
)

// Permissions is a list of permissions
type Permissions []Permission

// has checks if the list of permissions contains the given permission
func (p Permissions) has(wantPerms ...Permission) int {
outer:
	// check that all required permissions are in the list.
	// the match is prefix based, so "perm:users" will match "perm:users:create"
	for i, wantPerm := range wantPerms {
		for _, ownPerm := range p {
			if strings.HasPrefix(string(wantPerm), string(ownPerm)) {
				continue outer
			}
		}

		return i
	}

	return -1
}

func (p Permissions) Has(permission ...Permission) bool {
	return p.has(permission...) == -1
}

func (p Permissions) Can(permission ...Permission) error {
	h := p.has(permission...)
	if h == -1 {
		return nil
	}

	return fmt.Errorf("missing permission %s", permission[h])
}

func FromString(s ...string) Permissions {
	p := make(Permissions, len(s))
	for i, s := range s {
		p[i] = Permission(s)
	}

	return p
}

func (p Permissions) Strings() []string {
	s := make([]string, len(p))
	for i, p := range p {
		s[i] = string(p)
	}

	return s
}

func (p Permission) Customize(resourceID string) Permission {
	return Permission(string(p) + ":" + resourceID)
}
