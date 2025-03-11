import React from 'react';
import { Tabs, Tab, Box, Paper, useTheme, Typography, Tooltip } from '@mui/material';
import { useJsonData } from '../../contexts/JsonDataContext';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SecurityIcon from '@mui/icons-material/Security';
import CompareIcon from '@mui/icons-material/Compare';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CampaignIcon from '@mui/icons-material/Campaign';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import HomeIcon from '@mui/icons-material/Home';

// Map tab IDs to icons and new labels
const tabConfig: Record<string, { icon: React.ReactElement; label: string; tooltip: string }> = {
  'home': {
    icon: <HomeIcon />,
    label: 'Home',
    tooltip: 'Start your review analysis journey'
  },
  'problems': { 
    icon: <FeedbackIcon />, 
    label: 'User Feedback',
    tooltip: 'Analyze user feedback and identify key issues'
  },
  'spam': { 
    icon: <SecurityIcon />, 
    label: 'Review Quality',
    tooltip: 'Detect spam and low-quality reviews'
  },
  'version': { 
    icon: <CompareIcon />, 
    label: 'Version Comparison',
    tooltip: 'Compare metrics across different app versions'
  },
  'stories': { 
    icon: <AutoStoriesIcon />, 
    label: 'User Stories',
    tooltip: 'Generate user stories from feedback'
  },
  'marketing': { 
    icon: <CampaignIcon />, 
    label: 'Marketing Strategy',
    tooltip: 'Plan and analyze marketing campaigns'
  },
  'video': { 
    icon: <OndemandVideoIcon />, 
    label: 'Video Analysis',
    tooltip: 'Extract insights from video content'
  }
};

const TabNavigation: React.FC = () => {
  const { tabs, activeTab, setActiveTab } = useJsonData();
  const theme = useTheme();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="visualization tabs"
        sx={{
          '& .MuiTabs-flexContainer': {
            gap: 1,
            px: 2,
            py: 1,
          },
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        }}
      >
        {tabs.map((tab) => {
          const config = tabConfig[tab.id] || { 
            icon: null, 
            label: tab.label,
            tooltip: tab.label
          };
          
          return (
            <Tooltip 
              key={tab.id}
              title={config.tooltip} 
              placement="bottom"
              arrow
            >
              <Tab 
                label={
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    py: 0.5,
                  }}>
                    {config.icon && (
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: '6px',
                        background: activeTab === tab.id 
                          ? 'linear-gradient(45deg, rgba(124, 77, 255, 0.2) 0%, rgba(0, 229, 255, 0.2) 100%)' 
                          : 'transparent',
                        transition: 'all 0.2s ease-in-out',
                      }}>
                        {config.icon}
                      </Box>
                    )}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: activeTab === tab.id ? 700 : 500,
                        fontFamily: '"Rajdhani", sans-serif',
                        letterSpacing: '0.05em',
                        textTransform: 'none',
                      }}
                    >
                      {config.label}
                    </Typography>
                  </Box>
                }
                value={tab.id} 
                id={`tab-${tab.id}`}
                aria-controls={`tabpanel-${tab.id}`}
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  py: 1.5,
                  borderRadius: '8px 8px 0 0',
                  transition: 'all 0.2s ease-in-out',
                  opacity: activeTab === tab.id ? 1 : 0.7,
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  },
                  mr: 0.5,
                }}
              />
            </Tooltip>
          );
        })}
      </Tabs>
    </Paper>
  );
};

export default TabNavigation;
