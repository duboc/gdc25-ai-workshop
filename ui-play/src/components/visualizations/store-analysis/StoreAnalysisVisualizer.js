import React from 'react';
import { Row, Col, Alert, Badge, ProgressBar } from 'react-bootstrap';
import VisualizationCard from '../../common/VisualizationCard';
import { Doughnut, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  BarElement,
  CategoryScale,
  LinearScale,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
  ArcElement, 
  BarElement,
  CategoryScale,
  LinearScale,
  Title, 
  Tooltip, 
  Legend
);

/**
 * StoreAnalysisVisualizer Component
 * 
 * This component visualizes in-app store analysis data with interactive charts.
 * It follows Material UI-inspired design principles and WCAG accessibility guidelines.
 */
const StoreAnalysisVisualizer = ({ data }) => {
  if (!data) {
    return (
      <Alert variant="warning" style={styles.alert}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        No store analysis data available
      </Alert>
    );
  }

  // Helper function to get badge color based on compliance status
  const getComplianceColor = (status) => {
    switch (status.toLowerCase()) {
      case 'yes':
      case 'compliant':
        return 'success';
      case 'no':
      case 'non-compliant':
        return 'danger';
      case 'partial':
      case 'partially compliant':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  // Helper function to get badge background color based on compliance status
  const getComplianceBgColor = (status) => {
    switch (status.toLowerCase()) {
      case 'yes':
      case 'compliant':
        return '#2E7D32'; // Success green
      case 'no':
      case 'non-compliant':
        return '#B00020'; // Error red
      case 'partial':
      case 'partially compliant':
        return '#F57C00'; // Warning orange
      default:
        return '#757575'; // Secondary gray
    }
  };

  // Helper function to get score color based on value
  const getScoreColor = (score) => {
    if (score >= 8) return '#2E7D32'; // Success green
    if (score >= 6) return '#F57C00'; // Warning orange
    return '#B00020'; // Error red
  };

  // Calculate overall compliance percentage
  const calculateCompliancePercentage = () => {
    if (!data.complianceCounts) return 0;
    
    const { yes, partial, no } = data.complianceCounts;
    const total = yes + partial + no;
    
    if (total === 0) return 0;
    
    // Count partial as 0.5
    return Math.round(((yes + (partial * 0.5)) / total) * 100);
  };

  const compliancePercentage = calculateCompliancePercentage();

  // Prepare data for the Best Practices Compliance Doughnut Chart
  const prepareComplianceChartData = () => {
    if (!data.complianceCounts) {
      return {
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['rgba(0, 0, 0, 0.2)'],
          borderColor: ['rgba(0, 0, 0, 0.3)'],
          borderWidth: 1
        }]
      };
    }

    const { yes, partial, no } = data.complianceCounts;
    
    // WCAG-compliant colors
    const colors = {
      yes: {
        bg: 'rgba(46, 125, 50, 0.7)',
        border: '#2E7D32'
      },
      partial: {
        bg: 'rgba(245, 124, 0, 0.7)',
        border: '#F57C00'
      },
      no: {
        bg: 'rgba(176, 0, 32, 0.7)',
        border: '#B00020'
      }
    };

    // Filter out zero values and prepare labels and chart data
    const labels = [];
    const chartData = [];
    const backgroundColors = [];
    const borderColors = [];

    if (yes > 0) {
      labels.push('Meets Best Practices');
      chartData.push(yes);
      backgroundColors.push(colors.yes.bg);
      borderColors.push(colors.yes.border);
    }

    if (partial > 0) {
      labels.push('Partially Meets');
      chartData.push(partial);
      backgroundColors.push(colors.partial.bg);
      borderColors.push(colors.partial.border);
    }

    if (no > 0) {
      labels.push('Does Not Meet');
      chartData.push(no);
      backgroundColors.push(colors.no.bg);
      borderColors.push(colors.no.border);
    }

    return {
      labels,
      datasets: [{
        data: chartData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverOffset: 15
      }]
    };
  };

  // Prepare data for the Criteria Categories Bar Chart
  const prepareCategoriesChartData = () => {
    if (!data.allCriteria || !Array.isArray(data.allCriteria) || data.allCriteria.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Criteria',
          data: [0],
          backgroundColor: 'rgba(98, 0, 238, 0.7)',
          borderColor: '#6200EE',
          borderWidth: 1
        }]
      };
    }

    // Group criteria by category
    const categories = {};
    data.allCriteria.forEach(criterion => {
      const category = getCriterionCategory(criterion.criterion);
      if (!categories[category]) {
        categories[category] = {
          total: 0,
          yes: 0,
          partial: 0,
          no: 0
        };
      }
      
      categories[category].total++;
      
      const status = criterion.meetsBestPractices.toLowerCase();
      if (status === 'yes') categories[category].yes++;
      else if (status === 'partial') categories[category].partial++;
      else if (status === 'no') categories[category].no++;
    });

    // Sort categories by total criteria count
    const sortedCategories = Object.entries(categories)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([name, counts]) => ({
        name,
        ...counts
      }));

    return {
      labels: sortedCategories.map(category => category.name),
      datasets: [
        {
          label: 'Meets Best Practices',
          data: sortedCategories.map(category => category.yes),
          backgroundColor: 'rgba(46, 125, 50, 0.7)',
          borderColor: '#2E7D32',
          borderWidth: 1,
          stack: 'Stack 0'
        },
        {
          label: 'Partially Meets',
          data: sortedCategories.map(category => category.partial),
          backgroundColor: 'rgba(245, 124, 0, 0.7)',
          borderColor: '#F57C00',
          borderWidth: 1,
          stack: 'Stack 0'
        },
        {
          label: 'Does Not Meet',
          data: sortedCategories.map(category => category.no),
          backgroundColor: 'rgba(176, 0, 32, 0.7)',
          borderColor: '#B00020',
          borderWidth: 1,
          stack: 'Stack 0'
        }
      ]
    };
  };

  // Helper function to categorize criteria
  const getCriterionCategory = (criterionName) => {
    const categories = {
      'Promotional': ['Promotional', 'Promo', 'Flag', 'Badge'],
      'Rewards': ['Reward', 'Daily', 'Recurring'],
      'Pricing': ['Price', 'Discount', 'Bulk', 'Purchase', 'SKU', 'Sub-$1'],
      'UI/UX': ['Sort', 'Order', 'Featured', 'Clarity', 'Bundle'],
      'Limited-Time': ['Limited', 'Timer', 'Time']
    };
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => criterionName.includes(keyword))) {
        return category;
      }
    }
    
    return 'Other';
  };

  // Chart options with WCAG-compliant styling
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
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
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} criteria (${percentage}%)`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12
          },
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
        boxPadding: 6
      }
    },
    scales: {
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          }
        }
      },
      x: {
        beginAtZero: true,
        stacked: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          tickColor: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          },
          stepSize: 1
        }
      }
    }
  };

  // Prepare the chart data
  const complianceChartData = prepareComplianceChartData();
  const categoriesChartData = prepareCategoriesChartData();

  // Group criteria by category for display
  const criteriaByCategory = {};
  if (data.allCriteria && Array.isArray(data.allCriteria)) {
    data.allCriteria.forEach(criterion => {
      const category = getCriterionCategory(criterion.criterion);
      if (!criteriaByCategory[category]) {
        criteriaByCategory[category] = [];
      }
      criteriaByCategory[category].push(criterion);
    });
  }

  return (
    <div className="store-analysis-visualizer">
      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Store Analysis Overview"
            elevation={2}
            icon="shop"
            accentColor="linear-gradient(45deg, #6200EE 30%, #03DAC6 90%)"
          >
            <div style={styles.overviewContainer}>
              <div style={styles.complianceHeader}>
                <div style={styles.complianceScoreContainer}>
                  <div style={styles.complianceScoreCircle}>
                    <h2 style={styles.complianceScoreValue}>{compliancePercentage}%</h2>
                    <p style={styles.complianceScoreLabel}>Compliance</p>
                  </div>
                </div>
                
                <div style={styles.complianceStatsContainer}>
                  <h5 style={styles.complianceStatsTitle}>Best Practices Compliance</h5>
                  <div style={styles.progressBarContainer}>
                    <ProgressBar style={styles.progressBar}>
                      <ProgressBar 
                        variant="success" 
                        now={data.complianceCounts?.yes || 0} 
                        max={data.allCriteria?.length || 1} 
                        key={1} 
                        style={styles.progressBarSuccess}
                      />
                      <ProgressBar 
                        variant="warning" 
                        now={data.complianceCounts?.partial || 0} 
                        max={data.allCriteria?.length || 1} 
                        key={2} 
                        style={styles.progressBarWarning}
                      />
                      <ProgressBar 
                        variant="danger" 
                        now={data.complianceCounts?.no || 0} 
                        max={data.allCriteria?.length || 1} 
                        key={3} 
                        style={styles.progressBarDanger}
                      />
                    </ProgressBar>
                  </div>
                  
                  <div style={styles.badgesContainer}>
                    <div style={styles.badgeItem}>
                      <Badge bg="success" style={styles.badge}>Yes</Badge>
                      <span style={styles.badgeText}>{data.complianceCounts?.yes || 0} criteria</span>
                    </div>
                    <div style={styles.badgeItem}>
                      <Badge bg="warning" style={styles.badge}>Partial</Badge>
                      <span style={styles.badgeText}>{data.complianceCounts?.partial || 0} criteria</span>
                    </div>
                    <div style={styles.badgeItem}>
                      <Badge bg="danger" style={styles.badge}>No</Badge>
                      <span style={styles.badgeText}>{data.complianceCounts?.no || 0} criteria</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={styles.summaryContainer}>
                <h5 style={styles.summaryTitle}>Summary</h5>
                <p style={styles.summaryText}>
                  {compliancePercentage >= 80 ? (
                    "The in-app store meets most best practices, providing a good user experience and effective monetization."
                  ) : compliancePercentage >= 50 ? (
                    "The in-app store meets some best practices, but there are areas that need improvement for better monetization."
                  ) : (
                    "The in-app store needs significant improvement to meet best practices for effective monetization."
                  )}
                </p>
                
                {data.suggestedImprovements && data.suggestedImprovements.length > 0 && (
                  <div style={styles.improvementHighlights}>
                    <h6 style={styles.improvementHighlightsTitle}>Key Improvement Areas:</h6>
                    <ul style={styles.improvementHighlightsList}>
                      {data.suggestedImprovements.slice(0, 2).map((item, index) => (
                        <li key={index} style={styles.improvementHighlightsItem}>
                          {item.criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <VisualizationCard
            title="Best Practices Compliance"
            elevation={1}
            icon="check-circle-fill"
            accentColor="linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)"
          >
            <div style={styles.chartContainer}>
              <Doughnut data={complianceChartData} options={doughnutOptions} />
            </div>
          </VisualizationCard>
        </Col>
        <Col md={6}>
          <VisualizationCard
            title="Criteria by Category"
            elevation={1}
            icon="bar-chart-fill"
            accentColor="linear-gradient(45deg, #0277BD 30%, #03DAC6 90%)"
          >
            <div style={styles.chartContainer}>
              <Bar data={categoriesChartData} options={barOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      {Object.entries(criteriaByCategory).map(([category, criteria], categoryIndex) => (
        <Row key={categoryIndex} className="mb-4">
          <Col md={12}>
            <VisualizationCard
              title={`${category} Criteria`}
              elevation={1}
              icon="list-check"
              accentColor={`linear-gradient(45deg, ${getCategoryColor(category)} 30%, ${getLighterColor(getCategoryColor(category))} 90%)`}
            >
              <div style={styles.criteriaContainer}>
                <Row>
                  {criteria.map((criterion, index) => (
                    <Col md={6} key={index} className="mb-3">
                      <div style={styles.criterionCard}>
                        <div style={styles.criterionHeader}>
                          <Badge 
                            bg={getComplianceColor(criterion.meetsBestPractices)} 
                            style={styles.criterionBadge}
                          >
                            {criterion.meetsBestPractices}
                          </Badge>
                          <h5 style={styles.criterionTitle}>{criterion.criterion}</h5>
                        </div>
                        <div style={styles.criterionContent}>
                          <p style={styles.criterionObservations}>{criterion.observations}</p>
                          
                          {criterion.suggestedImprovements && (
                            <div style={styles.improvementSection}>
                              <h6 style={styles.improvementTitle}>
                                <i className="bi bi-lightbulb-fill me-2" style={{ color: getComplianceBgColor(criterion.meetsBestPractices) }}></i>
                                Suggested Improvement
                              </h6>
                              <p style={styles.improvementText}>{criterion.suggestedImprovements}</p>
                            </div>
                          )}
                          
                          {criterion.numericalValue && Object.keys(criterion.numericalValue).length > 0 && (
                            <div style={styles.metricsSection}>
                              <h6 style={styles.metricsTitle}>Metrics:</h6>
                              <ul style={styles.metricsList}>
                                {Object.entries(criterion.numericalValue)
                                  .filter(([key, value]) => key !== 'limitedTimeOffersCount' && value !== null)
                                  .map(([key, value], i) => (
                                    <li key={i} style={styles.metricItem}>
                                      <span style={styles.metricKey}>{formatMetricKey(key)}:</span> 
                                      <span style={styles.metricValue}>
                                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                                      </span>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </VisualizationCard>
          </Col>
        </Row>
      ))}
    </div>
  );
};

// Helper function to format metric keys for display
const formatMetricKey = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/Count$/, ' Count') // Add space before "Count"
    .replace(/Is([A-Z])/, 'Is $1') // Add space after "Is"
    .replace(/Has([A-Z])/, 'Has $1'); // Add space after "Has"
};

// Helper function to get category color
const getCategoryColor = (category) => {
  const categoryColors = {
    'Promotional': '#6200EE', // Purple
    'Rewards': '#0277BD', // Blue
    'Pricing': '#2E7D32', // Green
    'UI/UX': '#F57C00', // Orange
    'Limited-Time': '#B00020', // Red
    'Other': '#757575' // Gray
  };
  
  return categoryColors[category] || '#6200EE';
};

// Helper function to get a lighter version of a color
const getLighterColor = (hexColor) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Lighten by mixing with white
  const lighterR = Math.min(255, r + 80);
  const lighterG = Math.min(255, g + 80);
  const lighterB = Math.min(255, b + 80);
  
  // Convert back to hex
  return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;
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
  complianceHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    alignItems: 'center'
  },
  complianceScoreContainer: {
    flex: '0 0 auto'
  },
  complianceScoreCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '4px solid #6200EE',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  complianceScoreValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#6200EE',
    margin: 0,
    lineHeight: 1.2
  },
  complianceScoreLabel: {
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    marginTop: '4px',
    fontWeight: '500'
  },
  complianceStatsContainer: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  complianceStatsTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0
  },
  progressBarContainer: {
    marginBottom: '12px'
  },
  progressBar: {
    height: '12px',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  progressBarSuccess: {
    backgroundColor: '#2E7D32' // WCAG-compliant green
  },
  progressBarWarning: {
    backgroundColor: '#F57C00' // WCAG-compliant orange
  },
  progressBarDanger: {
    backgroundColor: '#B00020' // WCAG-compliant red
  },
  badgesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px'
  },
  badgeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  badge: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '4px 8px'
  },
  badgeText: {
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.75)',
    fontWeight: '500'
  },
  summaryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  summaryTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: '8px'
  },
  summaryText: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)',
    lineHeight: '1.5',
    margin: 0
  },
  improvementHighlights: {
    marginTop: '16px'
  },
  improvementHighlightsTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: '8px'
  },
  improvementHighlightsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  improvementHighlightsItem: {
    position: 'relative',
    paddingLeft: '24px',
    marginBottom: '8px',
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.75)',
    lineHeight: '1.5',
    '&::before': {
      content: '•',
      position: 'absolute',
      left: '8px',
      color: '#F57C00',
      fontWeight: 'bold'
    }
  },
  chartContainer: {
    height: '350px',
    position: 'relative',
    padding: '16px 8px'
  },
  criteriaContainer: {
    padding: '16px'
  },
  criterionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  criterionHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(0, 0, 0, 0.02)'
  },
  criterionBadge: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '4px 8px',
    marginRight: '12px'
  },
  criterionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    flex: 1
  },
  criterionContent: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  criterionObservations: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)',
    lineHeight: '1.5',
    margin: 0
  },
  improvementSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
    padding: '12px',
    marginTop: 'auto'
  },
  improvementTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: '8px'
  },
  improvementText: {
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.75)',
    lineHeight: '1.5',
    margin: 0
  },
  metricsSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
    padding: '12px'
  },
  metricsTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: '8px'
  },
  metricsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  metricItem: {
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.75)',
    marginBottom: '4px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  metricKey: {
    fontWeight: '500'
  },
  metricValue: {
    fontWeight: '600'
  }
};

export default StoreAnalysisVisualizer;
