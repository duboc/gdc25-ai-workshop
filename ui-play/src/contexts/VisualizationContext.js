import React, { createContext, useState, useContext } from 'react';

/**
 * @typedef {Object} TabData
 * @property {string} id - The unique identifier for the tab
 * @property {string} label - The display label for the tab
 * @property {Object} data - The data associated with the tab
 */

/**
 * @typedef {Object} VisualizationContextType
 * @property {TabData[]} tabs - Array of tab data objects
 * @property {string} activeTab - ID of the currently active tab
 * @property {function} setActiveTab - Function to set the active tab
 * @property {function} addTab - Function to add a new tab
 * @property {function} updateTabData - Function to update tab data
 * @property {function} removeTab - Function to remove a tab
 */

// Create the context
const VisualizationContext = createContext();

/**
 * Provider component for visualization data context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {TabData[]} [props.initialTabs=[]] - Initial tabs data
 * @param {string} [props.initialActiveTab=''] - Initial active tab ID
 */
export const VisualizationProvider = ({ 
  children, 
  initialTabs = [], 
  initialActiveTab = '' 
}) => {
  const [tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState(initialActiveTab || (initialTabs[0]?.id || ''));
  
  /**
   * Add a new tab
   * @param {TabData} tab - Tab data to add
   */
  const addTab = (tab) => {
    setTabs(prevTabs => [...prevTabs, tab]);
  };

  /**
   * Update data for a specific tab
   * @param {string} tabId - ID of the tab to update
   * @param {Object} data - New data for the tab
   */
  const updateTabData = (tabId, data) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === tabId ? { ...tab, data } : tab
      )
    );
  };

  /**
   * Remove a tab
   * @param {string} tabId - ID of the tab to remove
   */
  const removeTab = (tabId) => {
    setTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId));
    if (activeTab === tabId && tabs.length > 1) {
      setActiveTab(tabs[0].id);
    }
  };

  return (
    <VisualizationContext.Provider 
      value={{ 
        tabs, 
        activeTab, 
        setActiveTab, 
        addTab, 
        updateTabData, 
        removeTab 
      }}
    >
      {children}
    </VisualizationContext.Provider>
  );
};

/**
 * Hook to use the visualization context
 * @returns {VisualizationContextType} The visualization context
 */
export const useVisualization = () => {
  const context = useContext(VisualizationContext);
  if (context === undefined) {
    throw new Error('useVisualization must be used within a VisualizationProvider');
  }
  return context;
};
