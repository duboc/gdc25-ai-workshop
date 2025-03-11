const express = require('express');
const path = require('path');
const https = require('https');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to scrape Google Play Store reviews
app.post('/api/scrape-reviews', (req, res) => {
  const { appPackage, reviewCount = 100 } = req.body;
  
  if (!appPackage) {
    return res.status(400).json({ error: 'App package name is required' });
  }
  
  // Mock response for demo purposes
  // In a real implementation, this would call the Google Play Store API
  setTimeout(() => {
    const mockReviews = Array.from({ length: Math.min(reviewCount, 20) }, (_, i) => ({
      id: `review-${i}`,
      userName: `User ${i}`,
      rating: Math.floor(Math.random() * 5) + 1,
      content: `This is a sample review for ${appPackage}. ${
        Math.random() > 0.5 ? 'I really like this app!' : 'This app needs some improvements.'
      }`,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
    }));
    
    res.json({
      appPackage,
      reviewCount: mockReviews.length,
      reviews: mockReviews
    });
  }, 1500); // Simulate network delay
});

// API endpoint to download reviews as CSV
app.get('/api/download-reviews', (req, res) => {
  const { appPackage, reviewCount = 100 } = req.query;
  
  if (!appPackage) {
    return res.status(400).json({ error: 'App package name is required' });
  }
  
  // Generate mock CSV data
  const mockReviews = Array.from({ length: Math.min(reviewCount, 20) }, (_, i) => ({
    id: `review-${i}`,
    userName: `User ${i}`,
    rating: Math.floor(Math.random() * 5) + 1,
    content: `This is a sample review for ${appPackage}. ${
      Math.random() > 0.5 ? 'I really like this app!' : 'This app needs some improvements.'
    }`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
  }));
  
  // Convert to CSV
  const csvHeader = 'ID,User,Rating,Date,Content\n';
  const csvContent = mockReviews.map(review => 
    `${review.id},${review.userName},${review.rating},${review.date},"${review.content.replace(/"/g, '""')}"`
  ).join('\n');
  
  const csv = csvHeader + csvContent;
  
  // Set headers for file download
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${appPackage}-reviews.csv`);
  
  res.send(csv);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
