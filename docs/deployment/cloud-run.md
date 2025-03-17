# Deploying to Google Cloud Run

This guide provides detailed instructions for deploying the AI-Powered App Review Analysis Workshop to Google Cloud Run.

## Prerequisites

Before you begin, make sure you have the following:

1. Google Cloud account with billing enabled
2. Google Cloud SDK installed and configured
3. Cloud Run API enabled in your project
4. Proper permissions to deploy to Cloud Run

## Deployment Overview

The workshop consists of two main components that need to be deployed separately:

1. **API Service (`api-play`)**: A Python Flask API that fetches reviews from the Google Play Store
2. **UI Application (`ui-play`)**: A React-based web interface for interacting with the API

The deployment process follows this sequence:

1. Deploy the API service first
2. Note the URL of the deployed API service
3. Update the UI configuration with the API URL
4. Deploy the UI application

## Deploying the API Service

### 1. Navigate to the API directory

```bash
cd api-play
```

### 2. Make the deployment script executable (if not already)

```bash
chmod +x deploy.sh
```

### 3. Deploy the API service

```bash
./deploy.sh
```

This script will:
- Build and deploy the API service to Cloud Run
- Configure memory, CPU, and scaling parameters
- Make the service publicly accessible
- Display the URL of the deployed service when complete

### 4. Note the API URL

After deployment, the script will output the URL of the deployed API service. It will be in the format:

```
https://api-play-HASH.REGION.run.app
```

Make note of this URL as you'll need it for the UI deployment.

## Deploying the UI Application

### 1. Navigate to the UI directory

```bash
cd ../ui-play
```

### 2. Update the API URL in the deployment script

Edit the `deploy-to-cloud-run.sh` script and update the `API_URL` variable with the URL of your deployed API service:

```bash
# Find this line
API_URL="https://api-url-in-production.run.app"

# Replace it with your actual API URL
API_URL="https://api-play-HASH.REGION.run.app"
```

### 3. Make the deployment script executable (if not already)

```bash
chmod +x deploy-to-cloud-run.sh
```

### 4. Deploy the UI application

```bash
./deploy-to-cloud-run.sh
```

This script will:
- Build and deploy the UI application to Cloud Run
- Set the API URL environment variable
- Configure memory, CPU, and scaling parameters
- Make the service publicly accessible
- Display the URL of the deployed service when complete

### 5. Access the deployed application

After deployment, the script will output the URL of the deployed UI application. It will be in the format:

```
https://ui-play-HASH.REGION.run.app
```

You can access the application by opening this URL in your browser.

## Troubleshooting

### API Connection Issues

If the UI is unable to connect to the API, check the following:

1. **Environment Variables**: Make sure the `REACT_APP_API_URL` environment variable is set correctly in the Cloud Run service:

```bash
gcloud run services describe ui-play --region REGION --format="value(spec.template.spec.containers[0].env)"
```

2. **CORS Configuration**: Ensure the API allows requests from the UI domain:

```bash
# Check if the API has CORS enabled
gcloud run services describe api-play --region REGION --format="value(spec.template.spec.containers[0].env)"
```

3. **API URL in Code**: Check that the UI code is using the environment variable correctly:

```javascript
// In PlayScraperTab.js
const apiUrl = `${process.env.REACT_APP_API_URL}/api/reviews`;
```

### Redeploying with Updated Configuration

If you need to update the API URL or other configuration:

```bash
gcloud run deploy ui-play \
  --source ui-play \
  --platform managed \
  --region REGION \
  --allow-unauthenticated \
  --set-env-vars="REACT_APP_API_URL=https://api-play-HASH.REGION.run.app" \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --port=8080
```

## Monitoring and Logs

### Viewing Logs

To view logs for the deployed services:

```bash
# API logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=api-play" --limit=50

# UI logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=ui-play" --limit=50
```

### Monitoring Service Status

To monitor the status of the deployed services:

```bash
# API status
gcloud run services describe api-play --region REGION

# UI status
gcloud run services describe ui-play --region REGION
```

## Cleaning Up

To delete the deployed services when they are no longer needed:

```bash
# Delete API service
gcloud run services delete api-play --region REGION

# Delete UI service
gcloud run services delete ui-play --region REGION
```
