#!/bin/bash
# Google Play Reviews API - Shell Example
#
# This script demonstrates how to use the Google Play Reviews API with shell commands.
# It shows how to fetch reviews, save them to a CSV file, and perform basic analysis.
#
# Usage:
#   ./shell_example.sh <app_id> [options]
#
# Options:
#   -c, --count <number>     Number of reviews to fetch (default: 100)
#   -l, --lang <code>        Language code (default: en)
#   -r, --country <code>     Country code (default: us)
#   -f, --from-date <date>   Filter reviews from this date (YYYY-MM-DD)
#   -t, --to-date <date>     Filter reviews until this date (YYYY-MM-DD)
#   -o, --output <dir>       Output directory (default: current directory)
#   -h, --help               Show this help message
#
# Example:
#   ./shell_example.sh org.supertuxkart.stk --count 50 --lang en --country us

# Function to display help message
show_help() {
  echo "Usage: $0 <app_id> [options]"
  echo ""
  echo "Options:"
  echo "  -c, --count <number>     Number of reviews to fetch (default: 100)"
  echo "  -l, --lang <code>        Language code (default: en)"
  echo "  -r, --country <code>     Country code (default: us)"
  echo "  -f, --from-date <date>   Filter reviews from this date (YYYY-MM-DD)"
  echo "  -t, --to-date <date>     Filter reviews until this date (YYYY-MM-DD)"
  echo "  -o, --output <dir>       Output directory (default: current directory)"
  echo "  -h, --help               Show this help message"
  echo ""
  echo "Example:"
  echo "  $0 org.supertuxkart.stk --count 50 --lang en --country us"
  exit 0
}

# Check if jq is installed
check_dependencies() {
  if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed."
    echo "Please install jq to run this script."
    echo "  - On Ubuntu/Debian: sudo apt-get install jq"
    echo "  - On macOS: brew install jq"
    echo "  - On Windows with Chocolatey: choco install jq"
    exit 1
  fi
}

# Function to analyze CSV data
analyze_csv() {
  local csv_file=$1
  
  echo ""
  echo "Review Analysis:"
  
  # Count total reviews (excluding header)
  local total_reviews=$(wc -l < "$csv_file" | xargs)
  total_reviews=$((total_reviews - 1))
  echo "Total reviews: $total_reviews"
  
  # Calculate average rating
  # Skip header (tail -n +2), extract score column, calculate average
  local average_rating=$(tail -n +2 "$csv_file" | cut -d, -f3 | awk '{ sum += $1; count++ } END { if (count > 0) print sum / count; else print 0 }')
  printf "Average rating: %.2f/5.0\n" "$average_rating"
  
  echo ""
  echo "Rating distribution:"
  
  # Count reviews by rating
  for rating in {1..5}; do
    local count=$(tail -n +2 "$csv_file" | cut -d, -f3 | grep -c "^$rating$")
    local percentage=$(echo "scale=2; $count * 100 / $total_reviews" | bc)
    echo "  $rating stars: $count reviews ($percentage%)"
  done
  
  # Extract most recent review (assuming sorted by date)
  echo ""
  echo "Most recent review:"
  local most_recent=$(tail -n +2 "$csv_file" | sort -t, -k6 -r | head -n 1)
  local content=$(echo "$most_recent" | cut -d, -f2)
  local score=$(echo "$most_recent" | cut -d, -f3)
  local date=$(echo "$most_recent" | cut -d, -f6)
  echo "  \"$content\""
  echo "  Rating: $score/5"
  echo "  Date: $date"
  
  # Extract most helpful review (most thumbs up)
  echo ""
  echo "Most helpful review:"
  local most_helpful=$(tail -n +2 "$csv_file" | sort -t, -k4 -nr | head -n 1)
  local content=$(echo "$most_helpful" | cut -d, -f2)
  local score=$(echo "$most_helpful" | cut -d, -f3)
  local thumbs_up=$(echo "$most_helpful" | cut -d, -f4)
  echo "  \"$content\""
  echo "  Rating: $score/5"
  echo "  Thumbs up: $thumbs_up"
}

# Main script starts here

# Check dependencies
check_dependencies

# Default values
APP_ID=""
COUNT=100
LANG="en"
COUNTRY="us"
FROM_DATE=""
TO_DATE=""
OUTPUT_DIR="."

# Parse command line arguments
if [ $# -eq 0 ]; then
  show_help
fi

APP_ID=$1
shift

while [ $# -gt 0 ]; do
  case "$1" in
    -h|--help)
      show_help
      ;;
    -c|--count)
      COUNT="$2"
      shift 2
      ;;
    -l|--lang)
      LANG="$2"
      shift 2
      ;;
    -r|--country)
      COUNTRY="$2"
      shift 2
      ;;
    -f|--from-date)
      FROM_DATE="$2"
      shift 2
      ;;
    -t|--to-date)
      TO_DATE="$2"
      shift 2
      ;;
    -o|--output)
      OUTPUT_DIR="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      ;;
  esac
done

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Build the API URL
API_URL="http://localhost:5000/api/reviews?app_id=$APP_ID&count=$COUNT&lang=$LANG&country=$COUNTRY"

if [ -n "$FROM_DATE" ]; then
  API_URL="${API_URL}&from_date=$FROM_DATE"
fi

if [ -n "$TO_DATE" ]; then
  API_URL="${API_URL}&to_date=$TO_DATE"
fi

# Output file
CSV_FILE="$OUTPUT_DIR/${APP_ID}_reviews.csv"

echo "Fetching reviews for $APP_ID..."
echo "API URL: $API_URL"

# Fetch reviews and save to CSV
curl -s "$API_URL" > "$CSV_FILE"

# Check if the request was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to fetch reviews"
  exit 1
fi

# Check if the response is an error message (JSON)
if grep -q "error" "$CSV_FILE"; then
  echo "Error from API:"
  cat "$CSV_FILE" | jq .
  exit 1
fi

echo "Reviews saved to $CSV_FILE"

# Analyze the CSV data
analyze_csv "$CSV_FILE"

echo ""
echo "Done!"
