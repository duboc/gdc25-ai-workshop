import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { Problem } from '../../../types';

interface ProblemFrequencyChartProps {
  problems: Problem[];
}

const ProblemFrequencyChart: React.FC<ProblemFrequencyChartProps> = ({ problems }) => {
  const theme = useTheme();

  // Sort problems by frequency in descending order
  const sortedProblems = [...problems].sort((a, b) => b.frequency - a.frequency);

  // Map severity to color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return theme.palette.error.main;
      case 'Major':
        return theme.palette.warning.main;
      case 'Minor':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  // Prepare data for the chart
  const chartData = sortedProblems.map(problem => ({
    name: problem.category,
    frequency: problem.frequency,
    severity: problem.severity,
    color: getSeverityColor(problem.severity)
  }));

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
        Problem Frequency by Category
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
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              label={{ 
                value: 'Frequency', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }} 
            />
            <Tooltip
              formatter={(value, name) => [value, 'Frequency']}
              labelFormatter={(label) => `Category: ${label}`}
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            />
            <Legend />
            <Bar 
              dataKey="frequency" 
              name="Frequency" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ProblemFrequencyChart;
