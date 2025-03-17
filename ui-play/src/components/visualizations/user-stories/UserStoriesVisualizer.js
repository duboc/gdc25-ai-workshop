import React from 'react';
import { Row, Col, Alert, Badge } from 'react-bootstrap';
import VisualizationCard from '../../common/VisualizationCard';
import { Pie, Scatter, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  PointElement,
  LineElement,
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
  PointElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title, 
  Tooltip, 
  Legend
);

/**
 * UserStoriesVisualizer Component
 * 
 * This component visualizes user stories data with interactive charts.
 * It follows Material UI-inspired design principles and WCAG accessibility guidelines.
 */
const UserStoriesVisualizer = ({ data }) => {
  if (!data) {
    return (
      <Alert variant="warning" style={styles.alert}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        No user stories data available
      </Alert>
    );
  }

  // Prepare data for the Theme Breakdown Pie Chart
  const prepareThemeBreakdownData = () => {
    if (!data.themeBreakdown || !Array.isArray(data.themeBreakdown) || data.themeBreakdown.length === 0) {
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
      labels: data.themeBreakdown.map(theme => theme.name),
      datasets: [{
        data: data.themeBreakdown.map(theme => theme.storyCount),
        backgroundColor: data.themeBreakdown.map((_, index) => 
          accessibleColors[index % accessibleColors.length].bg
        ),
        borderColor: data.themeBreakdown.map((_, index) => 
          accessibleColors[index % accessibleColors.length].border
        ),
        borderWidth: 1,
        hoverOffset: 15
      }]
    };
  };

  // Prepare data for the Story Points by Theme Bar Chart
  const prepareStoryPointsData = () => {
    if (!data.themeBreakdown || !Array.isArray(data.themeBreakdown) || data.themeBreakdown.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Story Points',
          data: [0],
          backgroundColor: 'rgba(98, 0, 238, 0.7)',
          borderColor: '#6200EE',
          borderWidth: 1
        }]
      };
    }

    return {
      labels: data.themeBreakdown.map(theme => theme.name),
      datasets: [{
        label: 'Story Points',
        data: data.themeBreakdown.map(theme => theme.totalPoints),
        backgroundColor: 'rgba(98, 0, 238, 0.7)',
        borderColor: '#6200EE',
        borderWidth: 1
      }]
    };
  };

  // Prepare data for the Priority Matrix Scatter Chart
  const preparePriorityMatrixData = () => {
    if (!data.stories || !Array.isArray(data.stories) || data.stories.length === 0) {
      return {
        datasets: [{
          label: 'No Data',
          data: [{x: 0, y: 0}],
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(0, 0, 0, 0.3)',
          borderWidth: 1,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      };
    }

    // Map priority to numeric values
    const priorityMap = {
      'High': 3,
      'Medium': 2,
      'Low': 1
    };

    // Group stories by theme
    const themeGroups = data.stories.reduce((acc, story) => {
      if (!acc[story.theme]) {
        acc[story.theme] = [];
      }
      acc[story.theme].push(story);
      return acc;
    }, {});

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

    // Create datasets for each theme
    const datasets = Object.entries(themeGroups).map(([theme, stories], index) => {
      const colorIndex = index % accessibleColors.length;
      const color = accessibleColors[colorIndex];

      return {
        label: theme,
        data: stories.map(story => ({
          x: priorityMap[story.priority] || 0,
          y: story.storyPoints,
          story: story
        })),
        backgroundColor: color.bg,
        borderColor: color.border,
        borderWidth: 1,
        pointRadius: 8,
        pointHoverRadius: 10
      };
    });

    return {
      datasets
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
            return `${label}: ${value} stories (${percentage}%)`;
          }
        }
      }
    }
  };

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
          text: 'Story Points',
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

  const scatterOptions = {
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
          title: () => '',
          label: (context) => {
            const story = context.raw.story;
            return [
              `Theme: ${story.theme}`,
              `Priority: ${story.priority}`,
              `Story Points: ${story.storyPoints}`,
              `As a: ${story.asA}`,
              `I want: ${story.iWant.substring(0, 50)}${story.iWant.length > 50 ? '...' : ''}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Story Points',
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
        min: 0.5,
        max: 3.5,
        title: {
          display: true,
          text: 'Priority',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12,
            weight: '500'
          }
        },
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          },
          callback: function(value) {
            if (value === 1) return 'Low';
            if (value === 2) return 'Medium';
            if (value === 3) return 'High';
            return '';
          }
        }
      }
    }
  };

  // Prepare the chart data
  const themeBreakdownData = prepareThemeBreakdownData();
  const storyPointsData = prepareStoryPointsData();
  const priorityMatrixData = preparePriorityMatrixData();

  // Helper function to get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  };

  // Helper function to get theme color
  const getThemeColor = (theme) => {
    const themeColors = {
      'Gameplay': 'linear-gradient(45deg, #6200EE 30%, #BB86FC 90%)',
      'Ads': 'linear-gradient(45deg, #0277BD 30%, #03DAC6 90%)',
      'Technical Issues': 'linear-gradient(45deg, #B00020 30%, #F44336 90%)',
      'Game Improvements': 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
      'General Praise': 'linear-gradient(45deg, #F57C00 30%, #FFC107 90%)',
      'Graphics': 'linear-gradient(45deg, #018786 30%, #03DAC6 90%)',
      'UX': 'linear-gradient(45deg, #455A64 30%, #607D8B 90%)'
    };
    
    return themeColors[theme] || 'linear-gradient(45deg, #455A64 30%, #607D8B 90%)';
  };

  // Helper function to get theme icon
  const getThemeIcon = (theme) => {
    const themeIcons = {
      'Gameplay': 'controller',
      'Ads': 'badge-ad',
      'Technical Issues': 'bug',
      'Game Improvements': 'tools',
      'General Praise': 'star',
      'Graphics': 'palette',
      'UX': 'person-workspace'
    };
    
    return themeIcons[theme] || 'tag';
  };

  return (
    <div className="user-stories-visualizer">
      <Row>
        <Col md={12}>
          <VisualizationCard
            title="User Stories Overview"
            elevation={2}
            icon="book"
            accentColor="linear-gradient(45deg, #6200EE 30%, #03DAC6 90%)"
          >
            <div style={styles.overviewContainer}>
              <div style={styles.metricsContainer}>
                <div style={styles.metricCard}>
                  <div style={styles.metricIcon}>
                    <i className="bi bi-journal-text"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={styles.metricValue}>{data.summary?.total_stories || data.stories?.length || 'N/A'}</h3>
                    <p style={styles.metricLabel}>Total Stories</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(2, 119, 189, 0.15)', color: '#0277BD'}}>
                    <i className="bi bi-tags"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#0277BD'}}>{data.themeBreakdown?.length || 'N/A'}</h3>
                    <p style={styles.metricLabel}>Themes</p>
                  </div>
                </div>
                
                <div style={styles.metricCard}>
                  <div style={{...styles.metricIcon, backgroundColor: 'rgba(46, 125, 50, 0.15)', color: '#2E7D32'}}>
                    <i className="bi bi-calculator"></i>
                  </div>
                  <div style={styles.metricContent}>
                    <h3 style={{...styles.metricValue, color: '#2E7D32'}}>{data.summary?.total_story_points || 'N/A'}</h3>
                    <p style={styles.metricLabel}>Total Story Points</p>
                  </div>
                </div>
              </div>
              
              {data.summary?.overview && (
                <div style={styles.summaryContainer}>
                  <h5 style={styles.summaryTitle}>Summary</h5>
                  <p style={styles.summaryText}>{data.summary.overview}</p>
                </div>
              )}
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <VisualizationCard
            title="Theme Breakdown"
            elevation={1}
            icon="pie-chart-fill"
            accentColor="linear-gradient(45deg, #6200EE 30%, #BB86FC 90%)"
          >
            <div style={styles.chartContainer}>
              <Pie data={themeBreakdownData} options={pieOptions} />
            </div>
          </VisualizationCard>
        </Col>
        <Col md={6}>
          <VisualizationCard
            title="Story Points by Theme"
            elevation={1}
            icon="bar-chart-fill"
            accentColor="linear-gradient(45deg, #0277BD 30%, #03DAC6 90%)"
          >
            <div style={styles.chartContainer}>
              <Bar data={storyPointsData} options={barOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Story Priority Matrix"
            elevation={1}
            icon="graph-up"
            accentColor="linear-gradient(45deg, #455A64 30%, #607D8B 90%)"
          >
            <div style={styles.chartContainer}>
              <Scatter data={priorityMatrixData} options={scatterOptions} />
            </div>
            <div style={styles.matrixLegend}>
              <div style={styles.legendItem}>
                <Badge bg="danger" style={styles.legendBadge}>High</Badge>
                <span style={styles.legendText}>Critical features or fixes that should be prioritized</span>
              </div>
              <div style={styles.legendItem}>
                <Badge bg="warning" style={styles.legendBadge}>Medium</Badge>
                <span style={styles.legendText}>Important features that would significantly improve the experience</span>
              </div>
              <div style={styles.legendItem}>
                <Badge bg="info" style={styles.legendBadge}>Low</Badge>
                <span style={styles.legendText}>Nice-to-have features that could be implemented later</span>
              </div>
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="User Stories"
            elevation={2}
            icon="card-list"
            accentColor="linear-gradient(45deg, #6200EE 30%, #03DAC6 90%)"
          >
            <div style={styles.storiesContainer}>
              {data.stories && data.stories.length > 0 ? (
                <Row>
                  {data.stories.map((story, index) => (
                    <Col md={6} lg={4} key={index} className="mb-3">
                      <div style={styles.storyCard}>
                        <div style={{
                          ...styles.storyHeader,
                          background: getThemeColor(story.theme)
                        }}>
                          <div style={styles.storyTheme}>
                            <i className={`bi bi-${getThemeIcon(story.theme)}`} style={styles.themeIcon}></i>
                            <span>{story.theme}</span>
                          </div>
                          <Badge 
                            bg={getPriorityColor(story.priority)}
                            style={styles.priorityBadge}
                          >
                            {story.priority} ({story.storyPoints} pts)
                          </Badge>
                        </div>
                        <div style={styles.storyContent}>
                          <div style={styles.storyFormat}>
                            <p style={styles.storyFormatLine}>
                              <span style={styles.storyFormatLabel}>As a</span>
                              <span style={styles.storyFormatText}>{story.asA}</span>
                            </p>
                            <p style={styles.storyFormatLine}>
                              <span style={styles.storyFormatLabel}>I want</span>
                              <span style={styles.storyFormatText}>{story.iWant}</span>
                            </p>
                            <p style={styles.storyFormatLine}>
                              <span style={styles.storyFormatLabel}>So that</span>
                              <span style={styles.storyFormatText}>{story.soThat}</span>
                            </p>
                          </div>
                          
                          {story.acceptanceCriteria && story.acceptanceCriteria.length > 0 && (
                            <div style={styles.acceptanceCriteria}>
                              <h6 style={styles.acceptanceCriteriaTitle}>Acceptance Criteria:</h6>
                              <ul style={styles.acceptanceCriteriaList}>
                                {story.acceptanceCriteria.map((criteria, i) => (
                                  <li key={i} style={styles.acceptanceCriteriaItem}>{criteria}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div style={styles.noDataContainer}>
                  <i className="bi bi-info-circle" style={styles.noDataIcon}></i>
                  <p style={styles.noDataText}>No user stories available</p>
                </div>
              )}
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
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    marginBottom: '8px'
  },
  summaryText: {
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
  matrixLegend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
    marginTop: '16px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  legendBadge: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '6px 10px'
  },
  legendText: {
    fontSize: '0.9rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    fontWeight: '500'
  },
  storiesContainer: {
    padding: '16px'
  },
  storyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  storyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    color: 'white',
    fontWeight: '500'
  },
  storyTheme: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  themeIcon: {
    fontSize: '1.1rem'
  },
  priorityBadge: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '6px 10px'
  },
  storyContent: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  storyFormat: {
    marginBottom: '16px'
  },
  storyFormatLine: {
    display: 'flex',
    marginBottom: '8px',
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    lineHeight: '1.5'
  },
  storyFormatLabel: {
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    width: '70px',
    flexShrink: 0
  },
  storyFormatText: {
    flex: 1
  },
  acceptanceCriteria: {
    marginTop: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
    padding: '12px'
  },
  acceptanceCriteriaTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    marginBottom: '8px'
  },
  acceptanceCriteriaList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  acceptanceCriteriaItem: {
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

export default UserStoriesVisualizer;
