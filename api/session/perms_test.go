package session

import "testing"

func TestPermissions_Has(t *testing.T) {
	tests := []struct {
		name    string
		userHas Permissions
		require []Permission
		want    bool
	}{
		{
			name:    "empty",
			userHas: Permissions{},
			require: []Permission{PermUserCreate},
			want:    false,
		},
		{
			name:    "one",
			userHas: Permissions{PermUserCreate},
			require: []Permission{PermUserCreate},
			want:    true,
		},
		{
			name:    "one not",
			userHas: Permissions{PermUserCreate},
			require: []Permission{PermSensorRead},
			want:    false,
		},
		{
			name:    "one of two",
			userHas: Permissions{PermUserCreate, PermSensorRead},
			require: []Permission{PermSensorRead},
			want:    true,
		},
		{
			name:    "prefix",
			userHas: Permissions{PermSensorRead},
			require: []Permission{PermSensorRead + ":DHJQWLDLASKDJ"},
			want:    true,
		},
		{
			name:    "prefix not",
			userHas: Permissions{PermSensorRead + "DHJQWLDLASKDJ"},
			require: []Permission{PermSensorRead},
			want:    false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.userHas.Has(tt.require...); got != tt.want {
				t.Errorf("Permissions.Has() = %v, want %v", got, tt.want)
			}
		})
	}
}
