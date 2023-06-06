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
  'Accept':'application/json'
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
  -H 'Accept: application/json'

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
None ( Scopes: users:create )
</aside>

## getUsers

<a id="opIdgetUsers"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
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
  -H 'Accept: application/json'

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
None ( Scopes: users:read )
</aside>

## getUserById

<a id="opIdgetUserById"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
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
  -H 'Accept: application/json'

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
None
</aside>

## deleteUserById

<a id="opIddeleteUserById"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
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
  -H 'Accept: application/json'

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
None ( Scopes: users:delete )
</aside>

<h1 id="idiot-backend-api-auth">auth</h1>

Operations about auth

## authLogin

<a id="opIdauthLogin"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/v1/auth/login',
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
curl -X POST /v1/auth/login \
  -H 'Accept: application/json'

```

`POST /auth/login`

*Login*

> Example responses

> 200 Response

```json
{
  "token": "sess_dwquijlbndwqbyuidhkwqdyuibqwd89d30y12dh22389d:dh189gd2d1ghod921"
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
|» token|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
None ( Scopes: users:create users:read users:delete sensors:read sensors:update sensors:delete sensors:state:update )
</aside>

## authLogout

<a id="opIdauthLogout"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
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
  -H 'Accept: application/json'

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
None
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

