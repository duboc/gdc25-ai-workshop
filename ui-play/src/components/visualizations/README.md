# Visualization Components

This directory contains the visualization components for the Google Play Workshop application. Each component is responsible for visualizing a specific type of data.

## Structure

The visualization system is structured as follows:

- **VisualizationTab.js**: The main component that provides the UI for selecting and visualizing JSON data.
- **VisualizationContext.js**: A context provider that manages the state of the visualization system.
- **dataTypes.js**: Defines the data types and interfaces for the visualization components.
- **visualizationUtils.js**: Utility functions for processing JSON data and creating visualizations.

Each visualization component is in its own directory and follows a similar structure:

```
visualizations/
├── problem-analysis/
│   └── ProblemAnalysisVisualizer.js
├── review-quality/
│   └── ReviewQualityVisualizer.js
├── version-comparison/
│   └── VersionComparisonVisualizer.js
├── user-segmentation/
│   └── UserSegmentationVisualizer.js
├── user-stories/
│   └── UserStoriesVisualizer.js
├── marketing-campaign/
│   └── MarketingCampaignVisualizer.js
├── ftue-analysis/
│   └── FtueAnalysisVisualizer.js
└── store-analysis/
    └── StoreAnalysisVisualizer.js
```

## Data Flow

1. The user selects an example JSON file or pastes custom JSON in the VisualizationTab.
2. The JSON data is processed by the visualizationUtils.js functions.
3. The processed data is stored in the VisualizationContext.
4. The appropriate visualization component is rendered based on the type of data.

## Visualization Components

### 1. Problem Analysis Visualizer

Visualizes problem analysis data with:
- Problem severity/frequency matrix
- Problem category breakdown chart
- User segment impact visualization
- Actionable insights display

### 2. Review Quality Visualizer

Visualizes review quality data with:
- Rating distribution chart
- Review length distribution
- Keyword frequency visualization
- Suspicious pattern highlights

### 3. Version Comparison Visualizer

Visualizes version comparison data with:
- Version sentiment timeline
- Version comparison cards
- Best/worst version highlights

### 4. User Segmentation Visualizer

Visualizes user segmentation data with:
- Segment size comparison
- Segment characteristics radar charts
- Cross-segment analysis visualization
- Recommendations by segment

### 5. User Stories Visualizer

Visualizes user stories data with:
- Theme breakdown chart
- Story priority matrix
- Story points distribution
- User story cards display

### 6. Marketing Campaign Visualizer

Visualizes marketing campaign data with:
- Strategy overview chart
- Tactics breakdown by platform
- Budget allocation visualization
- Campaign summary cards

### 7. FTUE Analysis Visualizer

Visualizes FTUE analysis data with:
- Best practices compliance chart
- Criteria evaluation scorecard
- Loading time analysis
- Suggested improvements display

### 8. Store Analysis Visualizer

Visualizes store analysis data with:
- Best practices compliance chart
- Criteria evaluation cards
- Numerical metrics visualization
- Suggested improvements display

## Adding a New Visualizer

To add a new visualizer:

1. Create a new directory in the visualizations directory.
2. Create a new component in the directory.
3. Add the component to the VisualizationTab.js file.
4. Add the data type to the dataTypes.js file.
5. Add the data processing function to the visualizationUtils.js file.
6. Update the VISUALIZATION_PROJECT.md file.

## Dependencies

- Chart.js & react-chartjs-2: For creating charts and graphs
- React Bootstrap: For UI components
- D3.js (optional): For more complex visualizations
