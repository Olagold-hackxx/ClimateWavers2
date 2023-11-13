#!/bin/bash

# Log in to your image repo
echo "Login to your quay repository"
docker login quay.io
echo "Building image"
# Build your image
docker build -t quay.io/olagoldhackxx/alert-system:v1 .
echo "Pushing image"
# Push image to repo
docker push quay.io/olagoldhackxx/alert-system:v1
