# Google Play Reviews API

A simple API that fetches reviews from Google Play Store and returns them as CSV data.

## Features

- Fetch reviews for any app on Google Play Store
- Specify the number of reviews to fetch
- Filter reviews by language and country
- Get results in CSV format for easy analysis

## Installation

1. Clone this repository
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Running the API

Start the API server with:

```bash
python app.py
```

The API will be available at http://localhost:5000

For production deployment, you can use Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Documentation

### GET /api/reviews

Fetches reviews for a specified app and returns them as CSV data.

#### Parameters

| Parameter | Type   | Required | Default | Description                                      |
|-----------|--------|----------|---------|--------------------------------------------------|
| app_id    | string | Yes      | -       | The package name of the app (e.g., org.supertuxkart.stk) |
| count     | int    | No       | 100     | The number of reviews to fetch                   |
| lang      | string | No       | en      | The language of the reviews                      |
| country   | string | No       | us      | The country for the reviews                      |
| from_date | string | No       | -       | Filter reviews from this date (format: YYYY-MM-DD) |
| to_date   | string | No       | -       | Filter reviews until this date (format: YYYY-MM-DD) |

#### Response

A CSV file containing the reviews with the following fields:

- reviewId: Unique identifier for the review
- content: The review text
- score: Rating (1-5)
- thumbsUpCount: Number of thumbs up the review received
- reviewCreatedVersion: App version the review was written for
- at: Timestamp of the review
- replyContent: Developer's reply (if any)
- repliedAt: Timestamp of the developer's reply (if any)

## Example Usage

### Browser

Visit the following URL in your browser:

```
http://localhost:5000/api/reviews?app_id=org.supertuxkart.stk&count=50&lang=en&country=us
```

This will download a CSV file with the 50 most recent English reviews for SuperTuxKart from the US.

With date filtering:

```
http://localhost:5000/api/reviews?app_id=org.supertuxkart.stk&from_date=2023-01-01&to_date=2023-12-31
```

This will download a CSV file with reviews from January 1, 2023 to December 31, 2023.

### cURL

```bash
curl -o reviews.csv "http://localhost:5000/api/reviews?app_id=org.supertuxkart.stk&count=50&lang=en&country=us"
```

With date filtering:

```bash
curl -o reviews.csv "http://localhost:5000/api/reviews?app_id=org.supertuxkart.stk&from_date=2023-01-01&to_date=2023-12-31"
```

### Python

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

# Example with date filtering
params_with_dates = {
    "app_id": "org.supertuxkart.stk",
    "from_date": "2023-01-01",
    "to_date": "2023-12-31"
}

response = requests.get(url, params=params_with_dates)
df_filtered = pd.read_csv(io.StringIO(response.content.decode('utf-8')))
