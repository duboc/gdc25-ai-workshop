import React from 'react';
import { Box, Container, Paper, Typography, Grid, Button, Chip, useTheme } from '@mui/material';
import Header from '../common/Header';
import TabNavigation from '../common/TabNavigation';
import { useJsonData } from '../../contexts/JsonDataContext';
import ProblemAnalysisDashboard from '../visualizations/problems/ProblemAnalysisDashboard';
import SpamAnalysisDashboard from '../visualizations/spam/SpamAnalysisDashboard';
import VersionComparisonDashboard from '../visualizations/comparison/VersionComparisonDashboard';
import UserStoriesDashboard from '../visualizations/stories/UserStoriesDashboard';
import MarketingDashboard from '../visualizations/marketing/MarketingDashboard';
import VideoAnalysisDashboard from '../visualizations/video/VideoAnalysisDashboard';
import PromptsDashboard from '../visualizations/prompts/PromptsDashboard';
import ConstructionIcon from '@mui/icons-material/Construction';
import LockIcon from '@mui/icons-material/Lock';
import JsonInput from '../common/JsonInput';

// Placeholder component for tabs that are not yet implemented
const PlaceholderDashboard: React.FC<{ tabId: string; label: string }> = ({ tabId, label }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 3 }}>
      <JsonInput tabId={tabId} />
      
      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          borderRadius: '16px',
          border: '2px dashed rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 50%, rgba(124, 77, 255, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0,
            p: 2
          }}
        >
          <Chip
            icon={<LockIcon fontSize="small" />}
            label="Coming Soon"
            size="small"
            sx={{
              background: 'linear-gradient(45deg, rgba(98, 0, 234, 0.2) 0%, rgba(0, 229, 255, 0.2) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: theme.palette.text.secondary,
              '& .MuiChip-icon': {
                color: theme.palette.secondary.light
              }
            }}
          />
        </Box>
        
        <ConstructionIcon 
          sx={{ 
            fontSize: 80, 
            color: 'rgba(124, 77, 255, 0.2)',
            mb: 2
          }} 
        />
        
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 2,
            fontFamily: '"Rajdhani", sans-serif',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #B388FF 30%, #00E5FF 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            filter: 'drop-shadow(0 0 2px rgba(179, 136, 255, 0.5))',
          }}
        >
          {label} Module
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            mb: 4 
          }}
        >
          This feature will be available in the next workshop session. 
          You can still paste JSON data in the input panel above to prepare for future analysis.
        </Typography>
        
        <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 600, mx: 'auto' }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1
              }}
            >
              Request Early Access
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1
              }}
            >
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

const DashboardLayout: React.FC = () => {
  const { tabs, activeTab } = useJsonData();
  
  // Find the active tab data
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  // Render the appropriate dashboard based on the active tab
  const renderDashboard = () => {
    if (!activeTabData) return null;

    switch (activeTabData.id) {
      case 'problems':
        return <ProblemAnalysisDashboard data={activeTabData.data} />;
      case 'spam':
        return <SpamAnalysisDashboard data={activeTabData.data} />;
      case 'version':
        return <VersionComparisonDashboard data={activeTabData.data} />;
      case 'stories':
        return <UserStoriesDashboard data={activeTabData.data} />;
      case 'marketing':
        return <MarketingDashboard data={activeTabData.data} />;
      case 'video':
        return <VideoAnalysisDashboard data={activeTabData.data} />;
      case 'prompts':
        return <PromptsDashboard data={activeTabData.data} />;
      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            Tab content for {activeTabData.label} is not implemented yet.
          </Box>
        );
    }
  };

  return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          background: 'radial-gradient(circle at 50% 50%, rgba(245, 247, 250, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
      <Header />
      <TabNavigation />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          position: 'relative',
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
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
          {renderDashboard()}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
