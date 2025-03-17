import React from 'react';
import { Row, Col, Alert, Badge } from 'react-bootstrap';
import VisualizationCard from '../../common/VisualizationCard';
import { Bar, Pie, Radar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
  ArcElement, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

/**
 * ReviewQualityVisualizer Component
 * 
 * This component visualizes review quality data with interactive charts.
 * It follows Material UI-inspired design principles and WCAG accessibility guidelines.
 */
const ReviewQualityVisualizer = ({ data }) => {
  if (!data) {
    return (
      <Alert variant="warning" style={styles.alert}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        No review quality data available
      </Alert>
    );
  }

  // Prepare data for the Rating Distribution Chart
  const prepareRatingDistributionData = () => {
    if (!data.ratingDistribution || !Array.isArray(data.ratingDistribution) || data.ratingDistribution.length === 0) {
      return {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [{
          label: 'Ratings',
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(176, 0, 32, 0.8)',    // WCAG-compliant red
            'rgba(245, 124, 0, 0.8)',   // WCAG-compliant orange
            'rgba(251, 192, 45, 0.8)',  // WCAG-compliant yellow
            'rgba(46, 125, 50, 0.8)',   // WCAG-compliant green
            'rgba(2, 119, 189, 0.8)'    // WCAG-compliant blue
          ],
          borderColor: [
            '#B00020',  // WCAG-compliant red
            '#F57C00',  // WCAG-compliant orange
            '#FBC02D',  // WCAG-compliant yellow
            '#2E7D32',  // WCAG-compliant green
            '#0277BD'   // WCAG-compliant blue
          ],
          borderWidth: 1
        }]
      };
    }

    // Extract ratings from the data
    const ratings = {};
    data.ratingDistribution.forEach(item => {
      const rating = item.rating.replace('_star', '');
      ratings[rating] = item.count;
    });

    return {
      labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
      datasets: [{
        label: 'Ratings',
        data: [
          ratings['1'] || 0,
          ratings['2'] || 0,
          ratings['3'] || 0,
          ratings['4'] || 0,
          ratings['5'] || 0
        ],
        backgroundColor: [
          'rgba(176, 0, 32, 0.8)',    // WCAG-compliant red
          'rgba(245, 124, 0, 0.8)',   // WCAG-compliant orange
          'rgba(251, 192, 45, 0.8)',  // WCAG-compliant yellow
          'rgba(46, 125, 50, 0.8)',   // WCAG-compliant green
          'rgba(2, 119, 189, 0.8)'    // WCAG-compliant blue
        ],
        borderColor: [
          '#B00020',  // WCAG-compliant red
          '#F57C00',  // WCAG-compliant orange
          '#FBC02D',  // WCAG-compliant yellow
          '#2E7D32',  // WCAG-compliant green
          '#0277BD'   // WCAG-compliant blue
        ],
        borderWidth: 1
      }]
    };
  };

  // Prepare data for the Review Length Distribution Chart
  const prepareReviewLengthData = () => {
    if (!data.reviewLengthDistribution || !Array.isArray(data.reviewLengthDistribution) || data.reviewLengthDistribution.length === 0) {
      return {
        labels: ['Very Short', 'Short', 'Medium', 'Long', 'Very Long'],
        datasets: [{
          label: 'Review Length',
          data: [0, 0, 0, 0, 0],
          backgroundColor: 'rgba(1, 135, 134, 0.8)', // WCAG-compliant teal
          borderColor: '#018786', // WCAG-compliant teal
          borderWidth: 1
        }]
      };
    }

    // Sort categories in a logical order
    const categoryOrder = ['very_short', 'short', 'medium', 'long', 'very_long'];
    const sortedData = [...data.reviewLengthDistribution].sort((a, b) => {
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });

    // Create readable labels
    const labels = sortedData.map(item => {
      const category = item.category.replace(/_/g, ' ');
      return category.charAt(0).toUpperCase() + category.slice(1);
    });

    return {
      labels: labels,
      datasets: [{
        label: 'Review Length',
        data: sortedData.map(item => item.count),
        backgroundColor: 'rgba(1, 135, 134, 0.8)', // WCAG-compliant teal
        borderColor: '#018786', // WCAG-compliant teal
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(1, 135, 134, 1)',
        hoverBorderColor: '#018786'
      }]
    };
  };

  // Prepare data for the Keyword Frequency Chart
  const prepareKeywordFrequencyData = () => {
    if (!data.keywordFrequency || !Array.isArray(data.keywordFrequency) || data.keywordFrequency.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Frequency',
          data: [0],
          backgroundColor: 'rgba(98, 0, 238, 0.7)', // WCAG-compliant purple
          borderColor: '#6200EE', // WCAG-compliant purple
          borderWidth: 1
        }]
      };
    }

    // Sort keywords by frequency in descending order and take top 10
    const sortedKeywords = [...data.keywordFrequency]
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      labels: sortedKeywords.map(item => item.word || item.keyword),
      datasets: [{
        label: 'Frequency',
        data: sortedKeywords.map(item => item.count),
        backgroundColor: 'rgba(98, 0, 238, 0.7)', // WCAG-compliant purple
        borderColor: '#6200EE', // WCAG-compliant purple
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(98, 0, 238, 0.9)',
        hoverBorderColor: '#3700B3'
      }]
    };
  };

  // Prepare data for the Suspicious Patterns Radar Chart
  const prepareSuspiciousPatternData = () => {
    if (!data.suspiciousPatterns || Object.keys(data.suspiciousPatterns).length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Suspicious Patterns',
          data: [0],
          backgroundColor: 'rgba(176, 0, 32, 0.2)', // WCAG-compliant red with opacity
          borderColor: '#B00020', // WCAG-compliant red
          pointBackgroundColor: '#B00020',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#B00020'
        }]
      };
    }

    // Convert suspicious patterns object to array of pattern names and counts
    const patternNames = [];
    const patternCounts = [];

    // Handle different data structures
    if (Array.isArray(data.suspiciousPatterns)) {
      // If it's an array of objects with name and count properties
      data.suspiciousPatterns.forEach(pattern => {
        patternNames.push(pattern.name || pattern.type);
        patternCounts.push(pattern.count || pattern.value);
      });
    } else {
      // If it's an object with pattern names as keys
      Object.entries(data.suspiciousPatterns).forEach(([key, value]) => {
        // Format the key for better readability
        const formattedKey = key
          .replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        patternNames.push(formattedKey);
        
        // Handle different value types
        if (typeof value === 'object' && value !== null) {
          patternCounts.push(value.count || value.value || 0);
        } else {
          patternCounts.push(value || 0);
        }
      });
    }

    return {
      labels: patternNames,
      datasets: [{
        label: 'Suspicious Patterns',
        data: patternCounts,
        backgroundColor: 'rgba(176, 0, 32, 0.2)', // WCAG-compliant red with opacity
        borderColor: '#B00020', // WCAG-compliant red
        pointBackgroundColor: '#B00020',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#B00020'
      }]
    };
  };

  // Prepare data for the Spam vs. Authentic Doughnut Chart
  const prepareSpamAuthenticData = () => {
    // Calculate spam vs authentic percentages from overall quality metrics
    const authenticPercentage = data.overallQualityMetrics?.authenticity_score * 100 || 0;
    const spamPercentage = data.overallQualityMetrics?.spam_percentage * 100 || 0;
    const suspiciousPercentage = 100 - authenticPercentage - spamPercentage;

    return {
      labels: ['Authentic', 'Suspicious', 'Spam'],
      datasets: [{
        data: [
          authenticPercentage,
          suspiciousPercentage,
          spamPercentage
        ],
        backgroundColor: [
          'rgba(46, 125, 50, 0.8)',   // WCAG-compliant green
          'rgba(245, 124, 0, 0.8)',   // WCAG-compliant orange
          'rgba(176, 0, 32, 0.8)'     // WCAG-compliant red
        ],
        borderColor: [
          '#2E7D32',  // WCAG-compliant green
          '#F57C00',  // WCAG-compliant orange
          '#B00020'   // WCAG-compliant red
        ],
        borderWidth: 1
      }]
    };
  };

  // Chart options with WCAG-compliant styling
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        bodyFont: {
          family: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Reviews',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12,
            weight: '500'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          tickColor: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          }
        }
      }
    }
  };

  const keywordOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        bodyFont: {
          family: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12,
            weight: '500'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          tickColor: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          }
        }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        bodyFont: {
          family: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        pointLabels: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12
          }
        },
        ticks: {
          backdropColor: 'transparent',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        bodyFont: {
          family: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      }
    }
  };

  // Prepare the chart data
  const ratingDistributionData = prepareRatingDistributionData();
  const reviewLengthData = prepareReviewLengthData();
  const keywordFrequencyData = prepareKeywordFrequencyData();
  const suspiciousPatternData = prepareSuspiciousPatternData();
  const spamAuthenticData = prepareSpamAuthenticData();

  // Extract key metrics
  const authenticPercentage = data.overallQualityMetrics?.authenticity_score * 100 || 0;
  const spamPercentage = data.overallQualityMetrics?.spam_percentage * 100 || 0;
  const suspiciousPercentage = 100 - authenticPercentage - spamPercentage;
  const averageQualityScore = data.overallQualityMetrics?.average_quality_score * 100 || 0;

  return (
    <div className="review-quality-visualizer">
      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Review Quality Overview"
            elevation={2}
            icon="shield-check"
            accentColor="linear-gradient(45deg, #6200EE 30%, #03DAC6 90%)"
          >
            <div style={styles.overviewContainer}>
              <div style={styles.metricsContainer}>
                <div style={styles.metricCard}>
                  <div style={styles.metricIcon}>
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={styles.metricValue}>{authenticPercentage.toFixed(1)}%</h3>
                    <p style={styles.metricLabel}>Authentic Reviews</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(245, 124, 0, 0.15)', color: '#F57C00'}}>
                    <i className="bi bi-exclamation-circle-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#F57C00'}}>{suspiciousPercentage.toFixed(1)}%</h3>
                    <p style={styles.metricLabel}>Suspicious Reviews</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(176, 0, 32, 0.15)', color: '#B00020'}}>
                    <i className="bi bi-x-circle-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#B00020'}}>{spamPercentage.toFixed(1)}%</h3>
                    <p style={styles.metricLabel}>Spam Reviews</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(2, 119, 189, 0.15)', color: '#0277BD'}}>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#0277BD'}}>{averageQualityScore.toFixed(1)}%</h3>
                    <p style={styles.metricLabel}>Quality Score</p>
                  </div>
                </div>
              </div>
              
              {data.overallQualityMetrics?.key_findings && (
                <div style={styles.findingsSection}>
                  <h5 style={styles.sectionTitle}>Key Findings</h5>
                  <ul style={styles.findingsList}>
                    {data.overallQualityMetrics.key_findings.map((finding, index) => (
                      <li key={index} style={styles.findingItem}>{finding}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <VisualizationCard
            title="Rating Distribution"
            elevation={1}
            icon="bar-chart-fill"
            accentColor="linear-gradient(45deg, #0277BD 30%, #03DAC6 90%)"
          >
            <div style={styles.chartContainer}>
              <Bar data={ratingDistributionData} options={barOptions} />
            </div>
          </VisualizationCard>
        </Col>
        <Col md={6}>
          <VisualizationCard
            title="Review Length Distribution"
            elevation={1}
            icon="rulers"
            accentColor="linear-gradient(45deg, #018786 30%, #03DAC6 90%)"
          >
            <div style={styles.chartContainer}>
              <Bar data={reviewLengthData} options={barOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <VisualizationCard
            title="Keyword Frequency"
            elevation={1}
            icon="chat-square-text-fill"
            accentColor="linear-gradient(45deg, #6200EE 30%, #BB86FC 90%)"
          >
            <div style={styles.chartContainer}>
              <Bar data={keywordFrequencyData} options={keywordOptions} />
            </div>
          </VisualizationCard>
        </Col>
        <Col md={6}>
          <VisualizationCard
            title="Review Authenticity"
            elevation={1}
            icon="pie-chart-fill"
            accentColor="linear-gradient(45deg, #2E7D32 30%, #F57C00 90%)"
          >
            <div style={styles.chartContainer}>
              <Doughnut data={spamAuthenticData} options={doughnutOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Suspicious Patterns"
            elevation={2}
            icon="shield-exclamation"
            accentColor="linear-gradient(45deg, #B00020 30%, #F57C00 90%)"
          >
            <Row>
              <Col md={6}>
                <div style={styles.chartContainer}>
                  <Radar data={suspiciousPatternData} options={radarOptions} />
                </div>
              </Col>
              <Col md={6}>
                <div style={styles.recommendationsContainer}>
                  <h5 style={styles.sectionTitle}>Recommendations</h5>
                  
                  {data.recommendations?.spam_detection && data.recommendations.spam_detection.length > 0 ? (
                    <div style={styles.recommendationsList}>
                      {data.recommendations.spam_detection.map((recommendation, index) => (
                        <div key={index} style={styles.recommendationItem}>
                          <div style={styles.recommendationHeader}>
                            <h6 style={styles.recommendationTitle}>
                              {recommendation.issue}
                            </h6>
                            <Badge 
                              bg={recommendation.priority === 'high' ? 'danger' : 
                                 recommendation.priority === 'medium' ? 'warning' : 'info'}
                              style={styles.priorityBadge}
                            >
                              {recommendation.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p style={styles.recommendationText}>
                            {recommendation.suggestion}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={styles.noDataContainer}>
                      <i className="bi bi-info-circle" style={styles.noDataIcon}></i>
                      <p style={styles.noDataText}>No recommendations available</p>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </VisualizationCard>
        </Col>
      </Row>
    </div>
  );
};

// Material UI-inspired styles with WCAG contrast compliance
const styles = {
  alert: {
    backgroundColor: 'rgba(245, 124, 0, 0.1)', // Warning orange background
    color: '#E65100', // Darker orange for text - meets WCAG AA
    borderColor: 'rgba(245, 124, 0, 0.2)',
    borderRadius: '8px',
    padding: '16px 20px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500' // Slightly bolder for better readability
  },
  overviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  metricsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'space-between'
  },
  metricCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    flex: '1 1 200px',
    minWidth: '200px'
  },
  metricIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(98, 0, 238, 0.15)', // Primary purple background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    fontSize: '24px',
    color: '#6200EE' // WCAG-compliant purple
  },
  metricContent: {
    flex: 1
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: '700',
    margin: 0,
    color: '#6200EE', // WCAG-compliant purple
    lineHeight: 1.2
  },
  metricLabel: {
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    margin: 0,
    marginTop: '4px',
    fontWeight: '500' // Medium weight for better readability
  },
  findingsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600', // Bolder for better contrast
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)' // Slightly darker border
  },
  findingsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  findingItem: {
    position: 'relative',
    paddingLeft: '24px',
    marginBottom: '8px',
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    lineHeight: '1.5',
    '&::before': {
      content: '•',
      position: 'absolute',
      left: '8px',
      color: '#6200EE', // WCAG-compliant purple
      fontWeight: 'bold'
    }
  },
  chartContainer: {
    height: '350px',
    position: 'relative',
    padding: '16px 8px'
  },
  recommendationsContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px'
  },
  recommendationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '8px'
  },
  recommendationItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  recommendationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  recommendationTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0
  },
  priorityBadge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '4px 8px'
  },
  recommendationText: {
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.75)',
    margin: 0,
    lineHeight: '1.5'
  },
  noDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '40px 0',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  noDataIcon: {
    fontSize: '48px',
    color: 'rgba(0, 0, 0, 0.3)',
    marginBottom: '16px'
  },
  noDataText: {
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.7)',
    fontStyle: 'italic',
    fontWeight: '500'
  }
};

export default ReviewQualityVisualizer;
