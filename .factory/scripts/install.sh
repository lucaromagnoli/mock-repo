#!/bin/bash
# Post-install hook - Install Helm chart

set -e

# Check if chart exists
if [ ! -d ".factory/chart" ]; then
  echo "No Helm chart found in .factory/chart, skipping..."
  exit 0
fi

# Check required environment variables
if [ -z "$FACTORY_PREFIX" ] || [ -z "$FACTORY_KUBE_CONTEXT" ]; then
  echo "Missing required environment variables (FACTORY_PREFIX, FACTORY_KUBE_CONTEXT)"
  exit 1
fi

echo "Installing Helm chart..."

# Build helm command with --set flags
# Note: On upgrades, use --reuse-values to preserve existing credentials
HELM_FLAGS="--kube-context ${FACTORY_KUBE_CONTEXT} \
  --namespace ${FACTORY_KUBE_NAMESPACE:-default} \
  --set prefix=${FACTORY_PREFIX} \
  --set namespace=${FACTORY_KUBE_NAMESPACE:-default} \
  --set git.usernameSecret=${FACTORY_PREFIX}-git-username \
  --set git.tokenSecret=${FACTORY_PREFIX}-git-token \
  --set claude.apiKeySecret=${FACTORY_PREFIX}-claude-api-key \
  --set claude.configSecret=${FACTORY_PREFIX}-claude-config \
  --set workspace.storage=1Gi"

# Add TTL if specified
if [ -n "$FACTORY_TTL" ]; then
  HELM_FLAGS="$HELM_FLAGS --set ttl.secondsAfterCompletion=${FACTORY_TTL} --set ttl.secondsAfterSuccess=${FACTORY_TTL} --set ttl.secondsAfterFailure=${FACTORY_TTL}"
fi

# Check if release already exists (upgrade vs install)
if helm status ${FACTORY_PREFIX} --kube-context ${FACTORY_KUBE_CONTEXT} --namespace ${FACTORY_KUBE_NAMESPACE:-default} >/dev/null 2>&1; then
  echo "Upgrading existing release..."
  helm upgrade ${FACTORY_PREFIX} .factory/chart $HELM_FLAGS --reuse-values
else
  echo "Installing new release..."
  helm install ${FACTORY_PREFIX} .factory/chart $HELM_FLAGS
fi

echo "Helm chart installed successfully"
