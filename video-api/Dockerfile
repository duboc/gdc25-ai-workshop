FROM python:3.9-slim

WORKDIR /app

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg && apt-get clean

# Copy requirements and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app/

# Create temp directory for processing
RUN mkdir -p /tmp/video-processing

# Expose port for Cloud Run
EXPOSE 8080

# Start the server
CMD exec gunicorn --bind :8080 --workers 1 --threads 8 --timeout 0 app:app 