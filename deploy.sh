echo "Deploying pvc"
oc apply -f k8s/persistent_volume_claim.yaml
echo "Deploying deployment"
oc apply -f k8s/deployment.yaml
echo "Deploying service"
oc apply -f k8s/service.yaml
echo "Deploy route"
oc apply -f k8s/route.yaml
