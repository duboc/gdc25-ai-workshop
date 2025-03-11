import React from 'react';
import { Grid, Paper, Typography, Box, useTheme, Divider } from '@mui/material';
import { VideoData } from '../../../types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface UserExperienceScorecardProps {
  data: VideoData;
}

const UserExperienceScorecard: React.FC<UserExperienceScorecardProps> = ({ data }) => {
  const theme = useTheme();
  
  // Calculate compliance statistics
  const totalCriteria = data.ftueAnalysis.length;
  const compliantCount = data.ftueAnalysis.filter(item => item.meetsBestPractices === 'Yes').length;
  const partialCount = data.ftueAnalysis.filter(item => item.meetsBestPractices === 'Partial').length;
  const nonCompliantCount = data.ftueAnalysis.filter(item => item.meetsBestPractices === 'No').length;
  const naCount = data.ftueAnalysis.filter(item => item.meetsBestPractices === 'Not Applicable').length;
  
  // Calculate compliance percentage
  const complianceScore = Math.round((compliantCount + (partialCount * 0.5)) / (totalCriteria - naCount) * 100);
  
  // Get loading time metrics
  const splashToInteractiveTime = data.ftueAnalysis.find(
    item => item.criterion === 'Splash Screen to Interactive Game Time'
  )?.numericalValue.timeInSeconds;
  
  const maxLoadingTime = data.ftueAnalysis.find(
    item => item.criterion === 'Loading Screen Duration'
  )?.numericalValue.maxDurationInSeconds;
  
  // Get other key metrics
  const permissionsWithoutExplanation = data.ftueAnalysis.find(
    item => item.criterion === 'Permission Request Explanation'
  )?.numericalValue.permissionsRequestedWithoutExplanationCount;
  
  const interstitialCount = data.ftueAnalysis.find(
    item => item.criterion === 'Interstitials and Purchase Modals'
  )?.numericalValue.interstitialCount;
  
  const purchaseModalCount = data.ftueAnalysis.find(
    item => item.criterion === 'Interstitials and Purchase Modals'
  )?.numericalValue.purchaseModalCount;
  
  const instancesWithoutFeedback = data.ftueAnalysis.find(
    item => item.criterion === 'Loading Status Feedback'
  )?.numericalValue.instancesWithoutFeedbackCount;
  
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFC107';
    return '#F44336';
  };
  
  // Determine score label
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };
  
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: '12px',
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"Rajdhani", sans-serif',
          fontWeight: 600,
          letterSpacing: '0.05em',
          mb: 3,
        }}
      >
        FTUE User Experience Scorecard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Overall Compliance Score */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              height: '100%',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Overall Compliance Score
            </Typography>
            
            <Box
              sx={{
                position: 'relative',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `conic-gradient(${getScoreColor(complianceScore)} ${complianceScore}%, #e0e0e0 0)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'white',
                }
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  position: 'relative',
                  fontWeight: 'bold',
                  color: getScoreColor(complianceScore),
                }}
              >
                {complianceScore}%
              </Typography>
            </Box>
            
            <Typography
              variant="h6"
              sx={{
                color: getScoreColor(complianceScore),
                fontWeight: 'bold',
              }}
            >
              {getScoreLabel(complianceScore)}
            </Typography>
            
            <Box sx={{ mt: 2, width: '100%' }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlineIcon sx={{ color: '#4CAF50', mr: 0.5, fontSize: '1rem' }} />
                    <Typography variant="body2">
                      {compliantCount} Compliant
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningAmberIcon sx={{ color: '#FFC107', mr: 0.5, fontSize: '1rem' }} />
                    <Typography variant="body2">
                      {partialCount} Partial
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ErrorOutlineIcon sx={{ color: '#F44336', mr: 0.5, fontSize: '1rem' }} />
                    <Typography variant="body2">
                      {nonCompliantCount} Non-compliant
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HelpOutlineIcon sx={{ color: '#9E9E9E', mr: 0.5, fontSize: '1rem' }} />
                    <Typography variant="body2">
                      {naCount} N/A
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        
        {/* Loading Time Metrics */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              height: '100%',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Loading Time Metrics
            </Typography>
            
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Splash to Interactive:
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: splashToInteractiveTime && splashToInteractiveTime > 5 ? '#F44336' : '#4CAF50'
                  }}
                >
                  {splashToInteractiveTime ? `${splashToInteractiveTime.toFixed(1)}s` : 'N/A'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {splashToInteractiveTime && splashToInteractiveTime <= 3 ? 'Good' : 
                   splashToInteractiveTime && splashToInteractiveTime <= 5 ? 'Acceptable' : 
                   splashToInteractiveTime ? 'Too Long' : ''}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Max Loading Screen Duration:
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: maxLoadingTime && maxLoadingTime > 3 ? '#F44336' : '#4CAF50'
                  }}
                >
                  {maxLoadingTime ? `${maxLoadingTime.toFixed(1)}s` : 'N/A'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {maxLoadingTime && maxLoadingTime <= 2 ? 'Good' : 
                   maxLoadingTime && maxLoadingTime <= 3 ? 'Acceptable' : 
                   maxLoadingTime ? 'Too Long' : ''}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Instances Without Loading Feedback:
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: instancesWithoutFeedback && instancesWithoutFeedback > 0 ? '#F44336' : '#4CAF50'
                  }}
                >
                  {instancesWithoutFeedback !== undefined ? instancesWithoutFeedback : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        
        {/* User Experience Issues */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              height: '100%',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              User Experience Issues
            </Typography>
            
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Permissions Without Explanation:
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: permissionsWithoutExplanation && permissionsWithoutExplanation > 0 ? '#F44336' : '#4CAF50'
                  }}
                >
                  {permissionsWithoutExplanation !== undefined ? permissionsWithoutExplanation : 'N/A'}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Interstitial Ads During FTUE:
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: interstitialCount && interstitialCount > 0 ? '#F44336' : '#4CAF50'
                  }}
                >
                  {interstitialCount !== undefined ? interstitialCount : 'N/A'}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Purchase Modals During FTUE:
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: purchaseModalCount && purchaseModalCount > 0 ? '#F44336' : '#4CAF50'
                  }}
                >
                  {purchaseModalCount !== undefined ? purchaseModalCount : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserExperienceScorecard;
