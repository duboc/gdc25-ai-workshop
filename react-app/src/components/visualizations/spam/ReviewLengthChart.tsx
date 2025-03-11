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
import { ReviewLength } from '../../../types';

interface ReviewLengthChartProps {
  reviewLength: ReviewLength;
}

const ReviewLengthChart: React.FC<ReviewLengthChartProps> = ({ 
  reviewLength 
}) => {
  const theme = useTheme();

  // Transform the review length data for the chart
  const chartData = [
    { 
      name: 'Very Short', 
      range: reviewLength.distribution.very_short.range,
      count: reviewLength.distribution.very_short.count
    },
    { 
      name: 'Short', 
      range: reviewLength.distribution.short.range,
      count: reviewLength.distribution.short.count
    },
    { 
      name: 'Medium', 
      range: reviewLength.distribution.medium.range,
      count: reviewLength.distribution.medium.count
    },
    { 
      name: 'Long', 
      range: reviewLength.distribution.long.range,
      count: reviewLength.distribution.long.count
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
        Review Length Distribution
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Average Length: {reviewLength.average_chars} characters | Median Length: {reviewLength.median_chars} characters
        </Typography>
      </Box>
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
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ 
                value: 'Number of Reviews', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip
              formatter={(value, name, props) => {
                if (name === 'Count') {
                  return [value, 'Reviews'];
                }
                return [value, name];
              }}
              labelFormatter={(label) => {
                const item = chartData.find(d => d.name === label);
                return `${label} (${item?.range} chars)`;
              }}
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            />
            <Legend />
            <Bar 
              dataKey="count" 
              name="Count" 
              fill={theme.palette.primary.main}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ReviewLengthChart;
