import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { MarketingData } from '../../../types';
import StrategyOverviewChart from './StrategyOverviewChart';
import TacticsPlatformDistribution from './TacticsPlatformDistribution';
import TacticsDetailTable from './TacticsDetailTable';
import CampaignSummaryCard from './CampaignSummaryCard';
import JsonInput from '../../common/JsonInput';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useTheme } from '@mui/material';

interface MarketingDashboardProps {
  data: MarketingData | null;
}

const MarketingDashboard: React.FC<MarketingDashboardProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  
  const handleStrategySelect = (strategyName: string | null) => {
    setSelectedStrategy(strategyName);
  };
  
  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <JsonInput tabId="marketing" />
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: '16px',
            border: '2px dashed rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CampaignIcon 
            sx={{ 
              fontSize: 80, 
              color: 'rgba(124, 77, 255, 0.2)',
              mb: 2
            }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            No Marketing Campaign Data Available
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mt: 1,
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            Please paste JSON data in the DATA CONSOLE above to visualize marketing campaign analysis.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <JsonInput tabId="marketing" />
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 3,
          borderRadius: '16px',
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CampaignIcon 
            sx={{ 
              fontSize: '2.5rem', 
              mr: 2,
              color: theme.palette.primary.light,
              filter: 'drop-shadow(0 0 8px rgba(179, 136, 255, 0.5))'
            }} 
          />
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: 'linear-gradient(45deg, #B388FF 30%, #00E5FF 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              filter: 'drop-shadow(0 0 2px rgba(179, 136, 255, 0.5))',
            }}
          >
            MARKETING CAMPAIGN ANALYSIS
          </Typography>
        </Box>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: theme.palette.text.secondary,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            pl: 2,
            py: 1,
            backgroundColor: 'rgba(124, 77, 255, 0.1)',
            borderRadius: '0 8px 8px 0',
          }}
        >
          This dashboard presents a comprehensive analysis of the "{data.campaign_name}" marketing campaign. 
          The campaign targets {data.target_audience} over {data.campaign_duration} with a budget of {data.campaign_budget}.
          Click on a strategy in the chart below to filter the data and explore specific tactics.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
            }}
          >
            {selectedStrategy ? `Showing details for: ${selectedStrategy}` : 'Showing all strategies'}
          </Typography>
          
          {selectedStrategy && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.primary.main,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
              onClick={() => handleStrategySelect(null)}
            >
              Clear selection
            </Typography>
          )}
        </Box>
      </Paper>
      
      <CampaignSummaryCard data={data} />
      
      <StrategyOverviewChart 
        strategies={data.campaign_strategies} 
        onStrategySelect={handleStrategySelect}
        selectedStrategy={selectedStrategy}
      />
      
      <TacticsPlatformDistribution 
        strategies={data.campaign_strategies}
        selectedStrategy={selectedStrategy}
      />
      
      <TacticsDetailTable 
        strategies={data.campaign_strategies}
        selectedStrategy={selectedStrategy}
      />
    </Box>
  );
};

export default MarketingDashboard;
