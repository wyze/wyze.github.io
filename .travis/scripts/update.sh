#!/bin/bash -ev

TAG=$1
IMAGE=${2//\//\\/}
REGEX=${IMAGE//./\\.}

# Rewrite docker image tag to new tag
sed -i "s/$REGEX:.*/$IMAGE:$TAG/g" docker-compose.yml

# Pull down the new image
docker-compose pull

# Recreate container with new image
docker-compose up -d
