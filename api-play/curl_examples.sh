#!/bin/bash

# This script demonstrates how to use the Google Play Reviews API with curl

# Base URL - update this if your server is running on a different port
BASE_URL="http://localhost:5000/api/reviews"

# Example 1: Basic request - get 10 reviews for SuperTuxKart
echo "Example 1: Basic request - get 10 reviews for SuperTuxKart"
curl -o "example1_reviews.csv" "${BASE_URL}?app_id=org.supertuxkart.stk&count=10"
echo "Reviews saved to example1_reviews.csv"
echo ""

# Example 2: Specify language and country
echo "Example 2: Get reviews in Spanish from Spain"
curl -o "example2_reviews.csv" "${BASE_URL}?app_id=org.supertuxkart.stk&count=10&lang=es&country=es"
echo "Reviews saved to example2_reviews.csv"
echo ""

# Example 3: Date filtering - get reviews from 2023
echo "Example 3: Get reviews from 2023"
curl -o "example3_reviews.csv" "${BASE_URL}?app_id=org.supertuxkart.stk&from_date=2023-01-01&to_date=2023-12-31"
echo "Reviews saved to example3_reviews.csv"
echo ""

# Example 4: Combine all parameters
echo "Example 4: Get 20 reviews in English from US from the last 6 months"
# Calculate date 6 months ago
SIX_MONTHS_AGO=$(date -v-6m +%Y-%m-%d 2>/dev/null || date -d "6 months ago" +%Y-%m-%d)
TODAY=$(date +%Y-%m-%d)
curl -o "example4_reviews.csv" "${BASE_URL}?app_id=org.supertuxkart.stk&count=20&lang=en&country=us&from_date=${SIX_MONTHS_AGO}&to_date=${TODAY}"
echo "Reviews saved to example4_reviews.csv"
echo ""

# Example 5: Different app - get reviews for WhatsApp
echo "Example 5: Get reviews for WhatsApp"
curl -o "example5_reviews.csv" "${BASE_URL}?app_id=com.whatsapp&count=10"
echo "Reviews saved to example5_reviews.csv"
echo ""

echo "All examples completed. Check the CSV files for results."
