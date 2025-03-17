import React from 'react';
import { Row, Col, Alert, Badge, ProgressBar } from 'react-bootstrap';
import VisualizationCard from '../../common/VisualizationCard';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
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
  RadialLinearScale,
  PointElement,
  LineElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

/**
 * FtueAnalysisVisualizer Component
 * 
 * This component visualizes First Time User Experience (FTUE) analysis data with interactive charts.
 * It follows Material UI-inspired design principles and WCAG accessibility guidelines.
 */
const FtueAnalysisVisualizer = ({ data }) => {
  if (!data) {
    return (
      <Alert variant="warning" style={styles.alert}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        No FTUE analysis data available
      </Alert>
    );
  }

  // Helper function to get badge color based on compliance status
  const getComplianceColor = (status) => {
    switch (status.toLowerCase()) {
      case 'yes':
        return 'success';
      case 'no':
        return 'danger';
      case 'partial':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  // Helper function to get badge background color based on compliance status
  const getComplianceBgColor = (status) => {
    switch (status.toLowerCase()) {
      case 'yes':
        return '#2E7D32'; // Success green
      case 'no':
        return '#B00020'; // Error red
      case 'partial':
        return '#F57C00'; // Warning orange
      default:
        return '#757575'; // Secondary gray
    }
  };

  // Calculate compliance percentage
  const calculateCompliancePercentage = () => {
    if (!data.complianceCounts) return 0;
    
    const { yes, partial, no, notApplicable } = data.complianceCounts;
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

    const { yes, partial, no, notApplicable } = data.complianceCounts;
    
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
      },
      notApplicable: {
        bg: 'rgba(117, 117, 117, 0.7)',
        border: '#757575'
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

    if (notApplicable > 0) {
      labels.push('Not Applicable');
      chartData.push(notApplicable);
      backgroundColors.push(colors.notApplicable.bg);
      borderColors.push(colors.notApplicable.border);
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

  // Prepare data for the Loading Time Analysis Bar Chart
  const prepareLoadingTimeChartData = () => {
    if (!data.loadingTimeData || !Array.isArray(data.loadingTimeData) || data.loadingTimeData.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Loading Time (seconds)',
          data: [0],
          backgroundColor: 'rgba(98, 0, 238, 0.7)',
          borderColor: '#6200EE',
          borderWidth: 1
        }]
      };
    }

    // Sort by loading time (descending)
    const sortedData = [...data.loadingTimeData].sort((a, b) => b.timeInSeconds - a.timeInSeconds);

    return {
      labels: sortedData.map(item => item.criterion),
      datasets: [{
        label: 'Loading Time (seconds)',
        data: sortedData.map(item => item.timeInSeconds),
        backgroundColor: sortedData.map(item => {
          // Color based on loading time
          if (item.timeInSeconds > 10) {
            return 'rgba(176, 0, 32, 0.7)'; // Red for slow loading
          } else if (item.timeInSeconds > 5) {
            return 'rgba(245, 124, 0, 0.7)'; // Orange for medium loading
          } else {
            return 'rgba(46, 125, 50, 0.7)'; // Green for fast loading
          }
        }),
        borderColor: '#6200EE',
        borderWidth: 1
      }]
    };
  };

  // Prepare data for the Criteria Evaluation Radar Chart
  const prepareCriteriaEvaluationData = () => {
    if (!data.allCriteria || !Array.isArray(data.allCriteria) || data.allCriteria.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Criteria Evaluation',
          data: [0],
          backgroundColor: 'rgba(98, 0, 238, 0.2)',
          borderColor: '#6200EE',
          borderWidth: 1,
          pointBackgroundColor: '#6200EE',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#6200EE'
        }]
      };
    }

    // Filter out "Not Applicable" criteria
    const applicableCriteria = data.allCriteria.filter(
      criterion => criterion.meetsBestPractices.toLowerCase() !== 'not applicable'
    );

    // Map compliance status to numeric values
    const getComplianceValue = (status) => {
      switch (status.toLowerCase()) {
        case 'yes':
          return 100;
        case 'partial':
          return 50;
        case 'no':
          return 0;
        default:
          return 0;
      }
    };

    // Get top criteria (limit to 8 for readability)
    const topCriteria = applicableCriteria.slice(0, 8);

    return {
      labels: topCriteria.map(criterion => criterion.criterion),
      datasets: [{
        label: 'Compliance Level',
        data: topCriteria.map(criterion => getComplianceValue(criterion.meetsBestPractices)),
        backgroundColor: 'rgba(98, 0, 238, 0.2)',
        borderColor: '#6200EE',
        borderWidth: 2,
        pointBackgroundColor: '#6200EE',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6200EE',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    };
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
          },
          callback: function(value) {
            const label = this.getLabelForValue(value);
            // Truncate long labels
            return label.length > 25 ? label.substring(0, 22) + '...' : label;
          }
        }
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Loading Time (seconds)',
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
          stepSize: 5
        }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
            size: 11
          },
          color: 'rgba(0, 0, 0, 0.87)'
        },
        ticks: {
          backdropColor: 'transparent',
          font: {
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          },
          stepSize: 25
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
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
    }
  };

  // Prepare the chart data
  const complianceChartData = prepareComplianceChartData();
  const loadingTimeChartData = prepareLoadingTimeChartData();
  const criteriaEvaluationData = prepareCriteriaEvaluationData();

  return (
    <div className="ftue-analysis-visualizer">
      <Row>
        <Col md={12}>
          <VisualizationCard
            title="FTUE Analysis Overview"
            elevation={2}
            icon="speedometer2"
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
                      <ProgressBar 
                        variant="secondary" 
                        now={data.complianceCounts?.notApplicable || 0} 
                        max={data.allCriteria?.length || 1} 
                        key={4} 
                        style={styles.progressBarSecondary}
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
                    {(data.complianceCounts?.notApplicable > 0) && (
                      <div style={styles.badgeItem}>
                        <Badge bg="secondary" style={styles.badge}>N/A</Badge>
                        <span style={styles.badgeText}>{data.complianceCounts?.notApplicable || 0} criteria</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div style={styles.summaryContainer}>
                <h5 style={styles.summaryTitle}>Summary</h5>
                <p style={styles.summaryText}>
                  {compliancePercentage >= 80 ? (
                    "The first-time user experience meets most best practices, providing a smooth onboarding experience."
                  ) : compliancePercentage >= 50 ? (
                    "The first-time user experience meets some best practices, but there are areas that need improvement."
                  ) : (
                    "The first-time user experience needs significant improvement to meet best practices."
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
            title="Criteria Evaluation"
            elevation={1}
            icon="clipboard-check-fill"
            accentColor="linear-gradient(45deg, #6200EE 30%, #BB86FC 90%)"
          >
            <div style={styles.chartContainer}>
              <Radar data={criteriaEvaluationData} options={radarOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Loading Time Analysis"
            elevation={1}
            icon="hourglass-split"
            accentColor="linear-gradient(45deg, #0277BD 30%, #03DAC6 90%)"
          >
            <div style={styles.chartContainer}>
              <Bar data={loadingTimeChartData} options={barOptions} />
            </div>
          </VisualizationCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <VisualizationCard
            title="Suggested Improvements"
            elevation={2}
            icon="lightbulb-fill"
            accentColor="linear-gradient(45deg, #F57C00 30%, #FFC107 90%)"
          >
            {data.suggestedImprovements && data.suggestedImprovements.length > 0 ? (
              <div style={styles.suggestedImprovementsContainer}>
                {data.suggestedImprovements.map((item, index) => (
                  <div key={index} style={styles.improvementCard}>
                    <div style={styles.improvementHeader}>
                      <Badge 
                        bg={getComplianceColor(item.meetsBestPractices)} 
                        style={styles.improvementBadge}
                      >
                        {item.meetsBestPractices}
                      </Badge>
                      <h5 style={styles.improvementTitle}>{item.criterion}</h5>
                    </div>
                    <div style={styles.improvementContent}>
                      <div style={styles.improvementIconContainer}>
                        <i 
                          className={`bi bi-${item.meetsBestPractices.toLowerCase() === 'no' ? 'x-circle-fill' : 'exclamation-triangle-fill'}`} 
                          style={{
                            ...styles.improvementIcon,
                            color: getComplianceBgColor(item.meetsBestPractices)
                          }}
                        ></i>
                      </div>
                      <p style={styles.improvementDescription}>{item.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.noDataContainer}>
                <i className="bi bi-info-circle" style={styles.noDataIcon}></i>
                <p style={styles.noDataText}>No suggested improvements available</p>
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
  progressBarSecondary: {
    backgroundColor: '#757575' // WCAG-compliant gray
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
  suggestedImprovementsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px'
  },
  improvementCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  improvementHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(0, 0, 0, 0.02)'
  },
  improvementBadge: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '4px 8px',
    marginRight: '12px'
  },
  improvementTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    flex: 1
  },
  improvementContent: {
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px'
  },
  improvementIconContainer: {
    flex: '0 0 auto'
  },
  improvementIcon: {
    fontSize: '24px'
  },
  improvementDescription: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)',
    lineHeight: '1.5',
    margin: 0
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

export default FtueAnalysisVisualizer;
