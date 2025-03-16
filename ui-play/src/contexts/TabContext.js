import React, { createContext, useState, useContext } from 'react';

// Create the context
const TabContext = createContext();

// Tab provider component
export const TabProvider = ({ children, initialTabs, initialActiveTab }) => {
  // Initialize state with the provided tabs or default to Play Scraper tab
  const [tabs] = useState(initialTabs || [
    { id: 'play-scraper', label: 'Play Scraper' },
    { id: 'prompts', label: 'Prompts' },
    { id: 'json-prompts', label: 'Prompts with Json Configuration' }
  ]);
  
  // Set the active tab to the provided one or default to the first tab
  const [activeTab, setActiveTab] = useState(initialActiveTab || tabs[0].id);

  // Function to change the active tab
  const changeTab = (tabId) => {
    setActiveTab(tabId);
  };

  // Provide the context value to children
  return (
    <TabContext.Provider value={{ tabs, activeTab, changeTab }}>
      {children}
    </TabContext.Provider>
  );
};

// Custom hook to use the tab context
export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};
