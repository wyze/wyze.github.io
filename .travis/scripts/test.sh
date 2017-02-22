#!/bin/bash -ev

# Authenticate with Snyk
$(npm bin)/snyk auth $SNYK_AUTH

# Run unit tests
npm test -- --maxWorkers 3 --config config/jest.json

# Only perform docker (integration) tests on Node LTS
if [[ $TRAVIS_NODE_VERSION == 6 ]]; then
  # Build docker image
  docker build -t $DOCKER_IMAGE .

  # Start the docker image in a container
  docker run -d -p 3000:3000 -e GITHUB_TOKEN=$GITHUB_TOKEN --name site $DOCKER_IMAGE

  # Wait for it to boot up
  sleep 10

  # Make sure the process is still running
  docker ps | grep -q site

  # Make sure we receive 200 ok on homepage
  curl -s -o /dev/null -I -w "%{http_code}" localhost:3000 | grep -q 200
fi
