import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  useTheme,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import { MarketingData } from '../../../types';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupIcon from '@mui/icons-material/Group';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MessageIcon from '@mui/icons-material/Message';
import StrategyIcon from '@mui/icons-material/Psychology';

interface CampaignSummaryCardProps {
  data: MarketingData;
}

const CampaignSummaryCard: React.FC<CampaignSummaryCardProps> = ({ data }) => {
  const theme = useTheme();

  // Calculate total tactics and platforms
  const totalTactics = data.campaign_strategies.reduce(
    (sum, strategy) => sum + strategy.tactics.length, 
    0
  );
  
  // Get unique platforms
  const uniquePlatforms = new Set<string>();
  data.campaign_strategies.forEach(strategy => {
    strategy.tactics.forEach(tactic => {
      tactic.platforms.forEach(platform => {
        uniquePlatforms.add(platform);
      });
    });
  });
  
  // Calculate total budget
  const totalBudget = data.campaign_strategies.reduce((sum, strategy) => {
    return sum + strategy.tactics.reduce((tacticSum, tactic) => {
      const costValue = parseFloat(tactic.estimated_cost.replace(/[^0-9.-]+/g, ''));
      return tacticSum + costValue;
    }, 0);
  }, 0);

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(124, 77, 255, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CampaignIcon 
          sx={{ 
            mr: 1.5, 
            color: theme.palette.primary.light,
            filter: 'drop-shadow(0 0 3px rgba(179, 136, 255, 0.5))'
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"Rajdhani", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          Campaign Overview
        </Typography>
      </Box>
      
      <Box 
        sx={{ 
          p: 2, 
          backgroundColor: 'rgba(124, 77, 255, 0.1)',
          borderRadius: '8px',
          mb: 3,
          border: '1px solid rgba(124, 77, 255, 0.2)',
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: '"Rajdhani", sans-serif',
            fontWeight: 700,
            mb: 1,
            color: theme.palette.primary.light,
          }}
        >
          {data.campaign_name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {data.overall_message}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <GroupIcon 
                sx={{ 
                  mr: 1, 
                  color: theme.palette.primary.light,
                  fontSize: '1.2rem'
                }} 
              />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Target Audience:
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold',
                ml: 4
              }}
            >
              {data.target_audience}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DateRangeIcon 
                sx={{ 
                  mr: 1, 
                  color: theme.palette.primary.light,
                  fontSize: '1.2rem'
                }} 
              />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Duration:
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold',
                ml: 4
              }}
            >
              {data.campaign_duration}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon 
                sx={{ 
                  mr: 1, 
                  color: theme.palette.primary.light,
                  fontSize: '1.2rem'
                }} 
              />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Budget:
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold',
                ml: 4
              }}
            >
              {data.campaign_budget}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StrategyIcon 
                sx={{ 
                  mr: 1, 
                  color: theme.palette.primary.light,
                  fontSize: '1.2rem'
                }} 
              />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Strategies:
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold',
                ml: 4
              }}
            >
              {data.campaign_strategies.length}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              height: '100%',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h3" 
              align="center"
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 700,
                color: theme.palette.primary.light,
                mb: 1
              }}
            >
              {totalTactics}
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center"
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 600,
                mb: 1
              }}
            >
              Total Tactics
            </Typography>
            <Divider sx={{ my: 1, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
            <Typography 
              variant="body2" 
              align="center"
              sx={{ 
                color: theme.palette.text.secondary,
                fontStyle: 'italic'
              }}
            >
              Across {data.campaign_strategies.length} strategies
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              height: '100%',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h3" 
              align="center"
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 700,
                color: theme.palette.secondary.light,
                mb: 1
              }}
            >
              {uniquePlatforms.size}
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center"
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 600,
                mb: 1
              }}
            >
              Platforms Used
            </Typography>
            <Divider sx={{ my: 1, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
            <Typography 
              variant="body2" 
              align="center"
              sx={{ 
                color: theme.palette.text.secondary,
                fontStyle: 'italic'
              }}
            >
              For maximum audience reach
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              height: '100%',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h3" 
              align="center"
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 700,
                color: theme.palette.success.light,
                mb: 1
              }}
            >
              ${totalBudget.toLocaleString()}
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center"
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 600,
                mb: 1
              }}
            >
              Total Budget
            </Typography>
            <Divider sx={{ my: 1, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
            <Typography 
              variant="body2" 
              align="center"
              sx={{ 
                color: theme.palette.text.secondary,
                fontStyle: 'italic'
              }}
            >
              Estimated campaign investment
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Box 
        sx={{ 
          mt: 3, 
          p: 2, 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MessageIcon 
            sx={{ 
              mr: 1.5, 
              color: theme.palette.primary.light,
              fontSize: '1.2rem'
            }} 
          />
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
            }}
          >
            Campaign Message
          </Typography>
        </Box>
        <Typography variant="body2">
          {data.overall_message}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CampaignSummaryCard;
