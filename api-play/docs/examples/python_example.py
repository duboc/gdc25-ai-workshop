#!/usr/bin/env python3
"""
Google Play Reviews API - Python Example

This script demonstrates how to use the Google Play Reviews API with Python.
It shows how to fetch reviews, save them to a CSV file, and perform basic analysis.
"""

import requests
import pandas as pd
import io
import argparse
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import os

def fetch_reviews(app_id, count=100, lang='en', country='us', from_date=None, to_date=None):
    """
    Fetch reviews from the Google Play Reviews API.
    
    Args:
        app_id (str): The package name of the app
        count (int, optional): The number of reviews to fetch. Defaults to 100.
        lang (str, optional): The language of the reviews. Defaults to 'en'.
        country (str, optional): The country for the reviews. Defaults to 'us'.
        from_date (str, optional): Filter reviews from this date (format: YYYY-MM-DD). Defaults to None.
        to_date (str, optional): Filter reviews until this date (format: YYYY-MM-DD). Defaults to None.
    
    Returns:
        pandas.DataFrame: A DataFrame containing the reviews
    """
    url = "http://localhost:5000/api/reviews"
    params = {
        "app_id": app_id,
        "count": count,
        "lang": lang,
        "country": country
    }
    
    # Add date filters if provided
    if from_date:
        params["from_date"] = from_date
    if to_date:
        params["to_date"] = to_date
    
    print(f"Fetching reviews for {app_id}...")
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        # Parse CSV data
        df = pd.read_csv(io.StringIO(response.content.decode('utf-8')))
        print(f"Successfully fetched {len(df)} reviews")
        return df
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

def save_to_csv(df, filename):
    """
    Save the DataFrame to a CSV file.
    
    Args:
        df (pandas.DataFrame): The DataFrame to save
        filename (str): The name of the CSV file
    """
    df.to_csv(filename, index=False)
    print(f"Reviews saved to {filename}")

def analyze_reviews(df):
    """
    Perform basic analysis on the reviews.
    
    Args:
        df (pandas.DataFrame): The DataFrame containing the reviews
    
    Returns:
        dict: A dictionary containing the analysis results
    """
    if df is None or df.empty:
        return {"error": "No reviews to analyze"}
    
    # Calculate basic statistics
    total_reviews = len(df)
    average_rating = df['score'].mean()
    rating_counts = df['score'].value_counts().sort_index()
    
    # Calculate the percentage of each rating
    rating_percentages = (rating_counts / total_reviews * 100).round(2)
    
    # Find the most recent review
    most_recent = df.sort_values('at', ascending=False).iloc[0]
    
    # Find the most helpful review (most thumbs up)
    most_helpful = df.sort_values('thumbsUpCount', ascending=False).iloc[0]
    
    return {
        "total_reviews": total_reviews,
        "average_rating": average_rating,
        "rating_counts": rating_counts.to_dict(),
        "rating_percentages": rating_percentages.to_dict(),
        "most_recent_review": {
            "content": most_recent['content'],
            "score": most_recent['score'],
            "date": most_recent['at']
        },
        "most_helpful_review": {
            "content": most_helpful['content'],
            "score": most_helpful['score'],
            "thumbs_up": most_helpful['thumbsUpCount']
        }
    }

def plot_ratings(df, app_id, output_dir='.'):
    """
    Create a bar chart of the rating distribution.
    
    Args:
        df (pandas.DataFrame): The DataFrame containing the reviews
        app_id (str): The package name of the app
        output_dir (str, optional): The directory to save the plot. Defaults to '.'.
    """
    if df is None or df.empty:
        print("No reviews to plot")
        return
    
    # Count the number of reviews for each rating
    rating_counts = df['score'].value_counts().sort_index()
    
    # Create a bar chart
    plt.figure(figsize=(10, 6))
    bars = plt.bar(rating_counts.index, rating_counts.values, color='skyblue')
    
    # Add labels and title
    plt.xlabel('Rating')
    plt.ylabel('Number of Reviews')
    plt.title(f'Rating Distribution for {app_id}')
    plt.xticks([1, 2, 3, 4, 5])
    
    # Add the count on top of each bar
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                 f'{height}', ha='center', va='bottom')
    
    # Save the plot
    output_path = os.path.join(output_dir, f"{app_id}_ratings.png")
    plt.savefig(output_path)
    print(f"Rating distribution plot saved to {output_path}")
    plt.close()

def main():
    """
    Main function to parse arguments and run the example.
    """
    parser = argparse.ArgumentParser(description='Fetch and analyze Google Play Store reviews')
    parser.add_argument('app_id', help='The package name of the app (e.g., org.supertuxkart.stk)')
    parser.add_argument('--count', type=int, default=100, help='The number of reviews to fetch (default: 100)')
    parser.add_argument('--lang', default='en', help='The language of the reviews (default: en)')
    parser.add_argument('--country', default='us', help='The country for the reviews (default: us)')
    parser.add_argument('--from-date', help='Filter reviews from this date (format: YYYY-MM-DD)')
    parser.add_argument('--to-date', help='Filter reviews until this date (format: YYYY-MM-DD)')
    parser.add_argument('--output', default='.', help='The directory to save the output files (default: current directory)')
    
    args = parser.parse_args()
    
    # Fetch reviews
    df = fetch_reviews(
        args.app_id,
        count=args.count,
        lang=args.lang,
        country=args.country,
        from_date=args.from_date,
        to_date=args.to_date
    )
    
    if df is not None:
        # Save to CSV
        csv_filename = os.path.join(args.output, f"{args.app_id}_reviews.csv")
        save_to_csv(df, csv_filename)
        
        # Analyze reviews
        analysis = analyze_reviews(df)
        print("\nReview Analysis:")
        print(f"Total reviews: {analysis['total_reviews']}")
        print(f"Average rating: {analysis['average_rating']:.2f}/5.0")
        print("\nRating distribution:")
        for rating, count in analysis['rating_counts'].items():
            percentage = analysis['rating_percentages'][rating]
            print(f"  {rating} stars: {count} reviews ({percentage}%)")
        
        print("\nMost recent review:")
        print(f"  \"{analysis['most_recent_review']['content']}\"")
        print(f"  Rating: {analysis['most_recent_review']['score']}/5")
        print(f"  Date: {analysis['most_recent_review']['date']}")
        
        print("\nMost helpful review:")
        print(f"  \"{analysis['most_helpful_review']['content']}\"")
        print(f"  Rating: {analysis['most_helpful_review']['score']}/5")
        print(f"  Thumbs up: {analysis['most_helpful_review']['thumbs_up']}")
        
        # Plot ratings
        plot_ratings(df, args.app_id, args.output)

if __name__ == "__main__":
    main()
