import React, { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Papa from 'papaparse';
import ReviewForm from '../ReviewForm';
import ReviewTable from '../ReviewTable';

/**
 * PlayScraperTab Component
 * 
 * This tab contains the Google Play Store review scraper functionality.
 * It allows users to fetch, view, and download reviews from the Google Play Store.
 */
const PlayScraperTab = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const fetchReviews = async (formData) => {
    setLoading(true);
    setError(null);
    setReviews([]);
    setCsvData(null);

    try {
      // Build the API URL with query parameters
      const apiUrl = '/api/reviews';
      const params = {
        app_id: formData.appId,
        count: formData.count,
        lang: formData.lang,
        country: formData.country
      };

      // Add optional date parameters if provided
      if (formData.fromDate) {
        params.from_date = formData.fromDate;
      }
      if (formData.toDate) {
        params.to_date = formData.toDate;
      }

      // Make the API request
      const response = await axios.get(apiUrl, {
        params,
        responseType: 'text'
      });

      // Parse the CSV data
      const parsedData = Papa.parse(response.data, {
        header: true,
        skipEmptyLines: true
      });

      // Store the raw CSV data for download
      setCsvData(response.data);

      // Set the parsed reviews
      setReviews(parsedData.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      
      // Provide more detailed error messages
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
        
        setError(
          `Server error (${err.response.status}): ${err.response.data?.error || 'Unknown error'}`
        );
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Request:', err.request);
        setError(
          'No response received from server. Please check if the API is running.'
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(
          `Error: ${err.message || 'An unknown error occurred'}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!csvData) return;

    // Create a blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reviews_${new Date().toISOString().slice(0, 10)}.csv`);
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="play-scraper-tab">
      <div className="tab-header">
        <h2>Google Play Reviews Explorer</h2>
        <p>Fetch, view, and download reviews from Google Play Store</p>
      </div>

      <ReviewForm onSubmit={fetchReviews} isLoading={loading} />

      {loading && (
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {reviews.length > 0 && (
        <ReviewTable reviews={reviews} onDownload={handleDownload} />
      )}

      {reviews.length === 0 && !loading && !error && (
        <Alert variant="info" className="mt-3">
          <p>Enter an app ID and click "Fetch Reviews" to get started.</p>
        </Alert>
      )}
    </div>
  );
};

export default PlayScraperTab;
