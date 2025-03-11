import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { PeriodTrend } from '../../../types';

interface ProblemTrendAnalysisProps {
  periodTrends: PeriodTrend[];
  summary: string;
}

const ProblemTrendAnalysis: React.FC<ProblemTrendAnalysisProps> = ({ 
  periodTrends,
  summary
}) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        mb: 3,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Sentiment Trend Analysis
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {summary}
      </Typography>
      
      <Box sx={{ height: 300, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={periodTrends}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis 
              label={{ 
                value: 'Percentage', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, '']}
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="positive_percentage"
              name="Positive"
              stroke={theme.palette.success.main}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="negative_percentage"
              name="Negative"
              stroke={theme.palette.error.main}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="neutral_percentage"
              name="Neutral"
              stroke={theme.palette.info.main}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ProblemTrendAnalysis;
