import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTabContext } from '../contexts/TabContext';
import tabConfig from '../config/tabConfig';

/**
 * TabNavigation Component
 * 
 * Displays the navigation tabs and handles tab switching.
 * Uses the TabContext to manage the active tab state.
 */
const TabNavigation = () => {
  const { activeTab, changeTab } = useTabContext();

  return (
    <Nav 
      variant="tabs" 
      className="mb-4 tab-navigation"
      activeKey={activeTab}
    >
      {tabConfig.map((tab) => (
        <Nav.Item key={tab.id}>
          <Nav.Link 
            eventKey={tab.id} 
            onClick={() => changeTab(tab.id)}
            className={activeTab === tab.id ? 'active' : ''}
            title={tab.description}
          >
            <i className={tab.icon}></i> {tab.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default TabNavigation;
