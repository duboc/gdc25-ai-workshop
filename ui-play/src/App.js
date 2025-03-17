import React from 'react';
import { Container } from 'react-bootstrap';
import { TabProvider } from './contexts/TabContext';
import TabNavigation from './components/TabNavigation';
import TabContent from './components/TabContent';
import './styles/App.css';
import './styles/material-ui-theme.css';

// Import Bootstrap CSS and icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * App Component
 * 
 * The main application component that sets up the tab-based interface.
 * Uses TabProvider to manage tab state and renders TabNavigation and TabContent.
 * Styled with Material UI-inspired design and personalized for GDC 2025 workshop.
 */
function App() {
  return (
    <TabProvider>
      <div className="app-wrapper">
        {/* Material UI-inspired App Bar */}
        <header className="app-bar elevation-2">
          <Container>
            <div className="app-bar-content">
              <div className="app-bar-title">
                <i className="bi bi-controller app-logo"></i>
                <div>
                  <h1>AI-Powered Decisions</h1>
                  <p className="app-bar-subtitle">A Workshop for Game Developers | GDC 2025</p>
                </div>
              </div>
              <div className="app-bar-actions">
                <a 
                  href="https://github.com/duboc/gdc25-ai-workshop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-link"
                  title="View on GitHub"
                >
                  <i className="bi bi-github"></i>
                </a>
              </div>
            </div>
          </Container>
        </header>
        
        {/* Main Content */}
        <main className="main-content">
          <Container>
            
            <div className="tab-container elevation-2 rounded-md">
              <TabNavigation />
              <TabContent />
            </div>
          </Container>
        </main>
        
        {/* Footer */}
        <footer className="app-footer">
          <Container>
            <div className="footer-content">
              <div className="footer-logo">
                <i className="bi bi-controller"></i>
                <span>Indie Games Pros | GDC 2025</span>
              </div>
              <div className="footer-links">
                <a href="https://cloud.google.com/ai" target="_blank" rel="noopener noreferrer">Google AI</a>
                <a href="https://play.google.com/console/developers" target="_blank" rel="noopener noreferrer">Google Play Console</a>
                <a href="https://github.com/duboc/gdc25-ai-workshop" target="_blank" rel="noopener noreferrer">Workshop Repository</a>
              </div>
            </div>
            <div className="footer-copyright">
              <p>© 2025 Google LLC. All rights reserved.</p>
            </div>
          </Container>
        </footer>
      </div>
    </TabProvider>
  );
}

export default App;
