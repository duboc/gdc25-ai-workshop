# Tab Components

This directory contains the tab components for the Google Play Workshop application. Each component is responsible for rendering a specific tab in the application.

## Structure

The tab system is structured as follows:

- **TabNavigation.js**: The main component that provides the navigation UI for switching between tabs.
- **TabContent.js**: The component that renders the content of the active tab.
- **TabContext.js**: A context provider that manages the state of the tab system.

Each tab component is in this directory and follows a similar structure:

```
tabs/
├── PlayScraperTab.js
├── PromptsTab.js
├── JsonPromptsTab.js
├── ProblemAnalysisDashboard.js
├── ReviewQualityDashboard.js
├── VersionComparisonDashboard.js
├── UserSegmentationDashboard.js
├── UserStoriesDashboard.js
├── MarketingCampaignDashboard.js
├── FtueAnalysisDashboard.js
└── StoreAnalysisDashboard.js
```

## Tab Components

### 1. PlayScraperTab

This tab allows users to scrape data from the Google Play Store. It provides a form for entering a package name and retrieving app data.

### 2. PromptsTab

This tab displays a list of prompts for analyzing app data. Each prompt provides a template for analyzing different aspects of app data.

### 3. JsonPromptsTab

This tab displays a list of JSON-formatted prompts for analyzing app data. Each prompt provides a structured template for analyzing different aspects of app data.

### 4. VisualizationTab

This tab allows users to visualize JSON data with interactive charts and graphs. It provides a UI for selecting example JSON files or pasting custom JSON data.

## Data Flow

1. The user selects a tab in the TabNavigation component.
2. The TabContext updates the active tab state.
3. The TabContent component renders the content of the active tab.
4. The active tab component renders its content.

## Adding a New Tab

To add a new tab:

1. Create a new component in the tabs directory.
2. Add the tab to the tabConfig.js file.
3. Update the TabNavigation component to include the new tab.
4. Update the TabContent component to render the new tab.

## Tab Context

The TabContext provides the following state and functions:

- **activeTab**: The ID of the currently active tab.
- **setActiveTab**: A function to set the active tab.
- **tabData**: An object containing data for each tab.
- **setTabData**: A function to update the data for a tab.

## Visualization Tab

The VisualizationTab is a special tab that uses the VisualizationContext to manage its state. It provides the following features:

- Select example JSON files
- Paste custom JSON data
- Visualize JSON data with interactive charts and graphs
- Switch between different visualization types based on the JSON data

The VisualizationTab uses the following components:

- **VisualizationContent**: The main content component that renders the visualization UI.
- **VisualizationProvider**: A context provider that manages the state of the visualization system.
- **Visualizers**: Components that render specific visualizations based on the JSON data.

## Dependencies

- React Bootstrap: For UI components
- Chart.js & react-chartjs-2: For creating charts and graphs in the VisualizationTab
