# Google Play Workshop UI

A React-based user interface for working with Google Play Store data. This application provides a tab-based interface for various tools related to Google Play Store reviews and analysis.

## Features

- **Tab-based Interface**: Easily switch between different tools
- **Play Scraper**: Fetch, view, and download reviews from the Google Play Store
- **Prompts**: View and use AI prompts for analyzing reviews
- **Prompts with JSON Configuration**: Structured prompts with JSON configuration for machine-readable outputs
- **Extensible Architecture**: Easily add new tabs and functionality

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Play Reviews API running on http://localhost:8080

## Installation

1. Clone the repository
2. Navigate to the ui-play directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

1. Make sure the Google Play Reviews API is running on http://localhost:8080
2. Start the React development server:

```bash
npm start
```

The application will be available at http://localhost:3000

## Usage

### Play Scraper Tab
1. Enter the app ID (package name) of the app you want to fetch reviews for (e.g., org.supertuxkart.stk)
2. Optionally, adjust the number of reviews, language, country, and date range
3. Click "Fetch Reviews" to retrieve the reviews
4. View the reviews in the table
5. Click "Download CSV" to download the reviews as a CSV file

### Prompts Tab
1. Browse through the available AI prompts for analyzing reviews
2. Copy the prompt template and customize it for your needs
3. Use the prompt with your preferred AI model

### Prompts with JSON Configuration Tab
1. Browse through the available structured prompts
2. Toggle between viewing the prompt and its JSON configuration
3. Use these prompts to get structured, machine-readable outputs from AI models

## Project Structure

- `public/`: Static assets and HTML template
- `src/`: Source code
  - `components/`: React components
    - `tabs/`: Tab content components
      - `PlayScraperTab.js`: Google Play review scraper
      - `PromptsTab.js`: AI prompts viewer
      - `JsonPromptsTab.js`: Structured prompts with JSON configuration
    - `TabNavigation.js`: Tab navigation component
    - `TabContent.js`: Tab content container
    - `ReviewForm.js`: Form for inputting parameters
    - `ReviewTable.js`: Table for displaying reviews
  - `contexts/`: React context providers
    - `TabContext.js`: Context for managing tab state
  - `config/`: Configuration files
    - `tabConfig.js`: Tab configuration and registration
  - `data/`: Data files
    - `prompts/`: Markdown prompt files
    - `json-prompts/`: Prompt and JSON configuration pairs
  - `styles/`: CSS stylesheets
  - `App.js`: Main application component
  - `index.js`: Entry point

## Adding a New Tab

To add a new tab to the application:

1. Create a new component in the `src/components/tabs/` directory
2. Add the tab configuration to `src/config/tabConfig.js`:
   ```javascript
   {
     id: 'your-tab-id',
     label: 'Your Tab Label',
     icon: 'bi bi-icon-name',
     description: 'Description of your tab'
   }
   ```
3. Import and add your component to the `tabComponents` object in `src/components/TabContent.js`

## Environment Variables

The application uses the following environment variables:

- `REACT_APP_API_URL`: URL of the Google Play Reviews API (default: http://localhost:8080)
- `PORT`: Port to run the React development server on (default: 3000)

These can be configured in the `.env` file.

## Dependencies

- React: Frontend library
- React Bootstrap: UI components
- Axios: HTTP client
- Papa Parse: CSV parser
- React Markdown: Markdown rendering
- React Syntax Highlighter: Code syntax highlighting

## License

This project is licensed under the MIT License - see the LICENSE file for details.
