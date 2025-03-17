# AI-Powered App Review Analysis Workshop

![License](https://img.shields.io/github/license/duboc/gdc25-ai-workshop)
![GDC 2025](https://img.shields.io/badge/GDC-2025-6200EE)

A comprehensive workshop for game developers to analyze player feedback from Google Play Store reviews using AI. This project provides tools to scrape reviews, analyze them with AI, and visualize the results to gain actionable insights.

![Workshop Banner](https://via.placeholder.com/1200x300/6200EE/FFFFFF?text=AI-Powered+App+Review+Analysis+Workshop)

## 📋 Overview

This workshop guides participants through analyzing Android app reviews using AI. The project consists of two main components:

1. **API Service (`api-play`)**: A Python Flask API that fetches reviews from the Google Play Store
2. **UI Application (`ui-play`)**: A React-based web interface for interacting with the API and visualizing results

Together, these components provide a complete workflow for:
- Collecting app reviews from Google Play Store
- Analyzing reviews with AI using various prompt techniques
- Visualizing insights through interactive dashboards
- Generating actionable recommendations for app improvement

## 🏗️ Architecture

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

## 🚀 Quick Start

### Prerequisites

- Python 3.8+ with pip
- Node.js 14+ with npm
- Google Cloud SDK (for deployment)

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/duboc/gdc25-ai-workshop.git
cd gdc25-ai-workshop
```

2. **Start both applications with a single command**

```bash
chmod +x start_apps.sh
./start_apps.sh
```

This script will:
- Set up Python virtual environment for the API
- Install all dependencies for both API and UI
- Start the API server on http://localhost:8080
- Start the UI development server on http://localhost:3000

3. **Access the application**

Open your browser and navigate to http://localhost:3000

## 🔍 Features

### API Service (`api-play`)

- Fetch reviews for any app on Google Play Store
- Filter reviews by language, country, and date range
- Return results in CSV format for easy analysis
- RESTful API with comprehensive documentation

### UI Application (`ui-play`)

- **Play Scraper**: Fetch, view, and download reviews from Google Play Store
- **Prompts**: View and use AI prompts for analyzing reviews
- **JSON Prompts**: Structured prompts with JSON configuration for machine-readable outputs
- **Visualization Dashboards**: Interactive visualizations for review analysis
  - Problem Analysis
  - Review Quality
  - Version Comparison
  - User Segmentation
  - User Stories
  - Marketing Campaign
  - FTUE Analysis
  - Store Analysis

## 📊 Workshop Flow

1. **App Selection**: Input an Android app package name
2. **Data Collection**: Scrape customer reviews from Google Play Store
3. **Data Export**: Download the review data as CSV
4. **AI Analysis**: Use AI with prepared prompts
5. **Result Processing**: Interpret AI responses or parse JSON output
6. **Visualization**: Explore insights through interactive dashboards

## 🛠️ Installation & Setup

For detailed installation instructions, see:
- [API Service Setup](api-play/README.md)
- [UI Application Setup](ui-play/README.md)

## ☁️ Deployment

This project can be deployed to Google Cloud Run for production use.

For detailed deployment instructions, see:
- [API Deployment Guide](api-play/deploy.sh)
- [UI Deployment Guide](ui-play/DEPLOYMENT.md)

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Google Play Developer API](https://developers.google.com/android-publisher)
- [Google AI Studio](https://ai.google.dev/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Flask Documentation](https://flask.palletsprojects.com/)

## 📞 Contact

For questions or feedback, please open an issue on this repository or contact the maintainers.

---

<p align="center">
  <i>Presented at Game Developers Conference (GDC) 2025</i>
</p>
