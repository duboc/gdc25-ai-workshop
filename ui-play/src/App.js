import React from 'react';
import { Container } from 'react-bootstrap';
import { TabProvider } from './contexts/TabContext';
import TabNavigation from './components/TabNavigation';
import TabContent from './components/TabContent';
import './styles/App.css';

// Import Bootstrap CSS and icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * App Component
 * 
 * The main application component that sets up the tab-based interface.
 * Uses TabProvider to manage tab state and renders TabNavigation and TabContent.
 */
function App() {
  return (
    <TabProvider>
      <Container className="app-container">
        <div className="app-header">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Google Play Workshop</h1>
            <a 
              href="https://github.com/duboc/gdc25-ai-workshop" 
              target="_blank" 
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <i className="bi bi-github" style={{ fontSize: '1.5rem', color: 'var(--google-blue)' }}></i>
            </a>
          </div>
          <p>Tools for analyzing and working with Google Play Store data</p>
        </div>
        
        <TabNavigation />
        <TabContent />
      </Container>
    </TabProvider>
  );
}

export default App;
