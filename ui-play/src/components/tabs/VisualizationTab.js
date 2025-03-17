import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { detectJsonType, processJsonData } from '../../utils/visualization/visualizationUtils';
import { VisualizationProvider, useVisualization } from '../../contexts/VisualizationContext';
import ProblemAnalysisVisualizer from '../visualizations/problem-analysis/ProblemAnalysisVisualizer';
import ReviewQualityVisualizer from '../visualizations/review-quality/ReviewQualityVisualizer';
import VersionComparisonVisualizer from '../visualizations/version-comparison/VersionComparisonVisualizer';
import UserSegmentationVisualizer from '../visualizations/user-segmentation/UserSegmentationVisualizer';
import UserStoriesVisualizer from '../visualizations/user-stories/UserStoriesVisualizer';
import MarketingCampaignVisualizer from '../visualizations/marketing-campaign/MarketingCampaignVisualizer';
import FtueAnalysisVisualizer from '../visualizations/ftue-analysis/FtueAnalysisVisualizer';
import StoreAnalysisVisualizer from '../visualizations/store-analysis/StoreAnalysisVisualizer';

/**
 * VisualizationContent Component
 * 
 * This component contains the main content of the visualization tab.
 * It's wrapped by the VisualizationProvider to provide context to all child components.
 */
const VisualizationContent = () => {
  // Use the visualization context
  const { tabs, activeTab, updateTabData, setActiveTab } = useVisualization();
  
  const [jsonData, setJsonData] = useState(null);
  const [selectedExample, setSelectedExample] = useState('');
  const [customJson, setCustomJson] = useState('');
  const [jsonType, setJsonType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exampleFiles, setExampleFiles] = useState([]);

  // Load example files when the component mounts
  useEffect(() => {
    const loadExampleFiles = async () => {
      try {
        // Define the example files
        const files = [
          { id: 'result1', name: 'Problem Analysis', path: '/static/examples/result1.json' },
          { id: 'result2', name: 'Review Quality Analysis', path: '/static/examples/result2.json' },
          { id: 'result3', name: 'Version Comparison', path: '/static/examples/result3.json' },
          { id: 'result4', name: 'User Segmentation', path: '/static/examples/result4.json' },
          { id: 'result5', name: 'User Stories', path: '/static/examples/result5.json' },
          { id: 'result6', name: 'Marketing Campaign', path: '/static/examples/result6.json' },
          { id: 'result7', name: 'FTUE Analysis', path: '/static/examples/result7.json' },
          { id: 'result8', name: 'Store Analysis', path: '/static/examples/result8.json' }
        ];
        
        setExampleFiles(files);
      } catch (err) {
        console.error('Error loading example files:', err);
        setError('Failed to load example files. Please try again later.');
      }
    };
    
    loadExampleFiles();
  }, []);

  // Load the selected example file
  const loadExampleFile = async (fileId) => {
    if (!fileId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const selectedFile = exampleFiles.find(file => file.id === fileId);
      if (!selectedFile) {
        throw new Error('Selected file not found');
      }
      
      const response = await fetch(selectedFile.path);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${selectedFile.path}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setJsonData(data);
      
      // Process the data for visualization
      processData(data);
      
      // Clear custom JSON input
      setCustomJson('');
    } catch (err) {
      console.error('Error loading example file:', err);
      setError(`Failed to load example file: ${err.message}`);
      setJsonData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle example file selection
  const handleExampleSelect = (e) => {
    const fileId = e.target.value;
    setSelectedExample(fileId);
    loadExampleFile(fileId);
  };

  // Handle custom JSON input
  const handleCustomJsonChange = (e) => {
    setCustomJson(e.target.value);
  };

  // Parse and visualize custom JSON
  const handleVisualizeCustomJson = () => {
    if (!customJson.trim()) {
      setError('Please enter JSON data');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = JSON.parse(customJson);
      setJsonData(data);
      
      // Process the data for visualization
      processData(data);
      
      // Clear selected example
      setSelectedExample('');
    } catch (err) {
      console.error('Error parsing custom JSON:', err);
      setError(`Invalid JSON: ${err.message}`);
      setJsonData(null);
    } finally {
      setLoading(false);
    }
  };

  // Process the JSON data and set the JSON type
  const processData = (data) => {
    if (!data) {
      setJsonType('');
      return;
    }
    
    const type = detectJsonType(data);
    setJsonType(type);
    
    // Process the data for visualization
    const processedData = processJsonData(data);
    
    // Update the tab data in the context
    if (type) {
      updateTabData(type, processedData);
      setActiveTab(type);
    }
    
    console.log('Processed data:', processedData);
  };

  // Render appropriate visualizations based on the active tab
  const renderVisualizations = () => {
    if (!jsonData) {
      return null;
    }
    
    // Get the active tab data from the context
    const activeTabData = tabs.find(tab => tab.id === activeTab)?.data;
    
    // If no data in the context, use the processed data
    const processedData = activeTabData || processJsonData(jsonData);
    
    // Render the appropriate visualization based on the active tab
    switch (activeTab) {
      case 'problem-analysis':
        return <ProblemAnalysisVisualizer data={processedData} />;
      case 'review-quality':
        return <ReviewQualityVisualizer data={processedData} />;
      case 'version-comparison':
        return <VersionComparisonVisualizer data={processedData} />;
      case 'user-segmentation':
        return <UserSegmentationVisualizer data={processedData} />;
      case 'user-stories':
        return <UserStoriesVisualizer data={processedData} />;
      case 'marketing-campaign':
        return <MarketingCampaignVisualizer data={processedData} />;
      case 'ftue-analysis':
        return <FtueAnalysisVisualizer data={processedData} />;
      case 'store-analysis':
        return <StoreAnalysisVisualizer data={processedData} />;
      default:
        return (
          <Card className="mt-4">
            <Card.Header>
              <h4>Unknown JSON Structure</h4>
            </Card.Header>
            <Card.Body>
              <p>The JSON structure could not be recognized.</p>
              <p>Please select a different example or provide a valid JSON structure.</p>
              <pre className="bg-light p-3 rounded">
                {JSON.stringify(jsonData, null, 2).substring(0, 500)}...
              </pre>
            </Card.Body>
          </Card>
        );
    }
  };

  return (
    <div className="visualization-tab">
      <div className="tab-header">
        <h2>Data Visualization</h2>
        <p>Visualize JSON data with interactive charts and graphs</p>
      </div>
      
      <Container>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>
                <h4>Select Example</h4>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Choose an example JSON file:</Form.Label>
                  <Form.Select 
                    value={selectedExample}
                    onChange={handleExampleSelect}
                  >
                    <option value="">-- Select an example --</option>
                    {exampleFiles.map(file => (
                      <option key={file.id} value={file.id}>
                        {file.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card>
              <Card.Header>
                <h4>Custom JSON</h4>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Or paste your own JSON:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={customJson}
                    onChange={handleCustomJsonChange}
                    placeholder="Paste JSON data here..."
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  className="mt-3"
                  onClick={handleVisualizeCustomJson}
                  disabled={!customJson.trim()}
                >
                  Visualize
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading data...</p>
          </div>
        )}
        
        {error && (
          <Alert variant="danger" className="my-4">
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}
        
        {renderVisualizations()}
      </Container>
    </div>
  );
};

/**
 * VisualizationTab Component
 * 
 * This component wraps the VisualizationContent component with the VisualizationProvider.
 * It provides the context for all child components.
 */
const VisualizationTab = () => {
  // Initialize tabs with example data
  const initialTabs = [
    { id: 'problem-analysis', label: 'Problem Analysis', data: null },
    { id: 'review-quality', label: 'Review Quality', data: null },
    { id: 'version-comparison', label: 'Version Comparison', data: null },
    { id: 'user-segmentation', label: 'User Segmentation', data: null },
    { id: 'user-stories', label: 'User Stories', data: null },
    { id: 'marketing-campaign', label: 'Marketing Campaign', data: null },
    { id: 'ftue-analysis', label: 'FTUE Analysis', data: null },
    { id: 'store-analysis', label: 'Store Analysis', data: null }
  ];

  return (
    <VisualizationProvider initialTabs={initialTabs} initialActiveTab="problem-analysis">
      <VisualizationContent />
    </VisualizationProvider>
  );
};

export default VisualizationTab;
