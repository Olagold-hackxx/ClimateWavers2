#!/bin/bash

docker login quay.io
docker build -t quay.io/olagoldhackxx/climatewavers-backend:v1 .
docker push quay.io/olagoldhackxx/climatewavers-backend:v1
