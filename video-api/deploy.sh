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