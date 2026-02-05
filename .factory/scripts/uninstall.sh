#!/bin/bash
# Pre-uninstall hook - Uninstall Helm chart

set -e

# Check required environment variables
if [ -z "$FACTORY_PREFIX" ]; then
  echo "Missing required environment variable: FACTORY_PREFIX"
  exit 1
fi

if [ -z "$FACTORY_KUBE_CONTEXT" ]; then
  echo "No FACTORY_KUBE_CONTEXT set, skipping Helm uninstall..."
  exit 0
fi

echo "Uninstalling Helm chart..."

# Run helm uninstall
helm uninstall ${FACTORY_PREFIX} \
  --kube-context ${FACTORY_KUBE_CONTEXT} \
  --namespace ${FACTORY_KUBE_NAMESPACE:-default}

echo "Helm chart uninstalled successfully"
