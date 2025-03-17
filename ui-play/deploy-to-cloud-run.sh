#!/bin/bash

# Exit on error
set -e

# Variables
PROJECT_ID=$(gcloud config get-value project)
REGION="us-east1"  # Match the region where the API is deployed
SERVICE_NAME="gdc-ai-workshop"
API_URL="https://api-play-713488125678.us-east1.run.app"  # Actual API URL

# Check if project ID is set
if [ -z "$PROJECT_ID" ]; then
  echo "Error: No project ID set. Please run 'gcloud config set project YOUR_PROJECT_ID'"
  exit 1
fi

echo "Deploying $SERVICE_NAME to Cloud Run in project $PROJECT_ID, region $REGION..."

# Build and deploy the service
gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="REACT_APP_API_URL=$API_URL" 

# Get the URL of the deployed service
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format="value(status.url)")

echo "Deployment complete!"
echo "Your application is available at: $SERVICE_URL"
