#!/bin/bash
docker login quay.io
docker build -t quay.io/olagoldhackxx/frontend:v1 .
docker push quay.io/olagoldhackxx/frontend:v1

