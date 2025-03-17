import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

/**
 * DataInputCard Component
 * 
 * A Material UI-inspired card component for data input in dashboards.
 * This component provides a consistent UI for loading example data or pasting custom JSON.
 */
const DataInputCard = ({
  customJson,
  onCustomJsonChange,
  onLoadExampleData,
  onVisualizeCustomJson,
  exampleFileName
}) => {
  return (
    <Card style={styles.card}>
      <Card.Header style={styles.cardHeader}>
        <div style={styles.headerContent}>
          <h4 style={styles.cardTitle}>Data Input</h4>
          <div style={styles.headerDivider}></div>
        </div>
      </Card.Header>
      <Card.Body style={styles.cardBody}>
        <Row>
          <Col md={6} style={styles.column}>
            <div style={styles.exampleSection}>
              <div style={styles.sectionIcon}>
                <i className="bi bi-file-earmark-code" style={styles.icon}></i>
              </div>
              <h5 style={styles.sectionTitle}>Example Data</h5>
              <p style={styles.sectionDescription}>
                Load the example data file <code style={styles.code}>{exampleFileName}</code> to see a visualization.
              </p>
              <Button 
                variant="primary" 
                style={styles.loadButton}
                onClick={onLoadExampleData}
                className="mb-3"
              >
                <i className="bi bi-cloud-download me-2"></i>
                Load Example Data
              </Button>
            </div>
          </Col>
          <Col md={6} style={styles.column}>
            <div style={styles.customSection}>
              <div style={styles.sectionIcon}>
                <i className="bi bi-braces" style={styles.icon}></i>
              </div>
              <h5 style={styles.sectionTitle}>Custom JSON</h5>
              <p style={styles.sectionDescription}>
                Paste your own JSON data to visualize custom results.
              </p>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={customJson}
                  onChange={onCustomJsonChange}
                  placeholder="Paste JSON data here..."
                  style={styles.textarea}
                />
              </Form.Group>
              <Button 
                variant="primary" 
                style={styles.visualizeButton}
                className="mt-3"
                onClick={onVisualizeCustomJson}
                disabled={!customJson.trim()}
              >
                <i className="bi bi-graph-up me-2"></i>
                Visualize
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// Material UI-inspired styles
const styles = {
  card: {
    marginBottom: '32px',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    border: 'none',
    overflow: 'hidden',
    backgroundColor: 'white',
    transition: 'box-shadow 0.3s ease-in-out',
  },
  cardHeader: {
    backgroundColor: 'white',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    padding: '20px 24px',
  },
  headerContent: {
    position: 'relative',
    paddingBottom: '8px',
  },
  headerDivider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '60px',
    height: '4px',
    background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
    borderRadius: '4px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  cardBody: {
    padding: '24px',
  },
  column: {
    padding: '16px',
  },
  exampleSection: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(124, 77, 255, 0.02)',
    padding: '24px',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(124, 77, 255, 0.05)',
    },
  },
  customSection: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 229, 255, 0.02)',
    padding: '24px',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(0, 229, 255, 0.05)',
    },
  },
  sectionIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    background: 'linear-gradient(45deg, rgba(124, 77, 255, 0.1) 0%, rgba(0, 229, 255, 0.1) 100%)',
  },
  icon: {
    fontSize: '24px',
    color: '#7C4DFF',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '500',
    marginBottom: '12px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  sectionDescription: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: '24px',
    lineHeight: '1.5',
  },
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#7C4DFF',
  },
  loadButton: {
    background: 'linear-gradient(45deg, #7C4DFF 30%, #7C4DFF 90%)',
    color: 'white',
    textTransform: 'none',
    boxShadow: '0 4px 8px rgba(124, 77, 255, 0.3)',
    borderRadius: '8px',
    padding: '10px 20px',
    border: 'none',
    marginTop: 'auto',
    fontWeight: '500',
    letterSpacing: '0.02em',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0 6px 12px rgba(124, 77, 255, 0.4)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      boxShadow: '0 2px 4px rgba(124, 77, 255, 0.3)',
      transform: 'translateY(1px)',
    },
  },
  visualizeButton: {
    background: 'linear-gradient(45deg, #00E5FF 30%, #00E5FF 90%)',
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'none',
    boxShadow: '0 4px 8px rgba(0, 229, 255, 0.3)',
    borderRadius: '8px',
    padding: '10px 20px',
    border: 'none',
    marginTop: 'auto',
    fontWeight: '500',
    letterSpacing: '0.02em',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0 6px 12px rgba(0, 229, 255, 0.4)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      boxShadow: '0 2px 4px rgba(0, 229, 255, 0.3)',
      transform: 'translateY(1px)',
    },
    '&:disabled': {
      background: 'rgba(0, 0, 0, 0.12)',
      color: 'rgba(0, 0, 0, 0.26)',
      boxShadow: 'none',
    },
  },
  textarea: {
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    padding: '16px',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease-in-out',
    resize: 'vertical',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
    fontFamily: 'monospace',
    '&:focus': {
      borderColor: '#00E5FF',
      boxShadow: 'inset 0 1px 3px rgba(0, 229, 255, 0.2)',
      outline: 'none',
    },
  },
};

export default DataInputCard;
