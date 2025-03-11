import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TabData } from '../types';

interface JsonDataContextType {
  tabs: TabData[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  addTab: (tab: TabData) => void;
  updateTabData: (tabId: string, data: any) => void;
  removeTab: (tabId: string) => void;
}

const JsonDataContext = createContext<JsonDataContextType | undefined>(undefined);

interface JsonDataProviderProps {
  children: ReactNode;
  initialTabs?: TabData[];
}

export const JsonDataProvider: React.FC<JsonDataProviderProps> = ({ 
  children, 
  initialTabs = [{ id: 'problems', label: 'Problem Analysis', data: null }]
}) => {
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);
  const [activeTab, setActiveTab] = useState(initialTabs[0]?.id || 'problems');

  const addTab = (tab: TabData) => {
    setTabs(prevTabs => [...prevTabs, tab]);
  };

  const updateTabData = (tabId: string, data: any) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === tabId ? { ...tab, data } : tab
      )
    );
  };

  const removeTab = (tabId: string) => {
    setTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId));
    if (activeTab === tabId && tabs.length > 1) {
      setActiveTab(tabs[0].id);
    }
  };

  return (
    <JsonDataContext.Provider 
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
    </JsonDataContext.Provider>
  );
};

export const useJsonData = (): JsonDataContextType => {
  const context = useContext(JsonDataContext);
  if (context === undefined) {
    throw new Error('useJsonData must be used within a JsonDataProvider');
  }
  return context;
};
