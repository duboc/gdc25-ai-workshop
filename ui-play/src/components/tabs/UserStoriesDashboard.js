import React, { useState, useEffect } from 'react';
import { extractUserStoriesData } from '../../utils/visualization/visualizationUtils';
import UserStoriesVisualizer from '../visualizations/user-stories/UserStoriesVisualizer';
import DashboardLayout from '../common/DashboardLayout';
import DataInputCard from '../common/DataInputCard';

/**
 * UserStoriesDashboard Component
 * 
 * This component handles loading and processing user stories data,
 * and renders the UserStoriesVisualizer component.
 */
const UserStoriesDashboard = () => {
  const [jsonData, setJsonData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [customJson, setCustomJson] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load the example file when the component mounts
  useEffect(() => {
    loadExampleFile();
  }, []);

  // Load the example file
  const loadExampleFile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/static/examples/result5.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch example file: ${response.statusText}`);
      }
      
      const data = await response.json();
      setJsonData(data);
      
      // Process the data for visualization
      const processed = extractUserStoriesData(data);
      setProcessedData(processed);
      
      // Clear custom JSON input
      setCustomJson('');
    } catch (err) {
      console.error('Error loading example file:', err);
      setError(`Failed to load example file: ${err.message}`);
      setJsonData(null);
      setProcessedData(null);
    } finally {
      setLoading(false);
    }
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
      const processed = extractUserStoriesData(data);
      setProcessedData(processed);
    } catch (err) {
      console.error('Error parsing custom JSON:', err);
      setError(`Invalid JSON: ${err.message}`);
      setJsonData(null);
      setProcessedData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="User Stories"
      description="Generate user stories from feedback"
      loading={loading}
      error={error}
    >
      <DataInputCard
        customJson={customJson}
        onCustomJsonChange={handleCustomJsonChange}
        onLoadExampleData={loadExampleFile}
        onVisualizeCustomJson={handleVisualizeCustomJson}
        exampleFileName="result5.json"
      />
      
      {processedData && <UserStoriesVisualizer data={processedData} />}
    </DashboardLayout>
  );
};

export default UserStoriesDashboard;
