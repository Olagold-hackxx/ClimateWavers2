#!/bin/bash

#Build Image
echo "Building Image"
docker build -t quay.io/olagoldhackxx/climatewavers-waverX-Analysis:v1 .
echo "Pushing Image"
docker push -t quay.io/olagoldhackxx/climatewavers-waverX-Analysis:v1

source .env
token=$TOKEN
server=$SERVER

#Login to openshift cli
oc login  -u system:admin --token=$token --server=$server

#Deploy on openshift
echo "Deploying to Openshift cluster"
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service
kubectl apply -f k8s/service

