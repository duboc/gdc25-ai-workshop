import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  useTheme,
  Chip,
  Button
} from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudIcon from '@mui/icons-material/Cloud';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'App Review Analyzer' }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      sx={{ 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          background: 'linear-gradient(45deg, rgba(94, 53, 177, 0.1) 0%, rgba(0, 178, 204, 0.1) 100%)',
          borderRadius: '12px',
          p: '4px 8px',
          border: '1px solid rgba(94, 53, 177, 0.2)',
          mr: 2
        }}>
          <AnalyticsIcon 
            sx={{ 
              fontSize: '2rem', 
              color: theme.palette.primary.main,
              filter: 'drop-shadow(0 0 4px rgba(124, 77, 255, 0.3))'
            }} 
          />
        </Box>
        
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            letterSpacing: '0.05em',
            background: 'linear-gradient(45deg, #5E35B1 30%, #00B2CC 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            filter: 'drop-shadow(0 0 1px rgba(94, 53, 177, 0.3))',
            fontFamily: '"Rajdhani", sans-serif'
          }}
        >
          {title}
        </Typography>
        
        <Chip
          icon={<CloudIcon sx={{ fontSize: '1rem' }} />}
          label="Analytics Quest Edition"
          size="small"
          sx={{
            background: 'linear-gradient(45deg, rgba(94, 53, 177, 0.1) 0%, rgba(0, 178, 204, 0.1) 100%)',
            border: '1px solid rgba(94, 53, 177, 0.2)',
            color: theme.palette.text.primary,
            mr: 2,
            '& .MuiChip-icon': {
              color: theme.palette.secondary.main
            }
          }}
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<HelpOutlineIcon />}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 0 10px rgba(0, 178, 204, 0.3)'
            }}
          >
            Guide
          </Button>
          
          <IconButton
            color="inherit"
            aria-label="settings"
            title="Settings"
            sx={{ 
              ml: 1,
              background: 'rgba(0, 0, 0, 0.05)',
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <SettingsIcon />
          </IconButton>
          
          <IconButton
            color="inherit"
            aria-label="github"
            title="GitHub Repository"
            sx={{ 
              ml: 1,
              background: 'rgba(0, 0, 0, 0.05)',
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
