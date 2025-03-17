import React from 'react';
import { Row, Col, Alert, Badge } from 'react-bootstrap';
import VisualizationCard from '../../common/VisualizationCard';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

/**
 * VersionComparisonVisualizer Component
 * 
 * This component visualizes version comparison data with interactive charts.
 * It follows Material UI-inspired design principles and WCAG accessibility guidelines.
 */
const VersionComparisonVisualizer = ({ data }) => {
  if (!data) {
    return (
      <Alert variant="warning" style={styles.alert}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        No version comparison data available
      </Alert>
    );
  }

  // Prepare data for the Version Sentiment Timeline Chart
  const prepareTimelineData = () => {
    if (!data.timelineData || !Array.isArray(data.timelineData) || data.timelineData.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Sentiment Score',
          data: [0],
          borderColor: '#0277BD', // WCAG-compliant blue
          backgroundColor: 'rgba(2, 119, 189, 0.2)', // WCAG-compliant blue with opacity
          tension: 0.4,
          fill: true
        }]
      };
    }

    // Sort versions chronologically if possible
    const sortedData = [...data.timelineData].sort((a, b) => {
      // Try to parse version numbers for proper sorting
      const versionA = a.version.toString().split('.').map(Number);
      const versionB = b.version.toString().split('.').map(Number);
      
      for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        const numA = versionA[i] || 0;
        const numB = versionB[i] || 0;
        if (numA !== numB) {
          return numA - numB;
        }
      }
      return 0;
    });

    return {
      labels: sortedData.map(item => `v${item.version}`),
      datasets: [{
        label: 'Sentiment Score',
        data: sortedData.map(item => item.sentimentScore),
        borderColor: '#0277BD', // WCAG-compliant blue
        backgroundColor: 'rgba(2, 119, 189, 0.2)', // WCAG-compliant blue with opacity
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#0277BD',
        pointBorderColor: '#FFFFFF',
        pointHoverBackgroundColor: '#0277BD',
        pointHoverBorderColor: '#FFFFFF',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    };
  };

  // Prepare data for the Version Features Comparison Chart
  const prepareFeatureComparisonData = () => {
    if (!data.featureComparison || !Array.isArray(data.featureComparison) || data.featureComparison.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Feature Score',
          data: [0],
          backgroundColor: 'rgba(98, 0, 238, 0.7)', // WCAG-compliant purple
          borderColor: '#6200EE', // WCAG-compliant purple
          borderWidth: 1
        }]
      };
    }

    // Get unique features and versions
    const features = [...new Set(data.featureComparison.map(item => item.feature))];
    const versions = [...new Set(data.featureComparison.map(item => item.version))];
    
    // Sort versions if possible
    versions.sort((a, b) => {
      const versionA = a.toString().split('.').map(Number);
      const versionB = b.toString().split('.').map(Number);
      
      for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        const numA = versionA[i] || 0;
        const numB = versionB[i] || 0;
        if (numA !== numB) {
          return numA - numB;
        }
      }
      return 0;
    });

    // WCAG-compliant colors with good contrast
    const accessibleColors = [
      { bg: 'rgba(98, 0, 238, 0.7)', border: '#6200EE' },   // Purple
      { bg: 'rgba(176, 0, 32, 0.7)', border: '#B00020' },   // Red
      { bg: 'rgba(2, 119, 189, 0.7)', border: '#0277BD' },  // Blue
      { bg: 'rgba(46, 125, 50, 0.7)', border: '#2E7D32' },  // Green
      { bg: 'rgba(245, 124, 0, 0.7)', border: '#F57C00' },  // Orange
      { bg: 'rgba(1, 135, 134, 0.7)', border: '#018786' }   // Teal
    ];

    // Create datasets for each version
    const datasets = versions.map((version, index) => {
      const versionData = data.featureComparison.filter(item => item.version === version);
      
      // Create a map of feature scores for this version
      const featureScores = {};
      versionData.forEach(item => {
        featureScores[item.feature] = item.score;
      });
      
      // Generate data array in the same order as the features array
      const dataPoints = features.map(feature => featureScores[feature] || 0);
      
      // Get color from the accessible colors array
      const colorIndex = index % accessibleColors.length;
      const color = accessibleColors[colorIndex];
      
      return {
        label: `v${version}`,
        data: dataPoints,
        backgroundColor: color.bg,
        borderColor: color.border,
        borderWidth: 1
      };
    });

    return {
      labels: features,
      datasets: datasets
    };
  };

  // Prepare data for the Version Metrics Radar Chart
  const prepareMetricsRadarData = () => {
    if (!data.versionMetrics || !Array.isArray(data.versionMetrics) || data.versionMetrics.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Current Version',
          data: [0],
          backgroundColor: 'rgba(98, 0, 238, 0.2)', // WCAG-compliant purple with opacity
          borderColor: '#6200EE', // WCAG-compliant purple
          pointBackgroundColor: '#6200EE',
          pointBorderColor: '#FFFFFF',
          pointHoverBackgroundColor: '#6200EE',
          pointHoverBorderColor: '#FFFFFF'
        }]
      };
    }

    // Find the latest version and previous version
    const versions = [...new Set(data.versionMetrics.map(item => item.version))];
    versions.sort((a, b) => {
      const versionA = a.toString().split('.').map(Number);
      const versionB = b.toString().split('.').map(Number);
      
      for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        const numA = versionA[i] || 0;
        const numB = versionB[i] || 0;
        if (numA !== numB) {
          return numA - numB;
        }
      }
      return 0;
    });

    const latestVersion = versions[versions.length - 1];
    const previousVersion = versions.length > 1 ? versions[versions.length - 2] : null;

    // Get metrics for the latest version
    const latestVersionMetrics = data.versionMetrics.filter(item => item.version === latestVersion);
    
    // Get metrics for the previous version if available
    const previousVersionMetrics = previousVersion 
      ? data.versionMetrics.filter(item => item.version === previousVersion)
      : null;

    // Get unique metric names
    const metricNames = [...new Set(latestVersionMetrics.map(item => item.metricName))];

    // Create datasets
    const datasets = [];
    
    // Add latest version dataset
    datasets.push({
      label: `v${latestVersion}`,
      data: metricNames.map(name => {
        const metric = latestVersionMetrics.find(item => item.metricName === name);
        return metric ? metric.value : 0;
      }),
      backgroundColor: 'rgba(98, 0, 238, 0.2)', // WCAG-compliant purple with opacity
      borderColor: '#6200EE', // WCAG-compliant purple
      pointBackgroundColor: '#6200EE',
      pointBorderColor: '#FFFFFF',
      pointHoverBackgroundColor: '#6200EE',
      pointHoverBorderColor: '#FFFFFF'
    });

    // Add previous version dataset if available
    if (previousVersionMetrics) {
      datasets.push({
        label: `v${previousVersion}`,
        data: metricNames.map(name => {
          const metric = previousVersionMetrics.find(item => item.metricName === name);
          return metric ? metric.value : 0;
        }),
        backgroundColor: 'rgba(176, 0, 32, 0.2)', // WCAG-compliant red with opacity
        borderColor: '#B00020', // WCAG-compliant red
        pointBackgroundColor: '#B00020',
        pointBorderColor: '#FFFFFF',
        pointHoverBackgroundColor: '#B00020',
        pointHoverBorderColor: '#FFFFFF'
      });
    }

    return {
      labels: metricNames,
      datasets: datasets
    };
  };

  // Chart options with WCAG-compliant styling
  const timelineOptions = {
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
        boxPadding: 6,
        callbacks: {
          label: (context) => {
            const version = context.label;
            const score = context.raw;
            return `${version}: ${score.toFixed(2)} sentiment score`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sentiment Score',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12,
            weight: '500'
          }
        },
        max: 10,
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

  const featureComparisonOptions = {
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
          text: 'Feature Score',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12,
            weight: '500'
          }
        },
        max: 10,
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
        },
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  // Prepare the chart data
  const timelineData = prepareTimelineData();
  const featureComparisonData = prepareFeatureComparisonData();
  const metricsRadarData = prepareMetricsRadarData();

  // Helper function to get sentiment badge color
  const getSentimentColor = (sentiment) => {
    if (!sentiment) return 'secondary';
    
    const sentimentLower = sentiment.toLowerCase();
    if (sentimentLower.includes('positive')) return 'success';
    if (sentimentLower.includes('negative')) return 'danger';
    if (sentimentLower.includes('neutral')) return 'warning';
    return 'secondary';
  };

  // Calculate average sentiment score
  const calculateAverageSentiment = () => {
    if (!data.timelineData || !Array.isArray(data.timelineData) || data.timelineData.length === 0) {
      return 'N/A';
    }
    
    const sum = data.timelineData.reduce((acc, item) => acc + (item.sentimentScore || 0), 0);
    return (sum / data.timelineData.length).toFixed(2);
  };

  return (
    <div className="version-comparison-visualizer">
      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Version Comparison Overview"
            elevation={2}
            icon="graph-up"
            accentColor="linear-gradient(45deg, #0277BD 30%, #6200EE 90%)"
          >
            <div style={styles.overviewContainer}>
              <div style={styles.metricsContainer}>
                <div style={styles.metricCard}>
                  <div style={styles.metricIcon}>
                    <i className="bi bi-layers-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={styles.metricValue}>{data.timelineData?.length || 'N/A'}</h3>
                    <p style={styles.metricLabel}>Versions Analyzed</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(2, 119, 189, 0.15)', color: '#0277BD'}}>
                    <i className="bi bi-emoji-smile-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#0277BD'}}>{calculateAverageSentiment()}</h3>
                    <p style={styles.metricLabel}>Average Sentiment Score</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(46, 125, 50, 0.15)', color: '#2E7D32'}}>
                    <i className="bi bi-trophy-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#2E7D32'}}>{data.bestSentiment?.app_version || 'N/A'}</h3>
                    <p style={styles.metricLabel}>Best Version</p>
                  </div>
                </div>
              </div>
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Version Sentiment Timeline"
            elevation={1}
            icon="bar-chart-line-fill"
            accentColor="linear-gradient(45deg, #0277BD 30%, #03DAC6 90%)"
          >
            <div style={styles.chartContainer}>
              <Line data={timelineData} options={timelineOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <VisualizationCard
            title="Best Version"
            elevation={1}
            icon="emoji-smile-fill"
            accentColor="linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)"
          >
            {data.bestSentiment ? (
              <div style={styles.versionDetailContainer}>
                <div style={styles.versionHeader}>
                  <h5 style={styles.versionTitle}>Version {data.bestSentiment.app_version}</h5>
                  <Badge 
                    bg={getSentimentColor(data.bestSentiment.sentiment)}
                    style={styles.sentimentBadge}
                  >
                    {data.bestSentiment.positive_sentiment_score?.toFixed(2) || 'N/A'} / 10
                  </Badge>
                </div>
                <p style={styles.versionSummary}>{data.bestSentiment.sentiment_summary}</p>
                
                {data.bestSentiment.key_improvements && (
                  <div style={styles.keyPointsSection}>
                    <h6 style={styles.keyPointsTitle}>Key Improvements:</h6>
                    <ul style={styles.keyPointsList}>
                      {Array.isArray(data.bestSentiment.key_improvements) 
                        ? data.bestSentiment.key_improvements.map((item, i) => (
                            <li key={i} style={styles.keyPointItem}>{item}</li>
                          ))
                        : <li style={styles.keyPointItem}>{data.bestSentiment.key_improvements}</li>
                      }
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.noDataContainer}>
                <i className="bi bi-info-circle" style={styles.noDataIcon}></i>
                <p style={styles.noDataText}>No best version data available</p>
              </div>
            )}
          </VisualizationCard>
        </Col>
        <Col md={6}>
          <VisualizationCard
            title="Worst Version"
            elevation={1}
            icon="emoji-frown-fill"
            accentColor="linear-gradient(45deg, #B00020 30%, #F44336 90%)"
          >
            {data.worstSentiment && data.worstSentiment.app_version ? (
              <div style={styles.versionDetailContainer}>
                <div style={styles.versionHeader}>
                  <h5 style={styles.versionTitle}>Version {data.worstSentiment.app_version}</h5>
                  <Badge 
                    bg={getSentimentColor(data.worstSentiment.sentiment)}
                    style={styles.sentimentBadge}
                  >
                    {data.worstSentiment.positive_sentiment_score?.toFixed(2) || 'N/A'} / 10
                  </Badge>
                </div>
                <p style={styles.versionSummary}>{data.worstSentiment.sentiment_summary}</p>
                
                {data.worstSentiment.key_issues && (
                  <div style={styles.keyPointsSection}>
                    <h6 style={styles.keyPointsTitle}>Key Issues:</h6>
                    <ul style={styles.keyPointsList}>
                      {Array.isArray(data.worstSentiment.key_issues) 
                        ? data.worstSentiment.key_issues.map((item, i) => (
                            <li key={i} style={styles.keyPointItem}>{item}</li>
                          ))
                        : <li style={styles.keyPointItem}>{data.worstSentiment.key_issues}</li>
                      }
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.noDataContainer}>
                <i className="bi bi-info-circle" style={styles.noDataIcon}></i>
                <p style={styles.noDataText}>No worst version data available or all versions have positive sentiment</p>
              </div>
            )}
          </VisualizationCard>
        </Col>
      </Row>

      {data.featureComparison && data.featureComparison.length > 0 && (
        <Row>
          <Col md={12}>
            <VisualizationCard
              title="Feature Comparison"
              elevation={1}
              icon="bar-chart-fill"
              accentColor="linear-gradient(45deg, #6200EE 30%, #BB86FC 90%)"
            >
              <div style={styles.chartContainer}>
                <Bar data={featureComparisonData} options={featureComparisonOptions} />
              </div>
            </VisualizationCard>
          </Col>
        </Row>
      )}

      {data.versionMetrics && data.versionMetrics.length > 0 && (
        <Row>
          <Col md={12}>
            <VisualizationCard
              title="Version Metrics Comparison"
              elevation={1}
              icon="diagram-3-fill"
              accentColor="linear-gradient(45deg, #018786 30%, #03DAC6 90%)"
            >
              <div style={styles.chartContainer}>
                <Radar data={metricsRadarData} options={radarOptions} />
              </div>
            </VisualizationCard>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Version Details"
            elevation={2}
            icon="list-ul"
            accentColor="linear-gradient(45deg, #455A64 30%, #607D8B 90%)"
          >
            <div className="table-responsive" style={styles.tableContainer}>
              <table className="table" style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Version</th>
                    <th style={styles.tableHeader}>Sentiment Score</th>
                    <th style={styles.tableHeader}>Sentiment</th>
                    <th style={styles.tableHeader}>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {data.timelineData && data.timelineData.map((item, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>{item.version}</td>
                      <td style={styles.tableCell}>{item.sentimentScore?.toFixed(2) || 'N/A'}</td>
                      <td style={styles.tableCell}>
                        <Badge 
                          bg={getSentimentColor(item.sentiment)}
                          style={styles.tableBadge}
                        >
                          {item.sentiment || 'Unknown'}
                        </Badge>
                      </td>
                      <td style={styles.tableCell}>{item.summary || 'No summary available'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
  chartContainer: {
    height: '350px',
    position: 'relative',
    padding: '16px 8px'
  },
  versionDetailContainer: {
    padding: '16px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  versionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  versionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    margin: 0
  },
  sentimentBadge: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '6px 10px'
  },
  versionSummary: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    lineHeight: '1.5',
    marginBottom: '16px'
  },
  keyPointsSection: {
    marginTop: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  keyPointsTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    marginBottom: '12px'
  },
  keyPointsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  keyPointItem: {
    position: 'relative',
    paddingLeft: '24px',
    marginBottom: '8px',
    fontSize: '0.9rem',
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
  },
  tableContainer: {
    padding: '8px'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  },
  tableHeader: {
    padding: '12px 16px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    textAlign: 'left'
  },
  tableRow: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    '&:last-child': {
      borderBottom: 'none'
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.02)'
    }
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    verticalAlign: 'middle'
  },
  tableBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '4px 8px'
  }
};

export default VersionComparisonVisualizer;
