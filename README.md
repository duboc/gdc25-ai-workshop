# gdc25-ai-workshop

Android App Review Analysis Workshop
Overview
This workshop guides participants through analyzing Android app reviews using Google AI Studio. Participants will learn how to extract insights from user reviews by using prompts with and without JSON schema configurations.
Workshop Objectives

Learn how to scrape and export app reviews from the Google Play Store
Understand how to use Google AI Studio with different prompt types
Practice processing structured and unstructured AI outputs
Gain insights from app reviews to improve your Android applications

Prerequisites

Google account with access to Google AI Studio
Basic understanding of JSON format
A computer with internet access
The Android app package name you want to analyze

Workshop Flow

App Selection: Input an Android app package name
Data Collection: Scrape customer reviews from Google Play Store
Data Export: Download the review data as CSV
AI Analysis: Use Google AI Studio with prepared prompts
Result Processing: Interpret AI responses or parse JSON output

Detailed Steps
1. App Selection
Identify the Android app you want to analyze. You'll need the package name (e.g., com.spotify.music for Spotify).
How to find a package name:

Open Google Play Store
Navigate to the app page
Look at the URL: https://play.google.com/store/apps/details?id=**com.package.name**
The package name is the part after "id="

2. Data Collection
We'll use a scraping tool to collect customer reviews from the Google Play Store.
Instructions:

Go to [App Review Scraper Tool] (provide specific tool URL)
Enter the package name in the designated field
Select the number of reviews to scrape (recommend 100-500 for the workshop)
Click "Start Scraping"
Wait for the scraping process to complete

3. Data Export
Once scraping is complete, download the reviews as a CSV file.
Instructions:

On the scraper tool page, locate the "Download CSV" button
Click to download
Save the file to an easily accessible location on your computer
Verify the CSV has the expected columns (typically: review_id, username, rating, date, content, etc.)