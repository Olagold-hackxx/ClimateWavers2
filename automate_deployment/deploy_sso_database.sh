#!/bin/bash
#Setup postgresql database on openshift for red hat sso

PODNAME=$(a=$(kubectl get pods | grep 'postgresql' | grep 'Running' | awk '{print $1}') && set - "$a" && echo "$1")

echo "Setting up PostgreSQL at $PODNAME cluster"
# Copy setup sql files to database cluster
kubectl cp ./setup_postgresql.sql olagoldhackxx-dev/"$PODNAME":/tmp/setup_postgresql.sql

echo "Copied setup sql file to $PODNAME:/tmp/setup_postgresql.sql on openshift cluster"

# Copy setup scripts to database cluster
kubectl cp ./setup_sso_database.sh olagoldhackxx-dev/"$PODNAME":/tmp/setup_sso_database.sh

echo "Copied setup script file to $PODNAME:/tmp/setup_database.sh on openshift cluster"

# Run script to setup database on cluster
kubectl exec pod/$PODNAME -- /bin/bash /tmp/setup_sso_database.sh
echo "Executed script in cluster"
