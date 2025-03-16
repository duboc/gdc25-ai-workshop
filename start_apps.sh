#!/bin/bash

# Exit on error
set -e

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required commands
if ! command_exists python; then
  echo "Error: Python is required but not installed."
  exit 1
fi

if ! command_exists npm; then
  echo "Error: npm is required but not installed."
  exit 1
fi

# Function to start the API
start_api() {
  echo "Starting Google Play Reviews API..."
  cd api-play
  
  # Check if virtual environment exists, create if not
  if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
  fi
  
  # Activate virtual environment
  echo "Activating virtual environment..."
  source venv/bin/activate
  
  # Install dependencies
  echo "Installing API dependencies..."
  pip install -r requirements.txt
  
  # Start the API server in the background
  echo "Starting API server on http://localhost:8080"
  python app.py &
  API_PID=$!
  
  # Return to the root directory
  cd ..
  
  echo "API server started with PID: $API_PID"
}

# Function to start the UI
start_ui() {
  echo "Starting Google Play Reviews UI..."
  cd ui-play
  
  # Install dependencies
  echo "Installing UI dependencies..."
  npm install
  
  # Start the React development server
  echo "Starting UI server on http://localhost:3000"
  npm start &
  UI_PID=$!
  
  # Return to the root directory
  cd ..
  
  echo "UI server started with PID: $UI_PID"
}

# Function to handle cleanup on exit
cleanup() {
  echo "Shutting down servers..."
  
  if [ -n "$API_PID" ]; then
    echo "Stopping API server (PID: $API_PID)..."
    kill $API_PID 2>/dev/null || true
  fi
  
  if [ -n "$UI_PID" ]; then
    echo "Stopping UI server (PID: $UI_PID)..."
    kill $UI_PID 2>/dev/null || true
  fi
  
  echo "Cleanup complete."
  exit 0
}

# Register the cleanup function to run on exit
trap cleanup EXIT INT TERM

# Start the applications
start_api
start_ui

echo ""
echo "Both applications are now running:"
echo "- API: http://localhost:8080"
echo "- UI: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers."

# Wait for user to press Ctrl+C
wait
