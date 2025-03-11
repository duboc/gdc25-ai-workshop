import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ZAxis,
  Cell
} from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { Problem } from '../../../types';

interface ProblemSeverityMatrixProps {
  problems: Problem[];
}

const ProblemSeverityMatrix: React.FC<ProblemSeverityMatrixProps> = ({ problems }) => {
  const theme = useTheme();

  // Map severity to numeric value and color
  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return { value: 3, color: theme.palette.error.main };
      case 'Major':
        return { value: 2, color: theme.palette.warning.main };
      case 'Minor':
        return { value: 1, color: theme.palette.info.main };
      default:
        return { value: 0, color: theme.palette.primary.main };
    }
  };

  // Prepare data for the scatter plot
  const chartData = problems.map(problem => {
    const severityInfo = getSeverityInfo(problem.severity);
    return {
      name: problem.category,
      frequency: problem.frequency,
      severity: severityInfo.value,
      severityLabel: problem.severity,
      color: severityInfo.color,
      z: 10, // Size of the dot
    };
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper elevation={3} sx={{ p: 1.5, maxWidth: 250 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {data.name}
          </Typography>
          <Typography variant="body2">
            Frequency: {data.frequency}
          </Typography>
          <Typography variant="body2">
            Severity: {data.severityLabel}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

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
        Problem Severity Matrix
      </Typography>
      <Box sx={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis 
              type="number" 
              dataKey="frequency" 
              name="Frequency" 
              label={{ 
                value: 'Frequency', 
                position: 'insideBottom', 
                offset: -10 
              }}
              domain={[0, 'dataMax + 5']}
            />
            <YAxis 
              type="number" 
              dataKey="severity" 
              name="Severity" 
              label={{ 
                value: 'Severity', 
                angle: -90, 
                position: 'insideLeft' 
              }}
              domain={[0, 4]}
              ticks={[1, 2, 3]}
              tickFormatter={(value) => {
                switch (value) {
                  case 1: return 'Minor';
                  case 2: return 'Major';
                  case 3: return 'Critical';
                  default: return '';
                }
              }}
            />
            <ZAxis type="number" dataKey="z" range={[60, 400]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter name="Problems" data={chartData}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ProblemSeverityMatrix;
