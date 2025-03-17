#!/bin/bash
set -e

# Configuration
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="api-play"
REGION="us-east1"  # Match the region used by the UI component

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Deploying to Cloud Run...${NC}"
echo -e "${GREEN}Project ID: ${PROJECT_ID}${NC}"
echo -e "${GREEN}Service Name: ${SERVICE_NAME}${NC}"
echo -e "${GREEN}Region: ${REGION}${NC}"

# Deploy to Cloud Run
gcloud run deploy ${SERVICE_NAME} \
  --source . \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --concurrency 80 \
  --max-instances 10 \
  --min-instances 0

echo -e "${GREEN}Deployment completed!${NC}"
