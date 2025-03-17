import React, { useState, useEffect } from 'react';
import { extractProblemAnalysisData } from '../../utils/visualization/visualizationUtils';
import ProblemAnalysisVisualizer from '../visualizations/problem-analysis/ProblemAnalysisVisualizer';
import DashboardLayout from '../common/DashboardLayout';
import DataInputCard from '../common/DataInputCard';

/**
 * ProblemAnalysisDashboard Component
 * 
 * This component handles loading and processing problem analysis data,
 * and renders the ProblemAnalysisVisualizer component.
 */
const ProblemAnalysisDashboard = () => {
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
      const response = await fetch('/static/examples/result1.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch example file: ${response.statusText}`);
      }
      
      const data = await response.json();
      setJsonData(data);
      
      // Process the data for visualization
      const processed = extractProblemAnalysisData(data);
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
      const processed = extractProblemAnalysisData(data);
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
      title="Problem Analysis"
      description="Analyze user feedback and identify key issues"
      loading={loading}
      error={error}
    >
      <DataInputCard
        customJson={customJson}
        onCustomJsonChange={handleCustomJsonChange}
        onLoadExampleData={loadExampleFile}
        onVisualizeCustomJson={handleVisualizeCustomJson}
        exampleFileName="result1.json"
      />
      
      {processedData && <ProblemAnalysisVisualizer data={processedData} />}
    </DashboardLayout>
  );
};

export default ProblemAnalysisDashboard;
