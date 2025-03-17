# Deploying ui-play to Cloud Run

This document provides instructions for deploying the ui-play application to Google Cloud Run.

## Prerequisites

1. Google Cloud SDK installed and configured
2. A Google Cloud project with billing enabled
3. Cloud Run API enabled in your project
4. Proper permissions to deploy to Cloud Run

## Deployment Steps

### 1. Set up your Google Cloud project

```bash
# Set your project ID
gcloud config set project YOUR_PROJECT_ID
```

### 2. Deploy the API (if not already deployed)

The API should be deployed first, as the UI needs to know the API URL.

```bash
cd api-play
./deploy.sh
```

Note the URL of the deployed API service, which will be in the format:
`https://api-play-HASH.REGION.run.app`

### 3. Update the API URL in the deployment script

Edit the `ui-play/deploy-to-cloud-run.sh` script and update the `API_URL` variable with the URL of your deployed API:

```bash
API_URL="https://api-play-HASH.REGION.run.app"
```

Also, make sure the `REGION` variable matches the region where your API is deployed.

### 4. Deploy the UI

```bash
cd ui-play
chmod +x deploy-to-cloud-run.sh  # Make the script executable if it's not already
./deploy-to-cloud-run.sh
```

The script will:
- Build and deploy the application to Cloud Run
- Set the necessary environment variables
- Configure memory, CPU, and scaling parameters
- Make the service publicly accessible
- Display the URL of the deployed service when complete

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

To view logs for the deployed service:

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=ui-play" --limit=50
```

To monitor the service:

```bash
gcloud run services describe ui-play --region REGION
```
