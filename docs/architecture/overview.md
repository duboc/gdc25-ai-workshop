# Architecture Overview

This document provides a high-level overview of the AI-Powered App Review Analysis Workshop architecture.

## System Components

The workshop consists of two main components:

1. **API Service (`api-play`)**: A Python Flask API that fetches reviews from the Google Play Store
2. **UI Application (`ui-play`)**: A React-based web interface for interacting with the API and visualizing results

### Component Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Google Play    │────▶│  API Service    │────▶│  UI Application │
│  Store          │     │  (api-play)     │     │  (ui-play)      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │                        │
                                │                        │
                                ▼                        ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │                 │     │                 │
                        │  AI Analysis    │     │  Visualization  │
                        │  (Prompts)      │     │  (Dashboards)   │
                        │                 │     │                 │
                        └─────────────────┘     └─────────────────┘
```

## API Service (`api-play`)

The API service is built with Python and Flask, providing endpoints to fetch reviews from the Google Play Store.

### Key Components

- **Flask Application**: Handles HTTP requests and responses
- **Google Play Scraper**: Fetches reviews from the Google Play Store
- **CSV Formatter**: Formats the reviews as CSV data for easy analysis

### API Endpoints

- `GET /api/reviews`: Fetches reviews for a specified app and returns them as CSV data

## UI Application (`ui-play`)

The UI application is built with React and provides a user-friendly interface for interacting with the API and visualizing the results.

### Key Components

- **React Application**: Provides the user interface
- **Tab Navigation**: Allows users to switch between different tools
- **Play Scraper Tab**: Interface for fetching and viewing reviews
- **Prompts Tab**: Displays AI prompts for analyzing reviews
- **JSON Prompts Tab**: Displays structured prompts with JSON configuration
- **Visualization Dashboards**: Interactive visualizations for review analysis

## Data Flow

1. User inputs an app ID and parameters in the UI
2. UI sends a request to the API
3. API fetches reviews from the Google Play Store
4. API formats the reviews as CSV and returns them to the UI
5. UI displays the reviews and allows the user to download them
6. User can use the provided AI prompts to analyze the reviews
7. User can view the analysis results in the visualization dashboards

## Deployment Architecture

Both the API and UI components are deployed to Google Cloud Run, providing a serverless, scalable architecture.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Google Cloud   │────▶│  API Service    │────▶│  UI Application │
│  Run            │     │  (Cloud Run)    │     │  (Cloud Run)    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Deployment Configuration

- **Region**: us-east1
- **Memory**: 512Mi
- **CPU**: 1
- **Min Instances**: 0
- **Max Instances**: 10
- **Concurrency**: 80 (API only)

## Security Considerations

- **CORS**: The API is configured to allow requests from the UI domain
- **Environment Variables**: Sensitive information is stored in environment variables
- **Input Validation**: All user inputs are validated before processing
