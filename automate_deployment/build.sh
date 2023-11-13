#!/bin/bash
echo "Login to quay repository"
docker login quay.io
echo "Building image"
docker build -t quay.io/olagoldhackxx/backend:v1 .
echo "Pushing image to quay repository"
docker push quay.io/olagoldhackxx/backend:v1
