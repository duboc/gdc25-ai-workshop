# Video Resizer Application

A simple Flask web application that allows users to upload videos, processes them to 480p resolution at 30fps, and provides the processed video for download.

## Prerequisites

- Python 3.7+
- FFmpeg installed on your system

## Local Development

1. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

3. Install FFmpeg if not already installed:
   - On Ubuntu/Debian: `sudo apt-get install ffmpeg`
   - On macOS with Homebrew: `brew install ffmpeg`
   - On Windows: Download from [FFmpeg website](https://ffmpeg.org/download.html)

4. Run the application:
   ```
   python app.py
   ```

5. Open your browser and go to [http://localhost:8080](http://localhost:8080)

## Deploying to Google Cloud Run

### Option 1: Deploy from Source (Recommended)

1. Install the Google Cloud SDK and initialize it:
   ```
   gcloud init
   ```

2. Set your project ID:
   ```
   gcloud config set project YOUR_PROJECT_ID
   ```

3. Enable required APIs:
   ```
   gcloud services enable cloudbuild.googleapis.com run.googleapis.com
   ```

4. Deploy directly from source:
   ```
   gcloud run deploy video-resizer --source . --platform managed --region us-central1 --allow-unauthenticated
   ```

### Option 2: Build and Deploy with Docker

1. Build the Docker image:
   ```
   docker build -t gcr.io/YOUR_PROJECT_ID/video-resizer .
   ```

2. Push the image to Google Container Registry:
   ```
   docker push gcr.io/YOUR_PROJECT_ID/video-resizer
   ```

3. Deploy the image to Cloud Run:
   ```
   gcloud run deploy video-resizer --image gcr.io/YOUR_PROJECT_ID/video-resizer --platform managed --region us-central1 --allow-unauthenticated
   ```

## Notes

- The application is configured to handle files up to 500MB in size. This can be adjusted in `app.py`.
- Processed videos are stored temporarily and not persistent across application restarts.
- For production use, consider implementing a more robust storage solution like Google Cloud Storage. 