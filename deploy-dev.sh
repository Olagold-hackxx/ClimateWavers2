#!/bin/bash

docker build -t quay.io/olagoldhackxx/climatewavers-djangobackend:v1 .
docker push quay.io/olagoldhackxx/climatewavers-djangobackend:v1
