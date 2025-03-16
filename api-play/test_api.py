import requests
import pandas as pd
import io
import subprocess
import time
import sys
import os
from datetime import datetime, timedelta

def test_api():
    # Check if the API is already running
    try:
        response = requests.get("http://localhost:5000")
        print("API is already running")
    except requests.exceptions.ConnectionError:
        # Start the API server
        print("Starting API server...")
        api_process = subprocess.Popen(
            ["python", "app.py"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        # Wait for the server to start
        time.sleep(2)
        print("API server started")

    # Example app_id (SuperTuxKart)
    app_id = "org.supertuxkart.stk"
    
    # Test 1: Basic request
    print(f"\n--- Test 1: Basic Request ---")
    print(f"Fetching reviews for {app_id}...")
    url = "http://localhost:5000/api/reviews"
    params = {
        "app_id": app_id,
        "count": 20,  # Limit to 20 reviews for the test
        "lang": "en",
        "country": "us"
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        # Save the CSV response to a file
        csv_filename = f"{app_id}_reviews.csv"
        with open(csv_filename, "wb") as f:
            f.write(response.content)
        print(f"Reviews saved to {csv_filename}")
        
        # Load the CSV into a pandas DataFrame for analysis
        df = pd.read_csv(io.StringIO(response.content.decode('utf-8')))
        
        # Display some basic information
        print("\nReview Statistics:")
        print(f"Total reviews: {len(df)}")
        if not df.empty:
            print(f"Average rating: {df['score'].mean():.2f}/5.0")
            print(f"Most recent review date: {df['at'].max()}")
            print("\nSample review:")
            sample_review = df.iloc[0]
            print(f"Rating: {sample_review['score']}/5")
            print(f"Content: {sample_review['content'][:100]}...")
            
            # Verify userName and userImage are not in the columns
            print(f"\nColumns in response: {', '.join(df.columns)}")
            print(f"userName in columns: {'userName' in df.columns}")
            print(f"userImage in columns: {'userImage' in df.columns}")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
    
    # Test 2: Date filtering
    print(f"\n--- Test 2: Date Filtering ---")
    # Get date range for the last year
    today = datetime.now()
    one_year_ago = today - timedelta(days=365)
    
    params_with_dates = {
        "app_id": app_id,
        "from_date": one_year_ago.strftime('%Y-%m-%d'),
        "to_date": today.strftime('%Y-%m-%d')
    }
    
    print(f"Fetching reviews from {params_with_dates['from_date']} to {params_with_dates['to_date']}...")
    response = requests.get(url, params=params_with_dates)
    
    if response.status_code == 200:
        # Save the CSV response to a file
        csv_filename = f"{app_id}_reviews_date_filtered.csv"
        with open(csv_filename, "wb") as f:
            f.write(response.content)
        print(f"Date-filtered reviews saved to {csv_filename}")
        
        # Load the CSV into a pandas DataFrame for analysis
        df = pd.read_csv(io.StringIO(response.content.decode('utf-8')))
        
        # Display some basic information
        print("\nDate-Filtered Review Statistics:")
        print(f"Total reviews: {len(df)}")
        if not df.empty:
            print(f"Date range in results: {df['at'].min()} to {df['at'].max()}")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_api()
