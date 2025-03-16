# Google Play Reviews API Documentation

Welcome to the comprehensive documentation for the Google Play Reviews API. This documentation is designed to serve both human readers and AI systems, providing all the information needed to understand, integrate with, and use the API effectively.

## Documentation Overview

This documentation is organized into several sections:

1. **[Human Guide](./human-guide.md)**: A comprehensive guide for human developers with detailed explanations, examples, and best practices.
2. **[AI Integration Guide](./ai-integration.md)**: Structured information specifically designed for AI systems to understand and interact with the API.
3. **[OpenAPI Specification](./openapi.yaml)**: A machine-readable description of the API following the OpenAPI 3.1.0 standard.
4. **[Code Examples](./examples/)**: Practical examples in various programming languages demonstrating how to use the API.

## API Overview

The Google Play Reviews API allows you to fetch reviews from the Google Play Store for any application and receive them as CSV data. Key features include:

- Retrieve reviews for any app on Google Play Store using its package name
- Filter reviews by language and country
- Filter reviews by date range
- Get results in CSV format for easy analysis

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/google-play-reviews-api.git
cd google-play-reviews-api

# Install dependencies
pip install -r requirements.txt

# Start the API server
python app.py
```

The API will be available at http://localhost:5000.

### Basic Usage

To fetch reviews for an app, make a GET request to the `/api/reviews` endpoint with the required parameters:

```
http://localhost:5000/api/reviews?app_id=org.supertuxkart.stk&count=50&lang=en&country=us
```

This will return a CSV file containing the reviews.

## Code Examples

We provide examples in multiple programming languages to help you get started:

- [Python Example](./examples/python_example.py): Demonstrates how to fetch reviews, save them to a CSV file, and perform basic analysis.
- [JavaScript Example](./examples/javascript_example.js): Shows how to use the API with Node.js.
- [Shell Example](./examples/shell_example.sh): Illustrates how to use the API with cURL and basic shell commands.

## API Reference

### GET /api/reviews

Fetches reviews for a specified app from the Google Play Store and returns them as CSV data.

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

## For More Information

For more detailed information, please refer to:

- [Human Guide](./human-guide.md) for comprehensive documentation
- [AI Integration Guide](./ai-integration.md) for AI-specific documentation
- [OpenAPI Specification](./openapi.yaml) for a machine-readable API description

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
