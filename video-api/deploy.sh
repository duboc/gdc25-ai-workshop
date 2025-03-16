#!/bin/bash

# Set project ID (replace with your project ID)
PROJECT_ID=$(gcloud config get-value project)

# Build and deploy to Cloud Run
gcloud run deploy video-compressor \
  --source . \
  --region us-central1 \
  --memory 2Gi \
  --cpu 2 \
  --timeout 15m \
  --allow-unauthenticated

echo "Make sure the Cloud Run service account has Storage Admin permissions:"
echo "gcloud projects add-iam-policy-binding ${PROJECT_ID} \\"
echo "  --member=serviceAccount:${PROJECT_ID}@appspot.gserviceaccount.com \\"
echo "  --role=roles/storage.admin"