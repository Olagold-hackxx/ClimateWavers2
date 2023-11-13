#!/bin/bash
echo "Deploying deployment"
kubectl apply -f k8s/deployment.yaml
echo "Deploying service"
kubectl apply -f k8s/service.yaml
echo "Deploy route"
kubectl apply -f k8s/route.yaml