// Package api provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/discord-gophers/goapi-gen version v0.3.0 DO NOT EDIT.
package api

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/render"
	"github.com/oklog/ulid"
)

const (
	BearerAuthScopes = "bearerAuth.Scopes"
)

// Defines values for SensorDataKind.
var (
	UnknownSensorDataKind = SensorDataKind{}

	SensorDataKindCamera = SensorDataKind{"camera"}

	SensorDataKindHumidity = SensorDataKind{"humidity"}

	SensorDataKindIaq = SensorDataKind{"iaq"}

	SensorDataKindTemperature = SensorDataKind{"temperature"}
)

// Error defines model for Error.
type Error struct {
	// Error message
	Message string `json:"message"`

	// Request ID
	RequestID *string `json:"request_id,omitempty"`
}

// SensorData defines model for SensorData.
type SensorData struct {
	// The sensor data
	Data interface{} `json:"data"`
	ID   string      `json:"id"`

	// The kind of sensor
	Kind SensorDataKind `json:"kind"`
}

// SensorInfo defines model for SensorInfo.
type SensorInfo struct {
	// Embedded struct due to allOf(#/components/schemas/SensorData)
	SensorData `yaml:",inline"`
	// Embedded fields due to inline allOf schema
	// A human readable label for the sensor
	Label string `json:"label"`
}

// SensorInfoCamera defines model for SensorInfoCamera.
type SensorInfoCamera struct {
	FeedURI string `json:"feed_uri"`
}

// SensorInfoHumidity defines model for SensorInfoHumidity.
type SensorInfoHumidity struct {
	Humidity float32 `json:"humidity"`
}

// SensorInfoIAQ defines model for SensorInfoIAQ.
type SensorInfoIAQ struct {
	Iaq float32 `json:"iaq"`
}

// SensorInfoTemperature defines model for SensorInfoTemperature.
type SensorInfoTemperature struct {
	Temperature float32 `json:"temperature"`
}

// User defines model for User.
type User struct {
	Email string    `json:"email"`
	ID    ulid.ULID `json:"id"`
	Name  string    `json:"name"`
}

// UserCreate defines model for UserCreate.
type UserCreate struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

// WebpushKey defines model for WebpushKey.
type WebpushKey struct {
	// Webpush key
	Key string `json:"key"`
}

// WebpushRegistration defines model for WebpushRegistration.
type WebpushRegistration struct {
	// Webpush endpoint
	Endpoint string `json:"endpoint"`

	// Webpush keys
	Keys struct {
		// Webpush auth key
		Auth string `json:"auth"`

		// Webpush p256dh key
		P256dh string `json:"p256dh"`
	} `json:"keys"`
}

// The kind of sensor
type SensorDataKind struct {
	value string
}

func (t *SensorDataKind) ToValue() string {
	return t.value
}
func (t SensorDataKind) MarshalJSON() ([]byte, error) {
	return json.Marshal(t.value)
}
func (t *SensorDataKind) UnmarshalJSON(data []byte) error {
	var value string
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	return t.FromValue(value)
}
func (t *SensorDataKind) FromValue(value string) error {
	switch value {

	case SensorDataKindCamera.value:
		t.value = value
		return nil

	case SensorDataKindHumidity.value:
		t.value = value
		return nil

	case SensorDataKindIaq.value:
		t.value = value
		return nil

	case SensorDataKindTemperature.value:
		t.value = value
		return nil

	}
	return fmt.Errorf("unknown enum value: %v", value)
}

// AuthLoginJSONBody defines parameters for AuthLogin.
type AuthLoginJSONBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// RegisterWebpushJSONBody defines parameters for RegisterWebpush.
type RegisterWebpushJSONBody WebpushRegistration

// CreateUserJSONBody defines parameters for CreateUser.
type CreateUserJSONBody UserCreate

// AuthLoginJSONRequestBody defines body for AuthLogin for application/json ContentType.
type AuthLoginJSONRequestBody AuthLoginJSONBody

// Bind implements render.Binder.
func (AuthLoginJSONRequestBody) Bind(*http.Request) error {
	return nil
}

// RegisterWebpushJSONRequestBody defines body for RegisterWebpush for application/json ContentType.
type RegisterWebpushJSONRequestBody RegisterWebpushJSONBody

// Bind implements render.Binder.
func (RegisterWebpushJSONRequestBody) Bind(*http.Request) error {
	return nil
}

// CreateUserJSONRequestBody defines body for CreateUser for application/json ContentType.
type CreateUserJSONRequestBody CreateUserJSONBody

// Bind implements render.Binder.
func (CreateUserJSONRequestBody) Bind(*http.Request) error {
	return nil
}

// Response is a common response struct for all the API calls.
// A Response object may be instantiated via functions for specific operation responses.
// It may also be instantiated directly, for the purpose of responding with a single status code.
type Response struct {
	body        interface{}
	Code        int
	contentType string
}

// Render implements the render.Renderer interface. It sets the Content-Type header
// and status code based on the response definition.
func (resp *Response) Render(w http.ResponseWriter, r *http.Request) error {
	w.Header().Set("Content-Type", resp.contentType)
	render.Status(r, resp.Code)
	return nil
}

// Status is a builder method to override the default status code for a response.
func (resp *Response) Status(code int) *Response {
	resp.Code = code
	return resp
}

// ContentType is a builder method to override the default content type for a response.
func (resp *Response) ContentType(contentType string) *Response {
	resp.contentType = contentType
	return resp
}

// MarshalJSON implements the json.Marshaler interface.
// This is used to only marshal the body of the response.
func (resp *Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(resp.body)
}

// MarshalXML implements the xml.Marshaler interface.
// This is used to only marshal the body of the response.
func (resp *Response) MarshalXML(e *xml.Encoder, start xml.StartElement) error {
	return e.Encode(resp.body)
}

// AuthLoginJSON200Response is a constructor method for a AuthLogin response.
// A *Response is returned with the configured status code and content type from the spec.
func AuthLoginJSON200Response(body struct {
	ExpireAt time.Time `json:"expire_at"`
	Token    string    `json:"token"`
}) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// AuthLoginJSONDefaultResponse is a constructor method for a AuthLogin response.
// A *Response is returned with the configured status code and content type from the spec.
func AuthLoginJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// AuthLogoutJSONDefaultResponse is a constructor method for a AuthLogout response.
// A *Response is returned with the configured status code and content type from the spec.
func AuthLogoutJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetWebpushKeyJSON200Response is a constructor method for a GetWebpushKey response.
// A *Response is returned with the configured status code and content type from the spec.
func GetWebpushKeyJSON200Response(body WebpushKey) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetWebpushKeyJSONDefaultResponse is a constructor method for a GetWebpushKey response.
// A *Response is returned with the configured status code and content type from the spec.
func GetWebpushKeyJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// RegisterWebpushJSONDefaultResponse is a constructor method for a RegisterWebpush response.
// A *Response is returned with the configured status code and content type from the spec.
func RegisterWebpushJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetSensorsJSON200Response is a constructor method for a GetSensors response.
// A *Response is returned with the configured status code and content type from the spec.
func GetSensorsJSON200Response(body []SensorInfo) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetSensorsJSONDefaultResponse is a constructor method for a GetSensors response.
// A *Response is returned with the configured status code and content type from the spec.
func GetSensorsJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetSensorsLiveJSON200Response is a constructor method for a GetSensorsLive response.
// A *Response is returned with the configured status code and content type from the spec.
func GetSensorsLiveJSON200Response(body []SensorData) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetSensorsLiveJSONDefaultResponse is a constructor method for a GetSensorsLive response.
// A *Response is returned with the configured status code and content type from the spec.
func GetSensorsLiveJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetUsersJSON200Response is a constructor method for a GetUsers response.
// A *Response is returned with the configured status code and content type from the spec.
func GetUsersJSON200Response(body []User) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetUsersJSONDefaultResponse is a constructor method for a GetUsers response.
// A *Response is returned with the configured status code and content type from the spec.
func GetUsersJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// CreateUserJSON200Response is a constructor method for a CreateUser response.
// A *Response is returned with the configured status code and content type from the spec.
func CreateUserJSON200Response(body User) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// CreateUserJSONDefaultResponse is a constructor method for a CreateUser response.
// A *Response is returned with the configured status code and content type from the spec.
func CreateUserJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// DeleteUserByIDJSON200Response is a constructor method for a DeleteUserByID response.
// A *Response is returned with the configured status code and content type from the spec.
func DeleteUserByIDJSON200Response(body User) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// DeleteUserByIDJSONDefaultResponse is a constructor method for a DeleteUserByID response.
// A *Response is returned with the configured status code and content type from the spec.
func DeleteUserByIDJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetUserByIDJSON200Response is a constructor method for a GetUserByID response.
// A *Response is returned with the configured status code and content type from the spec.
func GetUserByIDJSON200Response(body User) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}

// GetUserByIDJSONDefaultResponse is a constructor method for a GetUserByID response.
// A *Response is returned with the configured status code and content type from the spec.
func GetUserByIDJSONDefaultResponse(body Error) *Response {
	return &Response{
		body:        body,
		Code:        200,
		contentType: "application/json",
	}
}
