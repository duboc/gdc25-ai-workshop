import React from 'react';
import { Row, Col, Alert, Badge } from 'react-bootstrap';
import VisualizationCard from '../../common/VisualizationCard';
import { Pie, Bubble, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, PointElement, LineElement, BarElement, Title, Tooltip, Legend, LinearScale } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, PointElement, LineElement, BarElement, Title, Tooltip, Legend, LinearScale);

/**
 * ProblemAnalysisVisualizer Component
 * 
 * This component visualizes problem analysis data with interactive charts.
 */
const ProblemAnalysisVisualizer = ({ data }) => {
  if (!data) {
    return (
      <Alert variant="warning" style={styles.alert}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        No problem analysis data available
      </Alert>
    );
  }

  // Prepare data for the Problem Categories Pie Chart
  const prepareCategoryChartData = () => {
    if (!data.problemCategories || !Array.isArray(data.problemCategories) || data.problemCategories.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['#757575'], // WCAG-compliant gray
          borderWidth: 1
        }]
      };
    }

    // WCAG-compliant colors with good contrast
    const accessibleColors = [
      '#B00020', // Error red
      '#0277BD', // Info blue
      '#F57C00', // Warning orange
      '#2E7D32', // Success green
      '#6200EE', // Primary purple
      '#018786', // Secondary teal
      '#5D4037', // Brown
      '#455A64', // Blue gray
      '#C2185B', // Pink
      '#1565C0'  // Dark blue
    ];

    return {
      labels: data.problemCategories.map(category => category.name),
      datasets: [{
        data: data.problemCategories.map(category => category.count),
        backgroundColor: accessibleColors.slice(0, data.problemCategories.length),
        borderWidth: 1,
        borderColor: '#FFFFFF' // White border for better separation
      }]
    };
  };

  // Prepare data for the Severity/Frequency Bubble Chart
  const prepareSeverityFrequencyData = () => {
    if (!data.problems || !Array.isArray(data.problems) || data.problems.length === 0) {
      return {
        datasets: [{
          label: 'No Data',
          data: [{x: 5, y: 5, r: 5}],
          backgroundColor: 'rgba(117, 117, 117, 0.7)', // WCAG-compliant gray
          borderColor: '#616161'
        }]
      };
    }

    return {
      datasets: [{
        label: 'Problems',
        data: data.problems.map(problem => ({
          x: problem.severity || 0,
          y: problem.frequency || 0,
          r: (problem.impact || 5) / 2, // Size based on impact, scaled down
          problem: problem.name
        })),
        backgroundColor: 'rgba(98, 0, 238, 0.7)', // WCAG-compliant purple with opacity
        borderColor: '#6200EE', // WCAG-compliant purple
        hoverBackgroundColor: 'rgba(98, 0, 238, 0.9)',
        hoverBorderColor: '#3700B3'
      }]
    };
  };

  // Prepare data for the User Segment Impact Bar Chart
  const prepareSegmentImpactData = () => {
    if (!data.segmentImpact || !Array.isArray(data.segmentImpact) || data.segmentImpact.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Impact Score',
          data: [0],
          backgroundColor: 'rgba(117, 117, 117, 0.7)', // WCAG-compliant gray
          borderColor: '#616161',
          borderWidth: 1
        }]
      };
    }

    return {
      labels: data.segmentImpact.map(segment => segment.name),
      datasets: [{
        label: 'Impact Score',
        data: data.segmentImpact.map(segment => segment.impactScore),
        backgroundColor: 'rgba(1, 135, 134, 0.8)', // WCAG-compliant teal
        borderColor: '#018786', // WCAG-compliant teal
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(1, 135, 134, 1)',
        hoverBorderColor: '#018786'
      }]
    };
  };

  // Chart options
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
      title: {
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
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  const bubbleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Severity (1-10)',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12,
            weight: '500'
          }
        },
        min: 0,
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
      y: {
        title: {
          display: true,
          text: 'Frequency (1-10)',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif',
            size: 12,
            weight: '500'
          }
        },
        min: 0,
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
      }
    },
    plugins: {
      title: {
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
        boxPadding: 6,
        callbacks: {
          label: (context) => {
            const dataPoint = context.raw;
            return [
              `Problem: ${dataPoint.problem || 'Unknown'}`,
              `Severity: ${dataPoint.x}`,
              `Frequency: ${dataPoint.y}`,
              `Impact: ${dataPoint.r * 2}`
            ];
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Impact Score (1-10)',
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
    },
    plugins: {
      title: {
        display: false
      },
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
    }
  };

  // Prepare the chart data
  const categoryChartData = prepareCategoryChartData();
  const severityFrequencyData = prepareSeverityFrequencyData();
  const segmentImpactData = prepareSegmentImpactData();

  return (
    <div className="problem-analysis-visualizer">
      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Problem Analysis Overview"
            elevation={2}
            icon="clipboard-data"
            accentColor="linear-gradient(45deg, #7C4DFF 30%, #7C4DFF 90%)"
          >
            <div style={styles.overviewContainer}>
              <div style={styles.overviewSection}>
                <div style={styles.statCard}>
                  <div style={styles.statIcon}>
                    <i className="bi bi-exclamation-triangle-fill"></i>
                  </div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statValue}>{data.criticalProblemsCount || '0'}</h3>
                    <p style={styles.statLabel}>Critical Problems</p>
                  </div>
                </div>
              </div>
              
              <div style={styles.overviewSection}>
                <h5 style={styles.sectionTitle}>Most Affected Segments</h5>
                <div style={styles.segmentsList}>
                  {data.mostAffectedSegments && data.mostAffectedSegments.length > 0 ? (
                    data.mostAffectedSegments.map((segment, index) => (
                      <Badge key={index} style={styles.segmentBadge}>
                        {segment}
                      </Badge>
                    ))
                  ) : (
                    <p style={styles.noDataText}>No affected segments data available</p>
                  )}
                </div>
              </div>
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <VisualizationCard
            title="Problem Categories"
            elevation={1}
            icon="pie-chart-fill"
            accentColor="linear-gradient(45deg, #FF6384 30%, #FF9F40 90%)"
          >
            <div style={styles.chartContainer}>
              <Pie data={categoryChartData} options={pieOptions} />
            </div>
          </VisualizationCard>
        </Col>
        <Col md={6}>
          <VisualizationCard
            title="Severity/Frequency Matrix"
            elevation={1}
            icon="graph-up"
            accentColor="linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)"
          >
            <div style={styles.chartContainer}>
              <Bubble data={severityFrequencyData} options={bubbleOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="User Segment Impact"
            elevation={1}
            icon="people-fill"
            accentColor="linear-gradient(45deg, #00E5FF 30%, #00E5FF 90%)"
          >
            <div style={styles.chartContainer}>
              <Bar data={segmentImpactData} options={barOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Actionable Insights"
            elevation={2}
            icon="lightbulb-fill"
            accentColor="linear-gradient(45deg, #FF9F40 30%, #FFCE56 90%)"
          >
            {data.actionableInsights && data.actionableInsights.length > 0 ? (
              <div style={styles.insightsList}>
                {data.actionableInsights.map((insight, index) => (
                  <div key={index} style={styles.insightItem}>
                    <div style={styles.insightHeader}>
                      <h5 style={styles.insightTitle}>
                        {typeof insight === 'object' ? insight.title || 'Insight' : `Insight ${index + 1}`}
                      </h5>
                      {typeof insight === 'object' && insight.priority && (
                        <span style={{
                          ...styles.priorityBadge,
                          backgroundColor: insight.priority === 'High' ? '#f44336' : insight.priority === 'Medium' ? '#ff9800' : '#2196f3'
                        }}>
                          {insight.priority}
                        </span>
                      )}
                    </div>
                    <p style={styles.insightText}>
                      {typeof insight === 'object' ? insight.description || insight.text : insight}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.noInsightsContainer}>
                <i className="bi bi-search" style={styles.noInsightsIcon}></i>
                <p style={styles.noInsightsText}>No actionable insights available</p>
              </div>
            )}
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
    flexWrap: 'wrap',
    margin: '-12px'
  },
  overviewSection: {
    flex: '1 1 300px',
    padding: '12px',
    minWidth: '300px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 0, 238, 0.05)', // Primary purple background
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(98, 0, 238, 0.1)' // Subtle border for definition
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(98, 0, 238, 0.15)', // Slightly darker for contrast
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    fontSize: '24px',
    color: '#6200EE' // WCAG-compliant purple
  },
  statContent: {
    flex: 1
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: 0,
    color: '#6200EE', // WCAG-compliant purple
    lineHeight: 1.2
  },
  statLabel: {
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    margin: 0,
    marginTop: '4px',
    fontWeight: '500' // Medium weight for better readability
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600', // Bolder for better contrast
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)' // Slightly darker border
  },
  segmentsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  segmentBadge: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)', // Primary purple background
    color: '#3700B3', // Darker purple for text - meets WCAG AA
    borderRadius: '16px',
    padding: '6px 12px',
    fontSize: '0.9rem',
    fontWeight: '600', // Bolder for better contrast
    border: '1px solid rgba(98, 0, 238, 0.2)' // Subtle border for definition
  },
  noDataText: {
    color: 'rgba(0, 0, 0, 0.7)', // Darker for better contrast - meets WCAG AA
    fontStyle: 'italic',
    margin: 0,
    fontWeight: '500' // Medium weight for better readability
  },
  chartContainer: {
    height: '350px',
    position: 'relative',
    padding: '16px 8px'
  },
  insightsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  insightItem: {
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly more opaque for better contrast
    border: '1px solid rgba(0, 0, 0, 0.12)', // Darker border for better definition
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    padding: '20px',
    transition: 'all 0.2s ease-in-out'
  },
  insightHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  insightTitle: {
    fontSize: '1.15rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    margin: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  insightText: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    margin: 0,
    lineHeight: '1.6'
  },
  priorityBadge: {
    padding: '4px 10px',
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: '600', // Bolder for better contrast
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  noInsightsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Slightly darker for better contrast
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.08)' // Subtle border for definition
  },
  noInsightsIcon: {
    fontSize: '48px',
    color: 'rgba(0, 0, 0, 0.3)', // Darker for better contrast
    marginBottom: '16px'
  },
  noInsightsText: {
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.7)', // Darker for better contrast - meets WCAG AA
    fontStyle: 'italic',
    fontWeight: '500' // Medium weight for better readability
  }
};

export default ProblemAnalysisVisualizer;
