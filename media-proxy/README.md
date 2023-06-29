# Media Proxy

The media proxy is a simple HTTP server that proxies requests from the arduino camera to the frontend clients.

## Publishing

The arduino cameras should send Basic Authenticated requests to the media proxy.

Requests should be of Content-Type `multipart/form-data` with as many jpg files as needed.

Example:

```http
POST /video/arduino_id HTTP/1.1

Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575


-----------------------------974767299852498929531610575

Content-Disposition: form-data; name="image"; filename="image1.jpg"
Content-Type: image/jpeg

<image data>

-----------------------------974767299852498929531610575

Content-Disposition: form-data; name="image"; filename="image2.jpg"

<image data>

-----------------------------974767299852498929531610575--
```

## Subscribing

The media proxy serves FLV streams to the frontend clients.

Subscribe to a stream by sending a GET request to `/video/arduino_id`.

Example:

```http
GET /video/arduino_id HTTP/1.1
```
