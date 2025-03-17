import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

/**
 * DashboardLayout Component
 * 
 * A common layout component for all dashboard pages.
 * This component provides a consistent Material UI-like design across all dashboards.
 */
const DashboardLayout = ({ 
  title, 
  description, 
  children, 
  headerActions,
  loading = false,
  error = null
}) => {
  return (
    <div className="dashboard-layout" style={styles.dashboardLayout}>
      <div className="dashboard-header" style={styles.header}>
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <h2 style={styles.title}>{title}</h2>
              {description && <p style={styles.description}>{description}</p>}
            </Col>
            {headerActions && (
              <Col xs="auto">
                {headerActions}
              </Col>
            )}
          </Row>
        </Container>
      </div>
      
      <Container fluid style={styles.container}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <div className="spinner-grow" style={styles.spinner} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p style={styles.loadingText}>Loading data...</p>
          </div>
        ) : error ? (
          <Card style={styles.errorCard}>
            <Card.Body>
              <Card.Title style={styles.errorTitle}>Error</Card.Title>
              <Card.Text>{error}</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          children
        )}
      </Container>
    </div>
  );
};

// Material UI-inspired styles
const styles = {
  dashboardLayout: {
    background: 'radial-gradient(circle at 50% 50%, rgba(245, 247, 250, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
    backgroundAttachment: 'fixed',
    minHeight: 'calc(100vh - 56px)',
    position: 'relative',
  },
  header: {
    padding: '32px 0 24px',
    background: 'linear-gradient(135deg, rgba(98, 0, 234, 0.05) 0%, rgba(0, 229, 255, 0.05) 100%)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    marginBottom: '24px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 50% 0%, rgba(98, 0, 234, 0.05) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: 0,
    }
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 0 1px rgba(124, 77, 255, 0.2))',
    margin: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    letterSpacing: '0.02em'
  },
  description: {
    fontSize: '1.1rem',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: '8px',
    marginBottom: 0,
    fontWeight: '400',
    maxWidth: '800px'
  },
  container: {
    paddingBottom: '48px',
    position: 'relative',
    zIndex: 1
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 0',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    margin: '40px auto',
    maxWidth: '400px'
  },
  spinner: {
    color: '#7C4DFF',
    width: '3rem',
    height: '3rem'
  },
  loadingText: {
    marginTop: '24px',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  errorCard: {
    borderLeft: '4px solid #f44336',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '40px auto',
    maxWidth: '600px'
  },
  errorTitle: {
    color: '#f44336',
    fontSize: '1.25rem',
    fontWeight: '500'
  }
};

export default DashboardLayout;
