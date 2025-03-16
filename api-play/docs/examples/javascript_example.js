#!/usr/bin/env node
/**
 * Google Play Reviews API - JavaScript Example
 * 
 * This script demonstrates how to use the Google Play Reviews API with Node.js.
 * It shows how to fetch reviews, save them to a CSV file, and perform basic analysis.
 * 
 * Usage:
 *   node javascript_example.js <app_id> [options]
 * 
 * Options:
 *   --count <number>     Number of reviews to fetch (default: 100)
 *   --lang <code>        Language code (default: en)
 *   --country <code>     Country code (default: us)
 *   --from-date <date>   Filter reviews from this date (YYYY-MM-DD)
 *   --to-date <date>     Filter reviews until this date (YYYY-MM-DD)
 *   --output <dir>       Output directory (default: current directory)
 * 
 * Example:
 *   node javascript_example.js org.supertuxkart.stk --count 50 --lang en --country us
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const { parse } = require('csv-parse/sync');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Error: Missing app_id parameter');
  console.log('Usage: node javascript_example.js <app_id> [options]');
  process.exit(1);
}

const appId = args[0];
let count = 100;
let lang = 'en';
let country = 'us';
let fromDate = null;
let toDate = null;
let outputDir = '.';

// Parse options
for (let i = 1; i < args.length; i++) {
  if (args[i] === '--count' && i + 1 < args.length) {
    count = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--lang' && i + 1 < args.length) {
    lang = args[i + 1];
    i++;
  } else if (args[i] === '--country' && i + 1 < args.length) {
    country = args[i + 1];
    i++;
  } else if (args[i] === '--from-date' && i + 1 < args.length) {
    fromDate = args[i + 1];
    i++;
  } else if (args[i] === '--to-date' && i + 1 < args.length) {
    toDate = args[i + 1];
    i++;
  } else if (args[i] === '--output' && i + 1 < args.length) {
    outputDir = args[i + 1];
    i++;
  }
}

/**
 * Fetch reviews from the Google Play Reviews API
 * 
 * @param {string} appId - The package name of the app
 * @param {Object} options - Options for the request
 * @param {number} options.count - The number of reviews to fetch
 * @param {string} options.lang - The language of the reviews
 * @param {string} options.country - The country for the reviews
 * @param {string} options.fromDate - Filter reviews from this date (YYYY-MM-DD)
 * @param {string} options.toDate - Filter reviews until this date (YYYY-MM-DD)
 * @returns {Promise<Object[]>} - A promise that resolves to an array of review objects
 */
function fetchReviews(appId, options = {}) {
  return new Promise((resolve, reject) => {
    const { count = 100, lang = 'en', country = 'us', fromDate, toDate } = options;
    
    // Build the query parameters
    const params = new URLSearchParams({
      app_id: appId,
      count,
      lang,
      country
    });
    
    if (fromDate) {
      params.append('from_date', fromDate);
    }
    
    if (toDate) {
      params.append('to_date', toDate);
    }
    
    // Build the request URL
    const requestUrl = `http://localhost:5000/api/reviews?${params.toString()}`;
    
    console.log(`Fetching reviews for ${appId}...`);
    
    // Make the request
    http.get(requestUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request failed with status code ${res.statusCode}`));
        return;
      }
      
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          // Parse the CSV data
          const reviews = parse(data, {
            columns: true,
            skip_empty_lines: true
          });
          
          console.log(`Successfully fetched ${reviews.length} reviews`);
          resolve(reviews);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Save reviews to a CSV file
 * 
 * @param {Object[]} reviews - The reviews to save
 * @param {string} filename - The name of the CSV file
 */
function saveToCSV(reviews, filename) {
  if (!reviews || reviews.length === 0) {
    console.log('No reviews to save');
    return;
  }
  
  // Get the column headers from the first review
  const headers = Object.keys(reviews[0]).join(',');
  
  // Convert each review to a CSV row
  const rows = reviews.map(review => {
    return Object.values(review).map(value => {
      // Wrap strings containing commas in quotes
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  });
  
  // Combine headers and rows
  const csvContent = [headers, ...rows].join('\n');
  
  // Write to file
  fs.writeFileSync(filename, csvContent);
  console.log(`Reviews saved to ${filename}`);
}

/**
 * Analyze reviews and print statistics
 * 
 * @param {Object[]} reviews - The reviews to analyze
 */
function analyzeReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    console.log('No reviews to analyze');
    return;
  }
  
  // Calculate basic statistics
  const totalReviews = reviews.length;
  
  // Calculate average rating
  const totalScore = reviews.reduce((sum, review) => sum + parseInt(review.score, 10), 0);
  const averageRating = totalScore / totalReviews;
  
  // Count reviews by rating
  const ratingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  
  reviews.forEach(review => {
    const score = parseInt(review.score, 10);
    ratingCounts[score] = (ratingCounts[score] || 0) + 1;
  });
  
  // Calculate rating percentages
  const ratingPercentages = {};
  Object.keys(ratingCounts).forEach(rating => {
    ratingPercentages[rating] = ((ratingCounts[rating] / totalReviews) * 100).toFixed(2);
  });
  
  // Find the most recent review
  const sortedByDate = [...reviews].sort((a, b) => new Date(b.at) - new Date(a.at));
  const mostRecent = sortedByDate[0];
  
  // Find the most helpful review (most thumbs up)
  const sortedByThumbsUp = [...reviews].sort((a, b) => parseInt(b.thumbsUpCount, 10) - parseInt(a.thumbsUpCount, 10));
  const mostHelpful = sortedByThumbsUp[0];
  
  // Print the analysis
  console.log('\nReview Analysis:');
  console.log(`Total reviews: ${totalReviews}`);
  console.log(`Average rating: ${averageRating.toFixed(2)}/5.0`);
  
  console.log('\nRating distribution:');
  for (let rating = 1; rating <= 5; rating++) {
    const count = ratingCounts[rating] || 0;
    const percentage = ratingPercentages[rating] || '0.00';
    console.log(`  ${rating} stars: ${count} reviews (${percentage}%)`);
  }
  
  console.log('\nMost recent review:');
  console.log(`  "${mostRecent.content}"`);
  console.log(`  Rating: ${mostRecent.score}/5`);
  console.log(`  Date: ${mostRecent.at}`);
  
  console.log('\nMost helpful review:');
  console.log(`  "${mostHelpful.content}"`);
  console.log(`  Rating: ${mostHelpful.score}/5`);
  console.log(`  Thumbs up: ${mostHelpful.thumbsUpCount}`);
}

// Main function
async function main() {
  try {
    // Fetch reviews
    const reviews = await fetchReviews(appId, {
      count,
      lang,
      country,
      fromDate,
      toDate
    });
    
    if (reviews && reviews.length > 0) {
      // Save to CSV
      const csvFilename = path.join(outputDir, `${appId}_reviews.csv`);
      saveToCSV(reviews, csvFilename);
      
      // Analyze reviews
      analyzeReviews(reviews);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
