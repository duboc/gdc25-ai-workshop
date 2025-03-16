# Google Play Reviews API - Human Guide

This guide provides comprehensive documentation for the Google Play Reviews API, which allows you to fetch reviews from the Google Play Store and receive them in CSV format.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [API Endpoints](#api-endpoints)
4. [Request Parameters](#request-parameters)
5. [Response Format](#response-format)
6. [Examples](#examples)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Introduction

The Google Play Reviews API is a simple yet powerful tool that allows you to retrieve and analyze reviews for any application on the Google Play Store. This API is particularly useful for:

- App developers who want to monitor user feedback
- Data analysts who need to perform sentiment analysis on app reviews
- Researchers studying user behavior and preferences
- Marketing teams tracking user satisfaction

## Getting Started

### Prerequisites

- Python 3.6 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/google-play-reviews-api.git
   cd google-play-reviews-api
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the API server:
   ```bash
   python app.py
   ```

The API will be available at http://localhost:5000.

## API Endpoints

### GET /api/reviews

This endpoint retrieves reviews for a specified app from the Google Play Store and returns them as CSV data.

## Request Parameters

| Parameter | Type   | Required | Default | Description                                      |
|-----------|--------|----------|---------|--------------------------------------------------|
| app_id    | string | Yes      | -       | The package name of the app (e.g., org.supertuxkart.stk) |
| count     | int    | No       | 100     | The number of reviews to fetch                   |
| lang      | string | No       | en      | The language of the reviews                      |
| country   | string | No       | us      | The country for the reviews                      |
| from_date | string | No       | -       | Filter reviews from this date (format: YYYY-MM-DD) |
| to_date   | string | No       | -       | Filter reviews until this date (format: YYYY-MM-DD) |

### Parameter Details

#### app_id
The package name of the app you want to fetch reviews for. This is the unique identifier for the app on the Google Play Store. You can find this in the URL of the app's Play Store page. For example, the package name for SuperTuxKart is `org.supertuxkart.stk`.

#### count
The maximum number of reviews to fetch. The default is 100, but you can specify any number between 1 and 1000. Note that fetching a large number of reviews may take longer to process.

#### lang
The language code for the reviews you want to fetch. This should be a two-letter ISO 639-1 language code. For example, `en` for English, `es` for Spanish, `fr` for French, etc.

#### country
The country code for the reviews you want to fetch. This should be a two-letter ISO 3166-1 alpha-2 country code. For example, `us` for United States, `gb` for United Kingdom, `jp` for Japan, etc.

#### from_date
Filter reviews from this date onwards. The date should be in the format YYYY-MM-DD (e.g., 2023-01-01). This parameter is optional.

#### to_date
Filter reviews until this date. The date should be in the format YYYY-MM-DD (e.g., 2023-12-31). This parameter is optional.

## Response Format

The API returns a CSV file with the following columns:

- **reviewId**: Unique identifier for the review
- **content**: The review text
- **score**: Rating (1-5)
- **thumbsUpCount**: Number of thumbs up the review received
- **reviewCreatedVersion**: App version the review was written for
- **at**: Timestamp of the review
- **replyContent**: Developer's reply (if any)
- **repliedAt**: Timestamp of the developer's reply (if any)

## Examples

### Basic Request

To fetch 50 reviews for SuperTuxKart in English from the United States:

```
http://localhost:5000/api/reviews?app_id=org.supertuxkart.stk&count=50&lang=en&country=us
```

### Date Filtering

To fetch reviews for SuperTuxKart from January 1, 2023 to December 31, 2023:

```
http://localhost:5000/api/reviews?app_id=org.supertuxkart.stk&from_date=2023-01-01&to_date=2023-12-31
```

### Using cURL

```bash
curl -o reviews.csv "http://localhost:5000/api/reviews?app_id=org.supertuxkart.stk&count=50&lang=en&country=us"
```

### Using Python

```python
import requests
import pandas as pd
import io

url = "http://localhost:5000/api/reviews"
params = {
    "app_id": "org.supertuxkart.stk",
    "count": 50,
    "lang": "en",
    "country": "us"
}

response = requests.get(url, params=params)
with open("reviews.csv", "wb") as f:
    f.write(response.content)

# Or load directly into pandas
df = pd.read_csv(io.StringIO(response.content.decode('utf-8')))
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of errors:

- **400 Bad Request**: When required parameters are missing or invalid. For example, if the `app_id` parameter is missing or if the date format is incorrect.
- **500 Internal Server Error**: When there's an error fetching reviews from the Google Play Store.

Error responses are returned as JSON objects with an `error` field containing the error message:

```json
{
  "error": "app_id parameter is required"
}
```

## Best Practices

1. **Limit the number of reviews**: Fetching a large number of reviews can be slow. Start with a smaller number and increase as needed.
2. **Use date filtering**: If you're only interested in recent reviews, use the `from_date` parameter to limit the results.
3. **Cache results**: If you're making multiple requests for the same app, consider caching the results to reduce API calls.
4. **Handle errors gracefully**: Always check for error responses and handle them appropriately in your application.
5. **Respect rate limits**: The Google Play Store may have rate limits. If you're making many requests, consider adding delays between them.

## Troubleshooting

### Common Issues

1. **No reviews returned**: This could be because:
   - The app doesn't have any reviews
   - The app doesn't exist with the given package name
   - The date range doesn't include any reviews
   - The language or country filters don't match any reviews

2. **Error: app_id parameter is required**: Make sure you're including the `app_id` parameter in your request.

3. **Error: Invalid date format**: Make sure your dates are in the format YYYY-MM-DD.

4. **Slow response times**: If the API is responding slowly, try:
   - Reducing the number of reviews requested
   - Using more specific filters
   - Checking your network connection

### Getting Help

If you encounter any issues not covered in this guide, please:

1. Check the [GitHub repository](https://github.com/yourusername/google-play-reviews-api) for known issues
2. Open a new issue if your problem hasn't been reported
3. Contact the maintainers at support@example.com
