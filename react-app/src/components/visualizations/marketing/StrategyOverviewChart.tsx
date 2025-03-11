import React from 'react';
import {
  Paper,
  Typography,
  Box,
  useTheme,
  Chip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Strategy } from '../../../types';
import BarChartIcon from '@mui/icons-material/BarChart';

interface StrategyOverviewChartProps {
  strategies: Strategy[];
  onStrategySelect?: (strategyName: string | null) => void;
  selectedStrategy: string | null;
}

const StrategyOverviewChart: React.FC<StrategyOverviewChartProps> = ({
  strategies,
  onStrategySelect,
  selectedStrategy,
}) => {
  const theme = useTheme();

  // Define colors for each strategy
  const STRATEGY_COLORS = [
    '#8884d8', // purple
    '#82ca9d', // green
    '#ffc658', // yellow
    '#ff8042', // orange
    '#0088fe', // blue
    '#00C49F', // teal
    '#FFBB28', // amber
    '#FF8042', // coral
    '#a4de6c', // light green
    '#d0ed57', // lime
  ];

  // Calculate total tactics and estimated cost for each strategy
  const chartData = strategies.map((strategy, index) => {
    // Calculate total estimated cost
    const totalCost = strategy.tactics.reduce((sum, tactic) => {
      const costString = tactic.estimated_cost;
      // Extract numeric value from cost string (e.g., "$5,000" -> 5000)
      const costValue = parseFloat(costString.replace(/[^0-9.-]+/g, ''));
      return sum + costValue;
    }, 0);

    return {
      name: strategy.strategy_name,
      tactics: strategy.tactics.length,
      cost: totalCost,
      color: STRATEGY_COLORS[index % STRATEGY_COLORS.length],
      description: strategy.description,
      metrics: strategy.measurement_metrics.length,
    };
  });

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            maxWidth: 300,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 700,
              mb: 1,
              color: data.color,
            }}
          >
            {data.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
            }}
          >
            {data.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>Tactics:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {data.tactics}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>Est. Cost:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              ${data.cost.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>Metrics:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {data.metrics}
            </Typography>
          </Box>
        </Paper>
      );
    }
    return null;
  };

  const handleBarClick = (data: any) => {
    if (onStrategySelect) {
      if (selectedStrategy === data.name) {
        onStrategySelect(null);
      } else {
        onStrategySelect(data.name);
      }
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        height: 400,
        mb: 3,
        borderRadius: '12px',
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BarChartIcon
            sx={{
              mr: 1.5,
              color: theme.palette.primary.light,
              filter: 'drop-shadow(0 0 3px rgba(179, 136, 255, 0.5))',
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
            Marketing Strategy Overview
          </Typography>
        </Box>

        {selectedStrategy && (
          <Chip
            label={`Viewing: ${selectedStrategy}`}
            onDelete={() => onStrategySelect && onStrategySelect(null)}
            color="primary"
            size="small"
            sx={{
              fontWeight: 'bold',
              '& .MuiChip-deleteIcon': {
                color: theme.palette.primary.light,
              },
            }}
          />
        )}
      </Box>

      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
            barSize={40}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 0, 0, 0.1)"
            />
            <XAxis
              dataKey="name"
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
              tickLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
              height={60}
              tickFormatter={(value) => {
                // Truncate long strategy names
                return value.length > 15 ? `${value.substring(0, 15)}...` : value;
              }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
              tickLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              label={{
                value: 'Estimated Cost ($)',
                angle: -90,
                position: 'insideLeft',
                style: {
                  textAnchor: 'middle',
                  fill: theme.palette.text.secondary,
                  fontSize: '0.8rem',
                },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: '10px',
                color: theme.palette.text.secondary,
              }}
            />
            <Bar
              dataKey="cost"
              name="Estimated Cost"
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={handleBarClick}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === selectedStrategy
                      ? entry.color
                      : `${entry.color}80`
                  }
                  stroke={
                    entry.name === selectedStrategy
                      ? theme.palette.background.paper
                      : 'none'
                  }
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default StrategyOverviewChart;
