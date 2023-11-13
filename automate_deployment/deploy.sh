#!/bin/bash

echo "Creating persistent volume claim"
oc apply -f k8s/persistent_volume_claim.yaml
echo "Creating temp pod" 
oc apply -f k8s/pod.yaml
echo "Waiting for pod to be ready"
sleep 30
echo "Copying models to pvc mount path on pod"
oc exec -it temp-pod -- cp -r * /opt/models/
echo "Deleting temp pod"
oc delete pod temp-pod
echo "Creating openvino model server"
oc apply -f k8s/model_server.yaml
