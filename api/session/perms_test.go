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
			require: []Permission{UserCreate},
			want:    false,
		},
		{
			name:    "one",
			userHas: Permissions{UserCreate},
			require: []Permission{UserCreate},
			want:    true,
		},
		{
			name:    "one not",
			userHas: Permissions{UserCreate},
			require: []Permission{SensorRead},
			want:    false,
		},
		{
			name:    "one of two",
			userHas: Permissions{UserCreate, SensorRead},
			require: []Permission{SensorRead},
			want:    true,
		},
		{
			name:    "prefix",
			userHas: Permissions{SensorRead},
			require: []Permission{SensorRead + ":DHJQWLDLASKDJ"},
			want:    true,
		},
		{
			name:    "prefix not",
			userHas: Permissions{SensorRead + "DHJQWLDLASKDJ"},
			require: []Permission{SensorRead},
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
