#!/usr/bin/env bash

echo "Building app..."
npm run build

echo "Starting app deploy.."
echo "Copying files... Please wait."

scp -r -i ~/.ssh/id_rsa \
  dist/* \
  username@changeMeToServerAddress:/folderToCopy

echo "Done! Bye!"