module github.com/Karitham/iDIoT/api

go 1.20

require (
	github.com/SherClockHolmes/webpush-go v1.2.0
	github.com/discord-gophers/goapi-gen v0.3.0
	github.com/go-chi/chi/v5 v5.0.8
	github.com/go-chi/cors v1.2.1
	github.com/go-chi/render v1.0.2
	github.com/gocql/gocql v1.5.2
	github.com/google/uuid v1.3.0
	github.com/oklog/ulid v1.3.1
	github.com/redis/rueidis v1.0.10
	github.com/scylladb/gocqlx/v2 v2.8.0
	github.com/sourcegraph/conc v0.3.0
	github.com/urfave/cli/v2 v2.25.6
	golang.org/x/crypto v0.10.0
	golang.org/x/exp v0.0.0-20230522175609-2e198f4a06a1
	golang.org/x/net v0.11.0
	nhooyr.io/websocket v1.8.7
)

require github.com/klauspost/compress v1.10.3 // indirect

require (
	github.com/ajg/form v1.5.1 // indirect
	github.com/cpuguy83/go-md2man/v2 v2.0.2 // indirect
	github.com/go-json-experiment/json v0.0.0-20230324203220-04923b7a9528
	github.com/golang-jwt/jwt v3.2.2+incompatible // indirect
	github.com/golang/snappy v0.0.4 // indirect
	github.com/hailocab/go-hostpool v0.0.0-20160125115350-e80d13ce29ed // indirect
	github.com/russross/blackfriday/v2 v2.1.0 // indirect
	github.com/scylladb/go-reflectx v1.0.1 // indirect
	github.com/stretchr/testify v1.8.2 // indirect
	github.com/xrash/smetrics v0.0.0-20201216005158-039620a65673 // indirect
	gopkg.in/inf.v0 v0.9.1 // indirect
)

replace github.com/gocql/gocql => github.com/scylladb/gocql v1.7.4-0.20230613085825-f60a7324080f
