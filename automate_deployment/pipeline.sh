#!/bin/bash

# Clone the Django backend, build image and deploy.
GH_REPO_URL='https://github.com/ClimateWavers/frontend.git'
PIPELINE='build-and-deploy'
WORKSPACE=shared-work
DEPLOY_NAME=frontend
IMAGE='quay.io/olagolhackxx/frontend:v1'
export volumeClaimTemplateFile
volumeClaimTemplateFile="$(dirname -- "$0")/k8s/persistent_volume_claim.yaml"
echo Start pipeline $PIPELINE:
echo "Building source code from" $GH_REPO_URL
echo "To image at location" $IMAGE

tkn pipeline start $PIPELINE \
  -w name="$WORKSPACE",volumeClaimTemplateFile="$volumeClaimTemplateFile" \
  -p git-url=$GH_REPO_URL \
  -p deployment-name=$DEPLOY_NAME \
  -p IMAGE= $IMAGE \
  --use-param-defaults
