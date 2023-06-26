FROM golang:1.20-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o media-proxy .

FROM alpine:3.14

RUN apk add --no-cache ffmpeg

COPY --from=builder /app/media-proxy /usr/local/bin/media-proxy

ENV PORT 8089

ENTRYPOINT ["/usr/local/bin/media-proxy"]