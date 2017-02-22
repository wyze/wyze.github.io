#!/bin/bash -ev

# Login to Docker
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

# Decrypt private key for SSH deployment
openssl aes-256-cbc -K $encrypted_7d2029aa283c_key -iv $encrypted_7d2029aa283c_iv -in .travis/deploy_rsa.enc -out /tmp/deploy_rsa -d

# Ensure ssh-agent is running
eval "$(ssh-agent -s)"

# Set proper permissions
chmod 600 /tmp/deploy_rsa

# Add private key to authentication agent
ssh-add /tmp/deploy_rsa

# Add droplet ip to known hosts
ssh-keyscan -t rsa,dsa $DROPLET_IP 2>&1 | sort -u - ~/.ssh/known_hosts > \
  ~/.ssh/tmp_hosts

# Put known host in correct location
mv ~/.ssh/tmp_hosts ~/.ssh/known_hosts

# Create tagged docker image
docker tag $DOCKER_IMAGE:latest $DOCKER_IMAGE:${TRAVIS_TAG:1}

# Push new image up to docker
docker push $DOCKER_IMAGE

# Login to droplet; pull new docker image; restart docker container
ssh -l $DROPLET_USERNAME $DROPLET_IP 'bash -s' < \
  ./.travis/scripts/update.sh ${TRAVIS_TAG:1} $DOCKER_IMAGE
