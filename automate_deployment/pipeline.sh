#!/usr/bin/env bash
# Make sure you have oc and tkn installed

# Clone the Django repo, build image and deploy.
GH_REPO_URL='https://github.com/ClimateWavers/waverX-Analysis.git'
PIPELINE='build-and-deploy'
WORKSPACE=shared-workspace
DEPLOY_NAME=waverX-Analysis
IMAGE='quay.io/olagolhackxx/waverx-analysis:v1'
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
