#!/bin/bash
echo "Creating pipeline"
oc create -f k8s/pipeline.yaml
echo "Creating PVC for pipeline"
oc create -f k8s/persistent_volume_claim.yaml
echo "Creating apply manifest task"
oc create -f k8s/apply-manifest_task.yaml
echo "Creating update deployment task"
oc create -f k8s/update_deployment_task.yaml
