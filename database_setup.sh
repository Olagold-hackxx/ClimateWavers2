#!/bin/bash
#Setup on database on openshift

PODNAME=$(a=$(kubectl get pods | grep 'mariadb' | grep 'Running' | awk '{print $1}') && set - "$a" && echo "$1")

echo "Setting up MySQL at" $PODNAME "cluster"
# Copy setup sql files to database cluster
kubectl cp ./setup_mariadb.sql climatewavers-dev/"$PODNAME":/tmp/setup_mariadb.sql
echo "Copied setup sql file to $PODNAME:/tmp/setup_mariadb.sql on openshift cluster"
# Copy setup scripts to database cluster
kubectl cp ./setup_database.sh climatewavers-dev/"$PODNAME":/tmp/setup_database.sh
echo "Copied setup script file to $PODNAME:/tmp/setup_database.sh on openshift cluster"
# Run script to setup database on cluster
kubectl exec pod/$PODNAME -- /bin/bash /tmp/setup_database.sh
echo "Executed script in cluster"
