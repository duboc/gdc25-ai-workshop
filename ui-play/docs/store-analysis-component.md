# Store Analysis Component Documentation

This document provides detailed information about the Store Analysis component implementation with Material UI-inspired design and WCAG accessibility compliance.

## Overview

The Store Analysis component visualizes in-app store analysis data with interactive charts and insights. It follows Material UI-inspired design principles and WCAG accessibility guidelines to provide a modern, clean, and accessible user interface.

## Component Structure

The component is structured as follows:

1. **StoreAnalysisDashboard.js** - The main dashboard component that handles data loading and processing.
2. **StoreAnalysisVisualizer.js** - The visualization component that renders charts and insights.
3. **Common Components**:
   - **DashboardLayout.js** - A Material UI-inspired layout component for all dashboards.
   - **DataInputCard.js** - A Material UI-inspired card component for data input.
   - **VisualizationCard.js** - A Material UI-inspired card component for visualizations.

## Material UI-Inspired Design Features

### 1. Color Palette

We've implemented a WCAG-compliant color palette based on Material Design principles:

- **Primary Color**: #6200EE (Purple)
- **Secondary Color**: #03DAC6 (Teal)
- **Error Color**: #B00020 (Red)
- **Warning Color**: #F57C00 (Orange)
- **Success Color**: #2E7D32 (Green)
- **Info Color**: #0277BD (Blue)

### 2. Typography

- Using Roboto font family for a clean, modern look
- Consistent font sizes and weights across the application
- Proper text hierarchy with clear headings and body text
- Enhanced text contrast for better readability

### 3. Elevation and Shadows

- Cards with different elevation levels (1-4) to create visual hierarchy
- Subtle shadows that provide depth without being distracting
- Hover effects that slightly elevate cards for better interaction feedback
- Border definition for better visual separation

### 4. Spacing and Layout

- Consistent spacing using an 8px grid system
- Clean, organized layout with proper alignment
- Responsive design that works well on different screen sizes
- Proper grouping of related information

### 5. Interactive Elements

- Progress bars with semantic colors
- Badges with clear visual hierarchy
- Cards with consistent styling
- Charts with tooltips and interactive features

### 6. Visual Enhancements

- Circular compliance score indicator
- Gradient backgrounds for headers
- Custom icons for different compliance statuses
- Color-coded criterion cards based on compliance status

## Charts and Visualizations

The Store Analysis component includes the following visualizations:

1. **Best Practices Compliance Doughnut Chart** - Shows the distribution of criteria by compliance status (Yes, Partial, No).
2. **Criteria by Category Bar Chart** - Displays the distribution of criteria across different categories, color-coded by compliance status.
3. **Criteria Cards** - Detailed cards for each criterion, organized by category, showing observations, metrics, and suggested improvements.
4. **Compliance Progress Bar** - Shows the overall compliance progress with color-coded segments.
5. **Compliance Score Circle** - Displays the overall compliance percentage in a visually appealing circular indicator.

## Data Flow

1. The dashboard component loads example data from a JSON file or accepts custom JSON input.
2. The data is processed using the `extractStoreAnalysisData` function from `visualizationUtils.js`.
3. The processed data is passed to the visualizer component.
4. The visualizer component renders the charts and insights based on the processed data.

## CSS and Styling

We've implemented a comprehensive Material UI-inspired CSS framework:

1. **material-ui-theme.css** - Global CSS variables and utility classes for Material Design.
2. **Inline styles** - Component-specific styles using the React inline style approach.
3. **Bootstrap integration** - Enhanced Bootstrap components with Material Design styling.

## Implementation Details

### DashboardLayout Component

- Gradient header with title and description
- Loading and error states
- Clean, organized content area

### DataInputCard Component

- Sections for example data and custom JSON input
- Material-styled buttons and form elements
- Visual feedback for user interactions

### VisualizationCard Component

- Customizable elevation levels
- Accent color options
- Icon support for better visual identification
- Clean header and body styling

### StoreAnalysisVisualizer Component

- Enhanced chart styling with Material Design colors
- Custom tooltips for better data exploration
- Compliance score circle for key metrics
- Styled badges for compliance status indicators
- Conditional rendering of charts based on available data
- Responsive layout with proper spacing

## Data Processing Improvements

We've made significant improvements to the data processing logic:

1. **Compliance Calculation**: Implemented proper calculation of compliance percentage, counting partial compliance as 0.5.
2. **Category Classification**: Added automatic categorization of criteria into logical groups (Promotional, Rewards, Pricing, UI/UX, Limited-Time).
3. **Metric Formatting**: Enhanced display of numerical metrics with proper formatting and labeling.
4. **Summary Generation**: Added dynamic summary generation based on compliance percentage.
5. **Color Coding**: Implemented semantic color coding based on compliance status and scores.

## Accessibility Improvements (WCAG Compliance)

We've enhanced the component to meet Web Content Accessibility Guidelines (WCAG) standards:

1. **Color Contrast**: Updated all colors to meet WCAG AA standards (minimum 4.5:1 contrast ratio for normal text and 3:1 for large text)
   - Text colors are now darker for better readability
   - Background colors have been adjusted for proper contrast
   - Chart colors use an accessible palette with sufficient contrast

2. **Semantic HTML Improvements**:
   - Added appropriate ARIA attributes to interactive elements
   - Improved semantic structure with proper heading hierarchy
   - Added role attributes to non-semantic elements

3. **Focus Indicators**:
   - Enhanced focus styles for interactive elements
   - Added visible focus outlines that meet contrast requirements

4. **Text Readability**:
   - Increased font weights for better readability
   - Improved line spacing and text sizing
   - Enhanced text contrast throughout the application

5. **Non-text Contrast**:
   - Added borders to UI components for better definition
   - Improved contrast for icons and graphical elements
   - Enhanced visual separation between UI elements

6. **Chart Accessibility**:
   - Implemented an accessible color palette for charts
   - Added white borders between chart elements for better distinction
   - Improved tooltip contrast and readability
   - Enhanced chart labels with better contrast

## Chart.js Configuration

We've configured Chart.js with WCAG-compliant styling:

1. **Doughnut Chart**:
   - Custom tooltips with improved contrast
   - Larger hover offset for better visibility
   - Proper legend styling with point styles
   - Accessible color palette

2. **Bar Chart**:
   - WCAG-compliant color palette
   - Custom tooltips with improved contrast
   - Proper axis labels and grid styling
   - Enhanced legend with better readability

## Compliance Status Styling

We've implemented compliance status styling to enhance the visual distinction between different compliance levels:

1. **Meets Best Practices (Yes)**: Green color scheme (#2E7D32)
2. **Partially Meets (Partial)**: Orange color scheme (#F57C00)
3. **Does Not Meet (No)**: Red color scheme (#B00020)

This color-coding is consistent across all visualizations, making it easier to identify and track compliance status throughout the dashboard.

## Criterion Cards

We've implemented a criterion card visualization that includes:

1. **Criterion Header**: Color-coded header based on the compliance status.
2. **Compliance Badge**: Badge indicating the compliance status.
3. **Criterion Title**: Title of the criterion.
4. **Observations**: Detailed observations about the criterion.
5. **Suggested Improvements**: Suggested improvements for the criterion.
6. **Metrics**: Numerical metrics associated with the criterion.

## Category Classification

We've implemented automatic categorization of criteria into logical groups:

1. **Promotional**: Criteria related to promotional flags, badges, etc.
2. **Rewards**: Criteria related to daily rewards, recurring rewards, etc.
3. **Pricing**: Criteria related to pricing, discounts, bulk purchases, etc.
4. **UI/UX**: Criteria related to sorting, ordering, featured items, clarity, etc.
5. **Limited-Time**: Criteria related to limited-time offers, timers, etc.
6. **Other**: Criteria that don't fit into the above categories.

This categorization helps organize the criteria into logical groups for better understanding and analysis.

## Future Improvements

1. Add animation effects for chart transitions
2. Implement dark mode support
3. Add more interactive features to the charts
4. Enhance accessibility features further
5. Add export functionality for charts and insights
6. Implement data caching for better performance
7. Add filtering capabilities for criteria by compliance status
8. Implement keyboard navigation for all interactive elements
9. Add time-based analysis for store performance trends
10. Implement detailed criterion analysis with screenshots

## Running the Application

To run the application:

1. Start the API server:
```
cd api-play
pip install -r requirements.txt
python app.py
```

2. Start the UI server:
```
cd ui-play
npm install
npm start
```

3. Navigate to the Store Analysis tab to see the visualizations in action.
