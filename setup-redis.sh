#/usr/bin/env bash

set -e -o pipefail

iot_password=${IOT_PASS:?"IOT_PASS is required"}
redis_password=${REDIS_PASS:?"REDIS_PASS is required"}
iot_user=${IOT_USER-"iot"}

# add password to default user
redis-cli -a "$redis_password" --user default ACL SETUSER default ">$redis_password"

# let $user pub/sub to iot: prefixed channels
redis-cli -a "$redis_password" --user default ACL SETUSER "$iot_user" '&iot:*' +subscribe +publish ">$iot_password"
