#!/bin/bash
if [ -z "${GOOGLE_CHROME_SHIM}" ];
then
  echo "Using default google chrome binary"
else
  echo using Chrome: $GOOGLE_CHROME_SHIM
fi
cd tutorial
behave 
