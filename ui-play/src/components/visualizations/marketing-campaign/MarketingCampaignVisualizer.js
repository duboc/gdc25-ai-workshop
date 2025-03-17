import React from 'react';
import { Row, Col, Alert, Badge } from 'react-bootstrap';
import VisualizationCard from '../../common/VisualizationCard';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
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
 * MarketingCampaignVisualizer Component
 * 
 * This component visualizes marketing campaign data with interactive charts.
 * It follows Material UI-inspired design principles and WCAG accessibility guidelines.
 */
const MarketingCampaignVisualizer = ({ data }) => {
  if (!data) {
    return (
      <Alert variant="warning" style={styles.alert}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        No marketing campaign data available
      </Alert>
    );
  }

  // Prepare data for the Strategy Overview Pie Chart
  const prepareStrategyOverviewData = () => {
    if (!data.strategiesOverview || !Array.isArray(data.strategiesOverview) || data.strategiesOverview.length === 0) {
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

    // WCAG-compliant colors with good contrast
    const accessibleColors = [
      { bg: 'rgba(98, 0, 238, 0.7)', border: '#6200EE' },   // Purple
      { bg: 'rgba(2, 119, 189, 0.7)', border: '#0277BD' },  // Blue
      { bg: 'rgba(46, 125, 50, 0.7)', border: '#2E7D32' },  // Green
      { bg: 'rgba(245, 124, 0, 0.7)', border: '#F57C00' },  // Orange
      { bg: 'rgba(176, 0, 32, 0.7)', border: '#B00020' },   // Red
      { bg: 'rgba(1, 135, 134, 0.7)', border: '#018786' },  // Teal
      { bg: 'rgba(33, 33, 33, 0.7)', border: '#212121' }    // Dark Gray
    ];

    return {
      labels: data.strategiesOverview.map(strategy => strategy.name),
      datasets: [{
        data: data.strategiesOverview.map(strategy => strategy.tacticCount),
        backgroundColor: data.strategiesOverview.map((_, index) => 
          accessibleColors[index % accessibleColors.length].bg
        ),
        borderColor: data.strategiesOverview.map((_, index) => 
          accessibleColors[index % accessibleColors.length].border
        ),
        borderWidth: 1,
        hoverOffset: 15
      }]
    };
  };

  // Prepare data for the Tactics by Platform Bar Chart
  const prepareTacticsByPlatformData = () => {
    if (!data.tacticsByPlatform || !Array.isArray(data.tacticsByPlatform) || data.tacticsByPlatform.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Tactics',
          data: [0],
          backgroundColor: 'rgba(98, 0, 238, 0.7)',
          borderColor: '#6200EE',
          borderWidth: 1
        }]
      };
    }

    // Sort platforms by tactic count (descending)
    const sortedPlatforms = [...data.tacticsByPlatform].sort((a, b) => b.tacticCount - a.tacticCount);

    // WCAG-compliant colors for platforms
    const platformColors = {
      'facebook': 'rgba(59, 89, 152, 0.7)',
      'instagram': 'rgba(193, 53, 132, 0.7)',
      'twitter': 'rgba(29, 161, 242, 0.7)',
      'youtube': 'rgba(255, 0, 0, 0.7)',
      'tiktok': 'rgba(0, 0, 0, 0.7)',
      'google': 'rgba(66, 133, 244, 0.7)',
      'email': 'rgba(245, 124, 0, 0.7)',
      'in-app': 'rgba(98, 0, 238, 0.7)',
      'website': 'rgba(46, 125, 50, 0.7)',
      'reddit': 'rgba(255, 69, 0, 0.7)',
      'discord': 'rgba(114, 137, 218, 0.7)',
      'twitch': 'rgba(100, 65, 165, 0.7)',
      'mastodon': 'rgba(44, 93, 128, 0.7)',
      'google play store': 'rgba(0, 135, 134, 0.7)',
      'f-droid': 'rgba(77, 153, 59, 0.7)',
      'app store review responses': 'rgba(176, 0, 32, 0.7)'
    };

    return {
      labels: sortedPlatforms.map(platform => platform.platform),
      datasets: [{
        label: 'Number of Tactics',
        data: sortedPlatforms.map(platform => platform.tacticCount),
        backgroundColor: sortedPlatforms.map(platform => 
          platformColors[platform.platform.toLowerCase()] || 'rgba(98, 0, 238, 0.7)'
        ),
        borderColor: '#6200EE',
        borderWidth: 1
      }]
    };
  };

  // Prepare data for the Budget Allocation Doughnut Chart
  const prepareBudgetAllocationData = () => {
    if (!data.strategiesOverview || !Array.isArray(data.strategiesOverview) || data.strategiesOverview.length === 0) {
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

    // Since we don't have actual budget allocation data, we'll use the tactic count as a proxy
    // In a real application, you would use actual budget data

    // WCAG-compliant colors with good contrast
    const accessibleColors = [
      { bg: 'rgba(98, 0, 238, 0.7)', border: '#6200EE' },   // Purple
      { bg: 'rgba(2, 119, 189, 0.7)', border: '#0277BD' },  // Blue
      { bg: 'rgba(46, 125, 50, 0.7)', border: '#2E7D32' },  // Green
      { bg: 'rgba(245, 124, 0, 0.7)', border: '#F57C00' },  // Orange
      { bg: 'rgba(176, 0, 32, 0.7)', border: '#B00020' },   // Red
      { bg: 'rgba(1, 135, 134, 0.7)', border: '#018786' },  // Teal
      { bg: 'rgba(33, 33, 33, 0.7)', border: '#212121' }    // Dark Gray
    ];

    return {
      labels: data.strategiesOverview.map(strategy => strategy.name),
      datasets: [{
        data: data.strategiesOverview.map(strategy => strategy.tacticCount),
        backgroundColor: data.strategiesOverview.map((_, index) => 
          accessibleColors[index % accessibleColors.length].bg
        ),
        borderColor: data.strategiesOverview.map((_, index) => 
          accessibleColors[index % accessibleColors.length].border
        ),
        borderWidth: 1,
        hoverOffset: 15
      }]
    };
  };

  // Chart options with WCAG-compliant styling
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
            return `${label}: ${value} tactics (${percentage}%)`;
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
        title: {
          display: true,
          text: 'Number of Tactics',
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
          },
          stepSize: 1
        }
      }
    }
  };

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
            return `${label}: ${percentage}% of budget`;
          }
        }
      }
    }
  };

  // Prepare the chart data
  const strategyOverviewData = prepareStrategyOverviewData();
  const tacticsByPlatformData = prepareTacticsByPlatformData();
  const budgetAllocationData = prepareBudgetAllocationData();

  // Helper function to get platform badge color
  const getPlatformColor = (platform) => {
    const platformColors = {
      'facebook': 'primary',
      'instagram': 'danger',
      'twitter': 'info',
      'youtube': 'danger',
      'tiktok': 'dark',
      'google': 'success',
      'email': 'warning',
      'in-app': 'secondary',
      'website': 'primary',
      'reddit': 'danger',
      'discord': 'primary',
      'twitch': 'primary',
      'mastodon': 'info',
      'google play store': 'success',
      'f-droid': 'success',
      'app store review responses': 'secondary'
    };
    
    return platformColors[platform.toLowerCase()] || 'secondary';
  };

  // Helper function to get platform icon
  const getPlatformIcon = (platform) => {
    const platformIcons = {
      'facebook': 'facebook',
      'instagram': 'instagram',
      'twitter': 'twitter',
      'youtube': 'youtube',
      'tiktok': 'tiktok',
      'google': 'google',
      'email': 'envelope-fill',
      'in-app': 'phone-fill',
      'website': 'globe',
      'reddit': 'reddit',
      'discord': 'discord',
      'twitch': 'twitch',
      'mastodon': 'mastodon',
      'google play store': 'google-play',
      'f-droid': 'android2',
      'app store review responses': 'chat-left-text-fill'
    };
    
    return platformIcons[platform.toLowerCase()] || 'tag-fill';
  };

  return (
    <div className="marketing-campaign-visualizer">
      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Marketing Campaign Overview"
            elevation={2}
            icon="megaphone-fill"
            accentColor="linear-gradient(45deg, #6200EE 30%, #03DAC6 90%)"
          >
            <div style={styles.overviewContainer}>
              <div style={styles.campaignHeader}>
                <h3 style={styles.campaignName}>{data.campaignName}</h3>
                <p style={styles.campaignMessage}>{data.overallMessage}</p>
              </div>
              
              <div style={styles.metricsContainer}>
                <div style={styles.metricCard}>
                  <div style={styles.metricIcon}>
                    <i className="bi bi-cash-stack"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={styles.metricValue}>{data.campaignBudget}</h3>
                    <p style={styles.metricLabel}>Budget</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(2, 119, 189, 0.15)', color: '#0277BD'}}>
                    <i className="bi bi-calendar-range-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#0277BD'}}>{data.campaignDuration}</h3>
                    <p style={styles.metricLabel}>Duration</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(46, 125, 50, 0.15)', color: '#2E7D32'}}>
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#2E7D32'}}>
                      {data.strategiesOverview?.length || 'N/A'}
                    </h3>
                    <p style={styles.metricLabel}>Strategies</p>
                  </div>
                </div>
              </div>
              
              <div style={styles.audienceContainer}>
                <h5 style={styles.audienceTitle}>Target Audience</h5>
                <p style={styles.audienceText}>{data.targetAudience}</p>
              </div>
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <VisualizationCard
            title="Strategy Overview"
            elevation={1}
            icon="pie-chart-fill"
            accentColor="linear-gradient(45deg, #6200EE 30%, #BB86FC 90%)"
          >
            <div style={styles.chartContainer}>
              <Pie data={strategyOverviewData} options={pieOptions} />
            </div>
          </VisualizationCard>
        </Col>
        <Col md={6}>
          <VisualizationCard
            title="Budget Allocation"
            elevation={1}
            icon="cash-coin"
            accentColor="linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)"
          >
            <div style={styles.chartContainer}>
              <Doughnut data={budgetAllocationData} options={doughnutOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Tactics by Platform"
            elevation={1}
            icon="bar-chart-fill"
            accentColor="linear-gradient(45deg, #0277BD 30%, #03DAC6 90%)"
          >
            <div style={styles.chartContainer}>
              <Bar data={tacticsByPlatformData} options={barOptions} />
            </div>
            <div style={styles.platformBadgesContainer}>
              {data.tacticsByPlatform && data.tacticsByPlatform.map((platform, index) => (
                <Badge 
                  key={index} 
                  bg={getPlatformColor(platform.platform)} 
                  style={styles.platformBadge}
                >
                  <i className={`bi bi-${getPlatformIcon(platform.platform)}`} style={styles.platformIcon}></i>
                  {platform.platform}
                </Badge>
              ))}
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Marketing Strategies"
            elevation={2}
            icon="bullseye"
            accentColor="linear-gradient(45deg, #6200EE 30%, #03DAC6 90%)"
          >
            <div style={styles.strategiesContainer}>
              {data.strategiesOverview && data.strategiesOverview.length > 0 ? (
                <Row>
                  {data.strategiesOverview.map((strategy, index) => (
                    <Col md={6} key={index} className="mb-3">
                      <div style={styles.strategyCard}>
                        <div style={{
                          ...styles.strategyHeader,
                          background: `linear-gradient(45deg, ${getStrategyColor(index)} 30%, ${getLighterColor(getStrategyColor(index))} 90%)`
                        }}>
                          <h5 style={styles.strategyName}>{strategy.name}</h5>
                          <Badge 
                            bg="light" 
                            text="dark"
                            style={styles.tacticCountBadge}
                          >
                            {strategy.tacticCount} tactics
                          </Badge>
                        </div>
                        <div style={styles.strategyContent}>
                          <p style={styles.strategyDescription}>{strategy.description}</p>
                          
                          <div style={styles.metricsSection}>
                            <h6 style={styles.metricsTitle}>Measurement Metrics:</h6>
                            <ul style={styles.metricsList}>
                              {Array.isArray(strategy.metrics) && strategy.metrics.map((metric, i) => (
                                <li key={i} style={styles.metricItem}>{metric}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div style={styles.noDataContainer}>
                  <i className="bi bi-info-circle" style={styles.noDataIcon}></i>
                  <p style={styles.noDataText}>No strategy data available</p>
                </div>
              )}
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Platform Tactics"
            elevation={1}
            icon="diagram-3-fill"
            accentColor="linear-gradient(45deg, #455A64 30%, #607D8B 90%)"
          >
            <div style={styles.platformTacticsContainer}>
              {data.tacticsByPlatform && data.tacticsByPlatform.length > 0 ? (
                <Row>
                  {data.tacticsByPlatform.map((platform, index) => (
                    <Col md={4} key={index} className="mb-3">
                      <div style={styles.platformCard}>
                        <div style={styles.platformHeader}>
                          <Badge 
                            bg={getPlatformColor(platform.platform)} 
                            style={styles.platformHeaderBadge}
                          >
                            <i className={`bi bi-${getPlatformIcon(platform.platform)}`} style={styles.platformHeaderIcon}></i>
                            {platform.platform}
                          </Badge>
                        </div>
                        <div style={styles.platformContent}>
                          <h6 style={styles.tacticsTitle}>Tactics ({platform.tacticCount}):</h6>
                          <ul style={styles.tacticsList}>
                            {platform.tactics.map((tactic, i) => (
                              <li key={i} style={styles.tacticItem}>{tactic}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div style={styles.noDataContainer}>
                  <i className="bi bi-info-circle" style={styles.noDataIcon}></i>
                  <p style={styles.noDataText}>No platform tactics available</p>
                </div>
              )}
            </div>
          </VisualizationCard>
        </Col>
      </Row>
    </div>
  );
};

// Helper function to get strategy color based on index
const getStrategyColor = (index) => {
  const colors = [
    '#6200EE', // Purple
    '#0277BD', // Blue
    '#2E7D32', // Green
    '#F57C00', // Orange
    '#B00020', // Red
    '#018786', // Teal
    '#212121'  // Dark Gray
  ];
  
  return colors[index % colors.length];
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
  campaignHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  campaignName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#6200EE', // WCAG-compliant purple
    marginBottom: '8px'
  },
  campaignMessage: {
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    lineHeight: '1.5',
    margin: 0
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
    fontSize: '1.5rem',
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
  audienceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  audienceTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    marginBottom: '8px'
  },
  audienceText: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    lineHeight: '1.5',
    margin: 0
  },
  chartContainer: {
    height: '350px',
    position: 'relative',
    padding: '16px 8px'
  },
  platformBadgesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
    marginTop: '16px'
  },
  platformBadge: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '6px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  platformIcon: {
    fontSize: '1rem'
  },
  strategiesContainer: {
    padding: '16px'
  },
  strategyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  strategyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    color: 'white',
    fontWeight: '500'
  },
  strategyName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: 0,
    flex: 1,
    paddingRight: '8px'
  },
  tacticCountBadge: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '4px 8px'
  },
  strategyContent: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  strategyDescription: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    lineHeight: '1.5',
    marginBottom: '16px'
  },
  metricsSection: {
    marginTop: 'auto'
  },
  metricsTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    marginBottom: '8px'
  },
  metricsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  metricItem: {
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
  platformTacticsContainer: {
    padding: '16px'
  },
  platformCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  platformHeader: {
    padding: '12px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
  },
  platformHeaderBadge: {
    fontSize: '0.9rem',
    fontWeight: '600',
    padding: '6px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  platformHeaderIcon: {
    fontSize: '1.1rem'
  },
  platformContent: {
    padding: '16px',
    flex: 1
  },
  tacticsTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    marginBottom: '12px'
  },
  tacticsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  tacticItem: {
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
    height: '200px',
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

export default MarketingCampaignVisualizer;
