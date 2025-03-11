import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { RatingDistribution } from '../../../types';

interface RatingDistributionChartProps {
  ratingDistribution: RatingDistribution;
}

const RatingDistributionChart: React.FC<RatingDistributionChartProps> = ({ 
  ratingDistribution 
}) => {
  const theme = useTheme();

  // Transform the rating distribution data for the chart
  const chartData = [
    { 
      name: '1 Star', 
      count: ratingDistribution['1_star'].count,
      percentage: ratingDistribution['1_star'].percentage
    },
    { 
      name: '2 Star', 
      count: ratingDistribution['2_star'].count,
      percentage: ratingDistribution['2_star'].percentage
    },
    { 
      name: '3 Star', 
      count: ratingDistribution['3_star'].count,
      percentage: ratingDistribution['3_star'].percentage
    },
    { 
      name: '4 Star', 
      count: ratingDistribution['4_star'].count,
      percentage: ratingDistribution['4_star'].percentage
    },
    { 
      name: '5 Star', 
      count: ratingDistribution['5_star'].count,
      percentage: ratingDistribution['5_star'].percentage
    }
  ];

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        height: 400, 
        mb: 3,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Rating Distribution
      </Typography>
      <Box sx={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke={theme.palette.primary.main} />
            <YAxis yAxisId="right" orientation="right" stroke={theme.palette.secondary.main} />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'Count') return [value, 'Count'];
                if (name === 'Percentage') return [`${value}%`, 'Percentage'];
                return [value, name];
              }}
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            />
            <Legend />
            <Bar 
              yAxisId="left" 
              dataKey="count" 
              name="Count" 
              fill={theme.palette.primary.main} 
            />
            <Bar 
              yAxisId="right" 
              dataKey="percentage" 
              name="Percentage" 
              fill={theme.palette.secondary.main} 
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default RatingDistributionChart;
