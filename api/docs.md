---
title: iDIoT backend API v0.0.1
language_tabs:
  - javascript: JS
  - shell: Shell
language_clients:
  - javascript: ""
  - shell: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="idiot-backend-api">iDIoT backend API v0.0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

iDIoT backend API

Base URLs:

* <a href="/v1">/v1</a>

# Authentication

- HTTP Authentication, scheme: bearer 

* API Key (apiKey)
    - Parameter Name: **api-key**, in: query. 

<h1 id="idiot-backend-api-user">user</h1>

Operations about user

## createUser

<a id="opIdcreateUser"></a>

> Code samples

```javascript
const inputBody = '{
  "name": "hi mark",
  "email": "x@example.com",
  "password": "DWD21378udh#g3@#d"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/users',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X POST /v1/users \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /users`

*Create a user*

> Body parameter

```json
{
  "name": "hi mark",
  "email": "x@example.com",
  "password": "DWD21378udh#g3@#d"
}
```

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserCreate](#schemausercreate)|true|Create a new user|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "name": "hi mark",
  "email": "x@example.com"
}
```

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|[User](#schemauser)|
|default|Default|unexpected error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth ( Scopes: perm:users:create )
</aside>

## getUsers

<a id="opIdgetUsers"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/users',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X GET /v1/users \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /users`

*Get all users*

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "name": "hi mark",
    "email": "x@example.com"
  }
]
```

<h3 id="getusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|Inline|
|default|Default|unexpected error|[Error](#schemaerror)|

<h3 id="getusers-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|none|
|» id|string|true|none|none|
|» name|string|true|none|none|
|» email|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth ( Scopes: perm:users:read )
</aside>

## getUserById

<a id="opIdgetUserById"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/users/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X GET /v1/users/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /users/{id}`

*Get a user by id*

<h3 id="getuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id of user to return|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "name": "hi mark",
  "email": "x@example.com"
}
```

<h3 id="getuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|[User](#schemauser)|
|default|Default|unexpected error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## deleteUserById

<a id="opIddeleteUserById"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/users/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X DELETE /v1/users/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`DELETE /users/{id}`

*Delete a user by id*

<h3 id="deleteuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id of user to delete|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "name": "hi mark",
  "email": "x@example.com"
}
```

<h3 id="deleteuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|[User](#schemauser)|
|default|Default|unexpected error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth ( Scopes: users:delete )
</aside>

<h1 id="idiot-backend-api-auth">auth</h1>

Operations about auth

## authLogin

<a id="opIdauthLogin"></a>

> Code samples

```javascript
const inputBody = '{
  "email": "abc@efg.xyz",
  "password": "DHBUD@&#W(IJOQDJCNE@DQFX$#D)"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/auth/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X POST /v1/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /auth/login`

*Login*

> Body parameter

```json
{
  "email": "abc@efg.xyz",
  "password": "DHBUD@&#W(IJOQDJCNE@DQFX$#D)"
}
```

<h3 id="authlogin-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|Login|
|» email|body|string|true|none|
|» password|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "token": "sess_dwquijlbndwqbyuidhkwqdyuibqwd89d30y12dh22389d:dh189gd2d1ghod921",
  "expire_at": "2021-01-01T00:00:00Z"
}
```

<h3 id="authlogin-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|Inline|
|default|Default|unexpected error|[Error](#schemaerror)|

<h3 id="authlogin-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» token|string|true|none|none|
|» expire_at|string(date-time)|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth ( Scopes: perm perm:users:create perm:users:read perm:users:delete perm:alerts:read perm:sensors:read perm:sensors:update perm:sensors:delete perm:sensors:state:update )
</aside>

## authLogout

<a id="opIdauthLogout"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/auth/logout',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X POST /v1/auth/logout \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /auth/logout`

*Logout*

> Example responses

> default Response

```json
{
  "message": "string",
  "request_id": "string"
}
```

<h3 id="authlogout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|None|
|default|Default|unexpected error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="idiot-backend-api-notification">notification</h1>

## getWebpushKey

<a id="opIdgetWebpushKey"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/notifications/webpush',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X GET /v1/notifications/webpush \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /notifications/webpush`

*Send a webpush notification key*

> Example responses

> 200 Response

```json
{
  "key": "string"
}
```

<h3 id="getwebpushkey-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|[WebpushKey](#schemawebpushkey)|
|default|Default|unexpected error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## registerWebpush

<a id="opIdregisterWebpush"></a>

> Code samples

```javascript
const inputBody = '{
  "endpoint": "string",
  "keys": {
    "p256dh": "string",
    "auth": "string"
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/notifications/webpush',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X POST /v1/notifications/webpush \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /notifications/webpush`

*Send a webpush notification registration payload*

> Body parameter

```json
{
  "endpoint": "string",
  "keys": {
    "p256dh": "string",
    "auth": "string"
  }
}
```

<h3 id="registerwebpush-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[WebpushRegistration](#schemawebpushregistration)|true|Create a new user|

> Example responses

> default Response

```json
{
  "message": "string",
  "request_id": "string"
}
```

<h3 id="registerwebpush-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|None|
|default|Default|unexpected error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="idiot-backend-api-sensor">sensor</h1>

## getSensors

<a id="opIdgetSensors"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/sensors',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X GET /v1/sensors \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /sensors`

*Get all sensors*

> Example responses

> 200 Response

```json
[
  null
]
```

<h3 id="getsensors-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|Inline|
|default|Default|unexpected error|[Error](#schemaerror)|

<h3 id="getsensors-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[allOf]|false|none|none|

*allOf - discriminator: kind*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» kind|string|true|none|The kind of sensor|
|»» data|any|true|none|The sensor data|

*oneOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[SensorInfoHumidity](#schemasensorinfohumidity)|false|none|none|
|»»»» humidity|number|true|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[SensorInfoTemperature](#schemasensorinfotemperature)|false|none|none|
|»»»» temperature|number|true|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[SensorInfoCamera](#schemasensorinfocamera)|false|none|none|
|»»»» feed_uri|string|true|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[SensorInfoIAQ](#schemasensorinfoiaq)|false|none|none|
|»»»» iaq|number|true|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» id|string|true|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» label|string|true|none|A human readable label for the sensor|

#### Enumerated Values

|Property|Value|
|---|---|
|kind|camera|
|kind|humidity|
|kind|temperature|
|kind|iaq|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth ( Scopes: perm:sensors:read )
</aside>

## getSensorsLive

<a id="opIdgetSensorsLive"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/sensors/live',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X GET /v1/sensors/live \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /sensors/live`

*Get live sensor data*

This endpoint returns live data from the sensors.
It is a websocket endpoint, so you need to use a websocket client to connect to it.

> Example responses

> 200 Response

```json
[
  {
    "kind": "camera",
    "data": {
      "humidity": 23.4
    },
    "id": "string"
  }
]
```

<h3 id="getsensorslive-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|Inline|
|default|Default|unexpected error|[Error](#schemaerror)|

<h3 id="getsensorslive-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[SensorData](#schemasensordata)]|false|none|none|
|» kind|string|true|none|The kind of sensor|
|» data|any|true|none|The sensor data|

*oneOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[SensorInfoHumidity](#schemasensorinfohumidity)|false|none|none|
|»»» humidity|number|true|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[SensorInfoTemperature](#schemasensorinfotemperature)|false|none|none|
|»»» temperature|number|true|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[SensorInfoCamera](#schemasensorinfocamera)|false|none|none|
|»»» feed_uri|string|true|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[SensorInfoIAQ](#schemasensorinfoiaq)|false|none|none|
|»»» iaq|number|true|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|string|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|kind|camera|
|kind|humidity|
|kind|temperature|
|kind|iaq|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth ( Scopes: perm:sensors:read )
</aside>

<h1 id="idiot-backend-api-alert">alert</h1>

## getAlerts

<a id="opIdgetAlerts"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/v1/alerts',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```shell
# You can also use wget
curl -X GET /v1/alerts \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /alerts`

*Get all alerts*

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "sensor_id": "string",
    "kind": "string",
    "value": "string",
    "created_at": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="getalerts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ok|Inline|
|default|Default|unexpected error|[Error](#schemaerror)|

<h3 id="getalerts-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[AlertHistoryEntry](#schemaalerthistoryentry)]|false|none|none|
|» id|string|true|none|none|
|» sensor_id|string|true|none|none|
|» kind|string|true|none|none|
|» value|string|true|none|none|
|» created_at|string(date-time)|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth ( Scopes: perm:alerts:read )
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "string",
  "name": "hi mark",
  "email": "x@example.com"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|
|email|string|true|none|none|

<h2 id="tocS_UserCreate">UserCreate</h2>
<!-- backwards compatibility -->
<a id="schemausercreate"></a>
<a id="schema_UserCreate"></a>
<a id="tocSusercreate"></a>
<a id="tocsusercreate"></a>

```json
{
  "name": "hi mark",
  "email": "x@example.com",
  "password": "DWD21378udh#g3@#d"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|email|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_Error">Error</h2>
<!-- backwards compatibility -->
<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "message": "string",
  "request_id": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Error message|
|request_id|string|false|none|Request ID|

<h2 id="tocS_WebpushKey">WebpushKey</h2>
<!-- backwards compatibility -->
<a id="schemawebpushkey"></a>
<a id="schema_WebpushKey"></a>
<a id="tocSwebpushkey"></a>
<a id="tocswebpushkey"></a>

```json
{
  "key": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|key|string|true|none|Webpush key|

<h2 id="tocS_WebpushRegistration">WebpushRegistration</h2>
<!-- backwards compatibility -->
<a id="schemawebpushregistration"></a>
<a id="schema_WebpushRegistration"></a>
<a id="tocSwebpushregistration"></a>
<a id="tocswebpushregistration"></a>

```json
{
  "endpoint": "string",
  "keys": {
    "p256dh": "string",
    "auth": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|endpoint|string|true|none|Webpush endpoint|
|keys|object|true|none|Webpush keys|
|» p256dh|string|true|none|Webpush p256dh key|
|» auth|string|true|none|Webpush auth key|

<h2 id="tocS_SensorInfoCamera">SensorInfoCamera</h2>
<!-- backwards compatibility -->
<a id="schemasensorinfocamera"></a>
<a id="schema_SensorInfoCamera"></a>
<a id="tocSsensorinfocamera"></a>
<a id="tocssensorinfocamera"></a>

```json
{
  "feed_uri": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|feed_uri|string|true|none|none|

<h2 id="tocS_SensorInfoHumidity">SensorInfoHumidity</h2>
<!-- backwards compatibility -->
<a id="schemasensorinfohumidity"></a>
<a id="schema_SensorInfoHumidity"></a>
<a id="tocSsensorinfohumidity"></a>
<a id="tocssensorinfohumidity"></a>

```json
{
  "humidity": 23.4
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|humidity|number|true|none|none|

<h2 id="tocS_SensorInfoTemperature">SensorInfoTemperature</h2>
<!-- backwards compatibility -->
<a id="schemasensorinfotemperature"></a>
<a id="schema_SensorInfoTemperature"></a>
<a id="tocSsensorinfotemperature"></a>
<a id="tocssensorinfotemperature"></a>

```json
{
  "temperature": 23.4
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|temperature|number|true|none|none|

<h2 id="tocS_SensorInfoIAQ">SensorInfoIAQ</h2>
<!-- backwards compatibility -->
<a id="schemasensorinfoiaq"></a>
<a id="schema_SensorInfoIAQ"></a>
<a id="tocSsensorinfoiaq"></a>
<a id="tocssensorinfoiaq"></a>

```json
{
  "iaq": 23.4
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|iaq|number|true|none|none|

<h2 id="tocS_SensorInfo">SensorInfo</h2>
<!-- backwards compatibility -->
<a id="schemasensorinfo"></a>
<a id="schema_SensorInfo"></a>
<a id="tocSsensorinfo"></a>
<a id="tocssensorinfo"></a>

```json
null

```

### Properties

allOf - discriminator: SensorData.kind

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[SensorData](#schemasensordata)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» label|string|true|none|A human readable label for the sensor|

<h2 id="tocS_SensorData">SensorData</h2>
<!-- backwards compatibility -->
<a id="schemasensordata"></a>
<a id="schema_SensorData"></a>
<a id="tocSsensordata"></a>
<a id="tocssensordata"></a>

```json
{
  "kind": "camera",
  "data": {
    "humidity": 23.4
  },
  "id": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|The kind of sensor|
|data|any|true|none|The sensor data|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SensorInfoHumidity](#schemasensorinfohumidity)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SensorInfoTemperature](#schemasensorinfotemperature)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SensorInfoCamera](#schemasensorinfocamera)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SensorInfoIAQ](#schemasensorinfoiaq)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|kind|camera|
|kind|humidity|
|kind|temperature|
|kind|iaq|

<h2 id="tocS_AlertHistoryEntry">AlertHistoryEntry</h2>
<!-- backwards compatibility -->
<a id="schemaalerthistoryentry"></a>
<a id="schema_AlertHistoryEntry"></a>
<a id="tocSalerthistoryentry"></a>
<a id="tocsalerthistoryentry"></a>

```json
{
  "id": "string",
  "sensor_id": "string",
  "kind": "string",
  "value": "string",
  "created_at": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|sensor_id|string|true|none|none|
|kind|string|true|none|none|
|value|string|true|none|none|
|created_at|string(date-time)|true|none|none|

