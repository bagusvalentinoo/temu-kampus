#!/bin/bash

# Generate the keyfile if it doesn't exist
if [ ! -f "./ops/mongodb-keyfile" ]; then
    echo "Generating MongoDB keyfile..."
    openssl rand -base64 756 > ./ops/mongodb-keyfile
    sudo chown 999:999 ./ops/mongodb-keyfile
    sudo chmod 400 ./ops/mongodb-keyfile
fi

exec "$@"
