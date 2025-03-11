import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  useTheme,
  Grid,
  Chip
} from '@mui/material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Strategy, Tactic } from '../../../types';
import PieChartIcon from '@mui/icons-material/PieChart';

interface TacticsPlatformDistributionProps {
  strategies: Strategy[];
  selectedStrategy: string | null;
}

const TacticsPlatformDistribution: React.FC<TacticsPlatformDistributionProps> = ({ 
  strategies,
  selectedStrategy
}) => {
  const theme = useTheme();

  // Filter tactics based on selected strategy
  const filteredTactics = React.useMemo(() => {
    if (selectedStrategy) {
      const strategy = strategies.find(s => s.strategy_name === selectedStrategy);
      return strategy ? strategy.tactics : [];
    }
    return strategies.flatMap(s => s.tactics);
  }, [strategies, selectedStrategy]);

  // Count platforms across all tactics
  const platformCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    
    filteredTactics.forEach(tactic => {
      tactic.platforms.forEach(platform => {
        counts[platform] = (counts[platform] || 0) + 1;
      });
    });
    
    return counts;
  }, [filteredTactics]);

  // Define colors for platforms
  const PLATFORM_COLORS: Record<string, string> = {
    'Facebook': '#4267B2',
    'Instagram': '#C13584',
    'Twitter': '#1DA1F2',
    'LinkedIn': '#0077B5',
    'YouTube': '#FF0000',
    'TikTok': '#000000',
    'Google': '#4285F4',
    'Email': '#D44638',
    'Website': '#2C3E50',
    'Blog': '#FF5722',
    'Podcast': '#8E44AD',
    'Print': '#34495E',
    'TV': '#16A085',
    'Radio': '#F39C12',
    'Outdoor': '#27AE60',
    'Events': '#E74C3C',
    'PR': '#9B59B6',
    'Influencer': '#3498DB',
    'SMS': '#2ECC71',
    'WhatsApp': '#25D366',
    'Pinterest': '#E60023',
    'Snapchat': '#FFFC00',
    'Reddit': '#FF4500',
    'Discord': '#5865F2',
    'Twitch': '#6441A4'
  };

  // Default color for platforms not in the list
  const DEFAULT_COLOR = '#7C4DFF';

  // Transform platform data for the chart
  const chartData = Object.entries(platformCounts)
    .map(([name, value]) => ({
      name,
      value,
      color: PLATFORM_COLORS[name] || DEFAULT_COLOR
    }))
    .sort((a, b) => b.value - a.value);

  // Calculate total tactics and platforms
  const totalTactics = filteredTactics.length;
  const totalPlatforms = Object.keys(platformCounts).length;

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalTactics) * 100).toFixed(1);
      
      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 700,
              mb: 1,
              color: data.color
            }}
          >
            {data.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>Tactics:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{data.value}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>Percentage:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{percentage}%</Typography>
          </Box>
        </Paper>
      );
    }
    return null;
  };

  // Custom legend component
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: 1,
          mt: 2
        }}
      >
        {payload.map((entry: any, index: number) => (
          <Box 
            key={`legend-${index}`}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
              px: 1,
              py: 0.5,
            }}
          >
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                backgroundColor: entry.color,
                borderRadius: '2px',
                mr: 1
              }} 
            />
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.primary,
              }}
            >
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  // Get top platforms (for summary)
  const topPlatforms = chartData.slice(0, 3).map(p => p.name);

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
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PieChartIcon 
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
          Platform Distribution
        </Typography>
      </Box>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke={theme.palette.background.paper}
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Box 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              p: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 600,
                mb: 2,
                color: theme.palette.primary.light,
              }}
            >
              Platform Distribution Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {selectedStrategy ? (
                  <>The <strong>{selectedStrategy}</strong> strategy utilizes <strong>{totalPlatforms}</strong> different platforms across <strong>{totalTactics}</strong> tactics.</>
                ) : (
                  <>The campaign utilizes <strong>{totalPlatforms}</strong> different platforms across <strong>{totalTactics}</strong> tactics.</>
                )}
              </Typography>
              
              <Typography variant="body2">
                The top platforms are:
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {topPlatforms.map((platform, index) => (
                  <Chip 
                    key={index}
                    label={platform}
                    size="small"
                    sx={{ 
                      backgroundColor: `${PLATFORM_COLORS[platform] || DEFAULT_COLOR}30`,
                      color: PLATFORM_COLORS[platform] || DEFAULT_COLOR,
                      fontWeight: 'bold',
                    }}
                  />
                ))}
              </Box>
            </Box>
            
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic' }}>
              {selectedStrategy ? (
                <>Click on a different strategy in the chart above to see its platform distribution.</>
              ) : (
                <>Click on a strategy in the chart above to filter by strategy.</>
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TacticsPlatformDistribution;
