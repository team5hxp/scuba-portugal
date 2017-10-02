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
kill $PID
echo "Killed a unicorn!"
# pids=$(ps -o pid,group,command | grep manage.py | grep -v grep | cut -d' ' -f1)
# for pid in $pids
# do
#   echo "killing $pid"
#   kill $pid
# done
