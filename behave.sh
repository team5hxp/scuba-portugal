#!/bin/bash
if [ -z "${GOOGLE_CHROME_SHIM}" ];
then
  echo "Using default google chrome binary"
else
  echo using Chrome: $GOOGLE_CHROME_SHIM
fi
export PORT=5000
python manage.py runserver $PORT 2>&1 > /dev/null &
behave tutorial
