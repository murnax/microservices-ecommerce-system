#!/bin/bash
# wait-for-postgres.sh

sleep 3

# set -e

# host="$1"
# shift
cmd="$@"

# until psql -h "kong-database" -U "postgres" -c '\q'; do
#   >&2 echo "Postgres is unavailable - sleeping"
#   sleep 1
# done

# >&2 echo "Postgres is up - executing command"
ls -la
which kong
ls -la $(which kong)
kong migration up
# exec kong
# exec kong migration up
# exec $cmd