#!/bin/bash
echo "Login to your quay repository"
docker login quay.io
echo "Building image"
docker build -t quay.io/olagoldhackxx/waverx-analysis:v1 .
echo "Pushing image"
docker push quay.io/olagoldhackxx/waverx-analysis:v1
