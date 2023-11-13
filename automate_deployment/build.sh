#!/bin/bash
echo "Login to your quay repository"
docker login quay.io
echo "Building image"
docker build -t quay.io/olagoldhackxx/oauth:v1 .
echo "Pushing image"
docker push quay.io/olagoldhackxx/oauth:v1
