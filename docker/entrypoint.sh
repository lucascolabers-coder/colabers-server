#!/bin/sh
set -eu

echo "Waiting for PostgreSQL at ${DB_HOST}:${DB_PORT}..."
until pg_isready -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USERNAME}" -d "${DB_DATABASE}"; do
  sleep 2
done

echo "Running migrations..."
npm run migration:run

echo "Starting application..."
exec "$@"
