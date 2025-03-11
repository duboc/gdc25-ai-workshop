import React from 'react';
import {
  Paper,
  Typography,
  Box,
  useTheme,
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
  ReferenceLine,
  Cell,
} from 'recharts';
import { FtueAnalysisCriterion } from '../../../types';
import TimerIcon from '@mui/icons-material/Timer';

interface LoadingTimeAnalysisChartProps {
  criteria: FtueAnalysisCriterion[];
  selectedCriterion: string | null;
}

const LoadingTimeAnalysisChart: React.FC<LoadingTimeAnalysisChartProps> = ({
  criteria,
  selectedCriterion,
}) => {
  const theme = useTheme();

  // Filter criteria that have time-related metrics
  const timeRelatedCriteria = criteria.filter(
    criterion => 
      criterion.numericalValue.timeInSeconds !== undefined || 
      criterion.numericalValue.maxDurationInSeconds !== undefined
  );

  // Prepare data for the chart
  const chartData = timeRelatedCriteria.map(item => {
    const timeValue = item.numericalValue.timeInSeconds || item.numericalValue.maxDurationInSeconds || 0;
    
    // Determine color based on time value (green for fast, red for slow)
    let color = '#4CAF50'; // Default green
    if (timeValue > 5) color = '#FFC107'; // Amber for medium
    if (timeValue > 10) color = '#F44336'; // Red for slow
    
    return {
      name: item.criterion,
      value: timeValue,
      color: color,
      observations: item.observations,
      improvements: item.suggestedImprovements,
      isSelected: item.criterion === selectedCriterion,
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>Time:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {data.value.toFixed(1)} seconds
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: theme.palette.text.secondary,
            }}
          >
            {data.observations}
          </Typography>
          {data.improvements && (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontStyle: 'italic',
              }}
            >
              <strong>Improvements:</strong> {data.improvements}
            </Typography>
          )}
        </Paper>
      );
    }
    return null;
  };

  // If no time-related criteria, show a message
  if (chartData.length === 0) {
    return null;
  }

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
          <TimerIcon
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
            Loading Time Analysis
          </Typography>
        </Box>
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
                // Truncate long criterion names
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
              label={{
                value: 'Time (seconds)',
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
            <Legend />
            <ReferenceLine y={3} stroke="#4CAF50" strokeDasharray="3 3" label="Good" />
            <ReferenceLine y={8} stroke="#FFC107" strokeDasharray="3 3" label="Acceptable" />
            <ReferenceLine y={12} stroke="#F44336" strokeDasharray="3 3" label="Poor" />
            <Bar
              dataKey="value"
              name="Time (seconds)"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isSelected
                      ? entry.color
                      : `${entry.color}80`
                  }
                  stroke={
                    entry.isSelected
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

export default LoadingTimeAnalysisChart;
