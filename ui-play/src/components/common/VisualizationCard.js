import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * VisualizationCard Component
 * 
 * A Material UI-inspired card component for displaying visualizations in dashboards.
 * This component provides a consistent UI for visualization sections.
 */
const VisualizationCard = ({
  title,
  description,
  children,
  actions,
  elevation = 1,
  fullWidth = false,
  minHeight = null,
  accentColor = null,
  icon = null
}) => {
  // Calculate elevation styles
  const getShadow = (level) => {
    switch (level) {
      case 0:
        return 'none';
      case 1:
        return '0 4px 12px rgba(0, 0, 0, 0.05)';
      case 2:
        return '0 8px 24px rgba(0, 0, 0, 0.08)';
      case 3:
        return '0 12px 32px rgba(0, 0, 0, 0.12)';
      default:
        return '0 4px 12px rgba(0, 0, 0, 0.05)';
    }
  };

  // Determine accent color
  const getAccentColor = () => {
    if (accentColor) return accentColor;
    
    // Default gradient
    return 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)';
  };

  const cardStyle = {
    ...styles.card,
    boxShadow: getShadow(elevation),
    width: fullWidth ? '100%' : undefined,
    minHeight: minHeight || undefined
  };

  const headerStyle = {
    ...styles.cardHeader,
    borderLeft: `4px solid transparent`,
    borderImage: `${getAccentColor()} 1`,
  };

  return (
    <Card style={cardStyle}>
      {(title || description) && (
        <Card.Header style={headerStyle}>
          <div style={styles.headerContent}>
            {icon && (
              <div style={styles.iconContainer} role="img" aria-hidden="true">
                <i className={`bi bi-${icon}`} style={styles.icon}></i>
              </div>
            )}
            <div style={styles.titleContainer}>
              {title && <h4 style={styles.cardTitle}>{title}</h4>}
              {description && <p style={styles.cardDescription}>{description}</p>}
            </div>
          </div>
        </Card.Header>
      )}
      
      <Card.Body style={styles.cardBody}>
        {children}
      </Card.Body>
      
      {actions && (
        <Card.Footer style={styles.cardFooter}>
          {actions}
        </Card.Footer>
      )}
    </Card>
  );
};

// Material UI-inspired styles with WCAG contrast compliance
const styles = {
  card: {
    marginBottom: '32px',
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.12)', // Added border for better definition
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: 'white',
    '&:hover': {
      transform: 'translateY(-2px)',
    }
  },
  cardHeader: {
    backgroundColor: 'white',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Darker border for better contrast
    padding: '20px 24px',
    position: 'relative',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    background: 'linear-gradient(45deg, rgba(98, 0, 238, 0.15) 0%, rgba(3, 218, 198, 0.15) 100%)', // WCAG-compliant colors
    border: '1px solid rgba(98, 0, 238, 0.1)', // Subtle border for definition
  },
  icon: {
    fontSize: '20px',
    color: '#6200EE', // WCAG-compliant purple
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.35rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)', // Darker for better contrast - meets WCAG AAA
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    letterSpacing: '0.01em',
  },
  cardDescription: {
    fontSize: '0.95rem',
    color: 'rgba(0, 0, 0, 0.75)', // Darker for better contrast - meets WCAG AA
    marginTop: '8px',
    marginBottom: 0,
    lineHeight: '1.5',
    fontWeight: '400', // Regular weight for better readability
  },
  cardBody: {
    padding: '24px',
    position: 'relative',
  },
  cardFooter: {
    backgroundColor: 'white',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)', // Darker border for better contrast
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'flex-end',
  }
};

export default VisualizationCard;
