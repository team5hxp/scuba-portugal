#!/bin/bash
set +x
if [ -z "${GOOGLE_CHROME_SHIM}" ];
then
  echo "Using default google chrome binary"
else
  echo using Chrome: $GOOGLE_CHROME_SHIM
fi
export PORT=5000
gunicorn gettingstarted.wsgi:application --log-file /tmp/logs &
PID=$!
behave tutorial
TEST_OUTPUT=$!
kill $PID
exit $TEST_OUTPUT
