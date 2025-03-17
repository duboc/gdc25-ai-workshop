/**
 * Tab Configuration
 * 
 * This file defines all tabs in the application.
 * To add a new tab, simply add a new entry to the tabConfig array.
 * 
 * Each tab entry should have:
 * - id: Unique identifier for the tab
 * - label: Display name for the tab
 * - icon: Icon class (using Bootstrap icons)
 * - description: Short description of the tab's purpose
 */

const tabConfig = [
  {
    id: 'play-scraper',
    label: 'Play Scraper',
    icon: 'bi bi-google',
    description: 'Fetch and analyze reviews from Google Play Store'
  },
  {
    id: 'prompts',
    label: 'Prompts',
    icon: 'bi bi-chat-text',
    description: 'View and use AI prompts for review analysis'
  },
  {
    id: 'json-prompts',
    label: 'Prompts with Json',
    icon: 'bi bi-braces',
    description: 'Prompts with JSON configuration for structured outputs'
  },
  {
    id: 'problem-analysis',
    label: 'Problem Analysis',
    icon: 'bi bi-exclamation-triangle',
    description: 'Analyze user feedback and identify key issues'
  },
  {
    id: 'review-quality',
    label: 'Review Quality',
    icon: 'bi bi-shield-check',
    description: 'Detect spam and low-quality reviews'
  },
  {
    id: 'version-comparison',
    label: 'Version Comparison',
    icon: 'bi bi-arrow-left-right',
    description: 'Compare metrics across different app versions'
  },
  {
    id: 'user-segmentation',
    label: 'User Segmentation',
    icon: 'bi bi-people',
    description: 'Analyze different user segments and their characteristics'
  },
  {
    id: 'user-stories',
    label: 'User Stories',
    icon: 'bi bi-book',
    description: 'Generate user stories from feedback'
  },
  {
    id: 'marketing-campaign',
    label: 'Marketing Campaign',
    icon: 'bi bi-megaphone',
    description: 'Plan and analyze marketing campaigns'
  },
  {
    id: 'ftue-analysis',
    label: 'FTUE Analysis',
    icon: 'bi bi-person-plus',
    description: 'Analyze first-time user experience'
  },
  {
    id: 'store-analysis',
    label: 'Store Analysis',
    icon: 'bi bi-shop',
    description: 'Analyze in-app store performance'
  }
];

/**
 * Function to register a new tab
 * 
 * Use this function to dynamically add new tabs at runtime.
 * Example:
 * 
 * registerTab({
 *   id: 'new-tab',
 *   label: 'New Tab',
 *   icon: 'bi bi-plus-circle',
 *   description: 'A new tab added dynamically'
 * });
 */
export const registerTab = (newTab) => {
  // Check if tab with this ID already exists
  const existingTabIndex = tabConfig.findIndex(tab => tab.id === newTab.id);
  
  if (existingTabIndex >= 0) {
    // Replace existing tab
    tabConfig[existingTabIndex] = newTab;
  } else {
    // Add new tab
    tabConfig.push(newTab);
  }
  
  return tabConfig;
};

/**
 * Function to get a tab by ID
 */
export const getTabById = (tabId) => {
  return tabConfig.find(tab => tab.id === tabId);
};

export default tabConfig;
