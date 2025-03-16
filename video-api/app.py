import os
import uuid
import ffmpeg
import subprocess
import tempfile
import json
from datetime import datetime, timedelta
from flask import Flask, render_template, request, redirect, url_for, jsonify
from google.cloud import storage

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024  # 32MB max upload size for form data

BUCKET_NAME = "gdc25-video-bucket"

# Initialize GCS client
storage_client = storage.Client()
bucket = storage_client.bucket(BUCKET_NAME)

def process_video(input_blob_name, output_blob_name):
    """Process the video to 640x360 at 30fps with high compression"""
    try:
        # Download the input blob to a temporary file
        input_blob = bucket.blob(input_blob_name)
        
        # Create temporary files for processing
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_input:
            input_path = temp_input.name
        
        # Download the file from GCS
        input_blob.download_to_filename(input_path)
        
        # Create a temporary file for the output
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_output:
            output_path = temp_output.name
        
        # Get the ffmpeg command string for debugging
        ffmpeg_cmd = (
            ffmpeg
            .input(input_path)
            .output(output_path, 
                   vf='scale=640:360',  # Fixed 640x360 resolution
                   r=30,                # 30 frames per second
                   preset='medium',     # Medium preset for balance of speed and compression
                   crf=28,              # Higher CRF value = more compression (range: 18-28)
                   maxrate='800k',      # Maximum bitrate
                   bufsize='1200k',     # Buffer size
                   movflags='+faststart') # Optimize for web streaming
            .overwrite_output()         # Add overwrite_output() to avoid prompt
            .compile()
        )
        print(f"Running FFmpeg command: {' '.join(ffmpeg_cmd)}")
        
        # Run the command using subprocess to better handle errors
        process = subprocess.Popen(
            ffmpeg_cmd, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE
        )
        stdout, stderr = process.communicate()
        
        if process.returncode != 0:
            print(f"FFmpeg stderr: {stderr.decode()}")
            # Clean up temporary files
            os.unlink(input_path)
            if os.path.exists(output_path):
                os.unlink(output_path)
            return False
        
        # Upload the processed file to GCS
        output_blob = bucket.blob(output_blob_name)
        output_blob.upload_from_filename(output_path)
        
        # Clean up temporary files
        os.unlink(input_path)
        os.unlink(output_path)
        
        # Delete the input blob to save storage
        input_blob.delete()
        
        return True
    except Exception as e:
        print(f"Processing error: {str(e)}")
        return False

def generate_signed_url(blob_name, http_method='GET', expiration_minutes=30):
    """Generate a signed URL for a blob that expires after a set time"""
    blob = bucket.blob(blob_name)
    url = blob.generate_signed_url(
        version="v4",
        expiration=datetime.utcnow() + timedelta(minutes=expiration_minutes),
        method=http_method
    )
    return url

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-upload-url', methods=['POST'])
def get_upload_url():
    """Generate a signed URL for direct-to-cloud upload"""
    try:
        # Get file extension from the request
        data = request.get_json()
        if not data or 'filename' not in data:
            return jsonify({'error': 'No filename provided'}), 400
            
        original_filename = data['filename']
        file_ext = os.path.splitext(original_filename)[1]
        
        # Generate unique ID for the file
        unique_id = str(uuid.uuid4())
        
        # Define GCS paths
        input_blob_name = f"uploads/{unique_id}{file_ext}"
        
        # Generate signed URL for upload
        upload_url = generate_signed_url(input_blob_name, http_method='PUT', expiration_minutes=10)
        
        return jsonify({
            'uploadUrl': upload_url,
            'fileId': unique_id,
            'fileExt': file_ext
        })
    except Exception as e:
        print(f"Error generating upload URL: {str(e)}")
        return jsonify({'error': 'Failed to generate upload URL'}), 500

@app.route('/process', methods=['POST'])
def process():
    """Process a video that has been uploaded to GCS"""
    try:
        data = request.get_json()
        if not data or 'fileId' not in data or 'fileExt' not in data:
            return jsonify({'error': 'Missing file information'}), 400
            
        file_id = data['fileId']
        file_ext = data['fileExt']
        
        # Define GCS paths
        input_blob_name = f"uploads/{file_id}{file_ext}"
        output_blob_name = f"processed/{file_id}{file_ext}"
        
        # Check if the input blob exists
        input_blob = bucket.blob(input_blob_name)
        if not input_blob.exists():
            return jsonify({'error': 'Uploaded file not found'}), 404
        
        # Process the video asynchronously
        success = process_video(input_blob_name, output_blob_name)
        
        if success:
            # Generate a signed URL for download
            signed_url = generate_signed_url(output_blob_name)
            
            return jsonify({
                'success': True,
                'downloadUrl': signed_url,
                'fileId': file_id,
                'fileExt': file_ext
            })
        else:
            return jsonify({'error': 'Failed to process video'}), 500
            
    except Exception as e:
        print(f"Error processing video: {str(e)}")
        return jsonify({'error': 'Failed to process video'}), 500

@app.route('/download')
def download_page():
    download_url = request.args.get('url')
    
    if not download_url:
        return redirect(url_for('index'))
    
    return render_template('download.html', signed_url=download_url)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True) 