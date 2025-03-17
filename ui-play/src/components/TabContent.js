import React from 'react';
import { useTabContext } from '../contexts/TabContext';
import PlayScraperTab from './tabs/PlayScraperTab';
import PromptsTab from './tabs/PromptsTab';
import JsonPromptsTab from './tabs/JsonPromptsTab';
import ProblemAnalysisDashboard from './tabs/ProblemAnalysisDashboard';
import ReviewQualityDashboard from './tabs/ReviewQualityDashboard';
import VersionComparisonDashboard from './tabs/VersionComparisonDashboard';
import UserSegmentationDashboard from './tabs/UserSegmentationDashboard';
import UserStoriesDashboard from './tabs/UserStoriesDashboard';
import MarketingCampaignDashboard from './tabs/MarketingCampaignDashboard';
import FtueAnalysisDashboard from './tabs/FtueAnalysisDashboard';
import StoreAnalysisDashboard from './tabs/StoreAnalysisDashboard';

/**
 * TabContent Component
 * 
 * Renders the content for the active tab.
 * This component maps tab IDs to their respective content components.
 * 
 * To add a new tab content:
 * 1. Create a new component for the tab content
 * 2. Import it at the top of this file
 * 3. Add it to the tabComponents object with the tab ID as the key
 */
const TabContent = () => {
  const { activeTab } = useTabContext();
  
  // Map of tab IDs to their content components
  const tabComponents = {
    'play-scraper': PlayScraperTab,
    'prompts': PromptsTab,
    'json-prompts': JsonPromptsTab,
    'problem-analysis': ProblemAnalysisDashboard,
    'review-quality': ReviewQualityDashboard,
    'version-comparison': VersionComparisonDashboard,
    'user-segmentation': UserSegmentationDashboard,
    'user-stories': UserStoriesDashboard,
    'marketing-campaign': MarketingCampaignDashboard,
    'ftue-analysis': FtueAnalysisDashboard,
    'store-analysis': StoreAnalysisDashboard
  };
  
  // Get the component for the active tab
  const ActiveTabComponent = tabComponents[activeTab];
  
  // If no component is found for the active tab, show an error message
  if (!ActiveTabComponent) {
    return (
      <div className="alert alert-warning">
        <h4>Tab Content Not Found</h4>
        <p>No content component found for tab ID: {activeTab}</p>
        <p>To add this tab, create a component and add it to the tabComponents object in TabContent.js</p>
      </div>
    );
  }
  
  // Render the active tab component
  return <ActiveTabComponent />;
};

export default TabContent;
