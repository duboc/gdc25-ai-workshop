import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  CircularProgress,
  useTheme
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { OverallQualityMetrics } from '../../../types';

interface QualityMetricsCardProps {
  metrics: OverallQualityMetrics;
}

const QualityMetricsCard: React.FC<QualityMetricsCardProps> = ({ 
  metrics 
}) => {
  const theme = useTheme();

  // Helper function to determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return theme.palette.success.main;
    if (score >= 0.4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  // Helper function to determine color based on spam percentage
  const getSpamColor = (percentage: number) => {
    if (percentage <= 5) return theme.palette.success.main;
    if (percentage <= 15) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        mb: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        Overall Quality Metrics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Authenticity Score
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress 
                variant="determinate" 
                value={metrics.authenticity_score * 100} 
                size={80}
                sx={{ 
                  color: getScoreColor(metrics.authenticity_score),
                  circle: {
                    strokeLinecap: 'round',
                  }
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="text.primary"
                >
                  {`${Math.round(metrics.authenticity_score * 100)}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Spam Percentage
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress 
                variant="determinate" 
                value={metrics.spam_percentage} 
                size={80}
                sx={{ 
                  color: getSpamColor(metrics.spam_percentage),
                  circle: {
                    strokeLinecap: 'round',
                  }
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="text.primary"
                >
                  {`${metrics.spam_percentage}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Average Quality Score
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress 
                variant="determinate" 
                value={metrics.average_quality_score * 100} 
                size={80}
                sx={{ 
                  color: getScoreColor(metrics.average_quality_score),
                  circle: {
                    strokeLinecap: 'round',
                  }
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="text.primary"
                >
                  {`${Math.round(metrics.average_quality_score * 100)}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Key Findings
      </Typography>
      
      <List dense>
        {metrics.key_findings.map((finding, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <InfoIcon color="info" />
            </ListItemIcon>
            <ListItemText primary={finding} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default QualityMetricsCard;
