import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  IconButton,
  Collapse
} from '@mui/material';
import { Strategy, Tactic } from '../../../types';
import TableChartIcon from '@mui/icons-material/TableChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface TacticsDetailTableProps {
  strategies: Strategy[];
  selectedStrategy: string | null;
}

// Row component for expandable table
const TacticRow: React.FC<{ 
  tactic: Tactic & { strategyName: string }; 
  platformColors: Record<string, string>;
  defaultColor: string;
}> = ({ tactic, platformColors, defaultColor }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  // Extract numeric value from cost string (e.g., "$5,000" -> 5000)
  const costValue = parseFloat(tactic.estimated_cost.replace(/[^0-9.-]+/g, ''));
  
  // Determine cost level for styling
  const getCostLevelColor = () => {
    if (costValue >= 10000) return theme.palette.error.main;
    if (costValue >= 5000) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <>
      <TableRow 
        sx={{ 
          '&:hover': { 
            backgroundColor: 'rgba(124, 77, 255, 0.05)' 
          },
          cursor: 'pointer',
          '& > *': { 
            borderBottom: 'unset' 
          }
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ 
              color: open ? theme.palette.primary.light : theme.palette.text.secondary 
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell 
          component="th" 
          scope="row"
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.light
          }}
        >
          {tactic.tactic_name}
        </TableCell>
        <TableCell>
          <Chip
            label={tactic.strategyName}
            size="small"
            sx={{
              backgroundColor: 'rgba(124, 77, 255, 0.1)',
              color: theme.palette.primary.light,
              fontWeight: 'bold',
            }}
          />
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {tactic.platforms.map((platform, index) => (
              <Chip
                key={index}
                label={platform}
                size="small"
                sx={{
                  backgroundColor: `${platformColors[platform] || defaultColor}20`,
                  color: platformColors[platform] || defaultColor,
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                }}
              />
            ))}
          </Box>
        </TableCell>
        <TableCell align="right">
          <Chip
            label={tactic.estimated_cost}
            size="small"
            sx={{
              backgroundColor: `${getCostLevelColor()}20`,
              color: getCostLevelColor(),
              fontWeight: 'bold',
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell 
          style={{ paddingBottom: 0, paddingTop: 0 }} 
          colSpan={5}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography 
                variant="subtitle2" 
                gutterBottom 
                component="div"
                sx={{ 
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 600,
                  color: theme.palette.primary.light
                }}
              >
                Tactic Details
              </Typography>
              <Box 
                sx={{ 
                  p: 2, 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="body2" paragraph>
                  {tactic.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {tactic.platforms.map((platform, index) => (
                    <Chip
                      key={index}
                      label={platform}
                      size="small"
                      sx={{
                        backgroundColor: `${platformColors[platform] || defaultColor}20`,
                        color: platformColors[platform] || defaultColor,
                        fontWeight: 'bold',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const TacticsDetailTable: React.FC<TacticsDetailTableProps> = ({ 
  strategies,
  selectedStrategy
}) => {
  const theme = useTheme();

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

  // Prepare tactics data with strategy name
  const tacticsData = React.useMemo(() => {
    const filteredStrategies = selectedStrategy 
      ? strategies.filter(s => s.strategy_name === selectedStrategy)
      : strategies;
      
    return filteredStrategies.flatMap(strategy => 
      strategy.tactics.map(tactic => ({
        ...tactic,
        strategyName: strategy.strategy_name
      }))
    );
  }, [strategies, selectedStrategy]);

  // Calculate total estimated cost
  const totalCost = React.useMemo(() => {
    return tacticsData.reduce((sum, tactic) => {
      const costValue = parseFloat(tactic.estimated_cost.replace(/[^0-9.-]+/g, ''));
      return sum + costValue;
    }, 0);
  }, [tacticsData]);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TableChartIcon 
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
            Tactics Detail
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Total Budget:
          </Typography>
          <Chip
            label={`$${totalCost.toLocaleString()}`}
            color="primary"
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </Box>
      
      <TableContainer 
        sx={{ 
          maxHeight: 400,
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        <Table stickyHeader aria-label="tactics table">
          <TableHead>
            <TableRow>
              <TableCell 
                width="50px"
                sx={{ 
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 600,
                }}
              />
              <TableCell 
                sx={{ 
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 600,
                }}
              >
                Tactic
              </TableCell>
              <TableCell 
                sx={{ 
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 600,
                }}
              >
                Strategy
              </TableCell>
              <TableCell 
                sx={{ 
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 600,
                }}
              >
                Platforms
              </TableCell>
              <TableCell 
                align="right"
                sx={{ 
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 600,
                }}
              >
                Est. Cost
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tacticsData.map((tactic, index) => (
              <TacticRow 
                key={`${tactic.strategyName}-${tactic.tactic_name}-${index}`} 
                tactic={tactic} 
                platformColors={PLATFORM_COLORS}
                defaultColor={DEFAULT_COLOR}
              />
            ))}
            {tacticsData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No tactics found. Please select a different strategy.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Click on a row to view detailed tactic information
        </Typography>
      </Box>
    </Paper>
  );
};

export default TacticsDetailTable;
