#!/bin/bash

# oc must be installed to deploy with this script

echo "Deploying deployment"
oc apply -f k8s/deployment.yaml
echo "Deploying service"
oc apply -f k8s/service.yaml
echo "Deploy route"