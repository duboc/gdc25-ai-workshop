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
import { FtueAnalysisCriterion } from '../../../types';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface BestPracticesComplianceChartProps {
  criteria: FtueAnalysisCriterion[];
  onCriterionSelect?: (criterionName: string | null) => void;
  selectedCriterion: string | null;
}

const BestPracticesComplianceChart: React.FC<BestPracticesComplianceChartProps> = ({
  criteria,
  onCriterionSelect,
  selectedCriterion,
}) => {
  const theme = useTheme();

  // Map compliance status to numeric values for visualization
  const getComplianceValue = (status: string): number => {
    switch (status) {
      case 'Yes': return 100;
      case 'Partial': return 50;
      case 'No': return 0;
      default: return -1; // Not Applicable
    }
  };

  // Define colors for compliance status
  const getComplianceColor = (status: string): string => {
    switch (status) {
      case 'Yes': return '#4CAF50'; // Green
      case 'Partial': return '#FFC107'; // Amber
      case 'No': return '#F44336'; // Red
      default: return '#9E9E9E'; // Grey for Not Applicable
    }
  };

  // Prepare data for the chart
  const chartData = criteria.map(item => ({
    name: item.criterion,
    value: getComplianceValue(item.meetsBestPractices),
    status: item.meetsBestPractices,
    color: getComplianceColor(item.meetsBestPractices),
    observations: item.observations,
    improvements: item.suggestedImprovements,
  }));

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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>Status:</Typography>
            <Chip 
              label={data.status} 
              size="small" 
              sx={{ 
                backgroundColor: data.color,
                color: '#fff',
                fontWeight: 'bold',
              }} 
            />
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

  const handleBarClick = (data: any) => {
    if (onCriterionSelect) {
      if (selectedCriterion === data.name) {
        onCriterionSelect(null);
      } else {
        onCriterionSelect(data.name);
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
          <AssessmentIcon
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
            Best Practices Compliance
          </Typography>
        </Box>

        {selectedCriterion && (
          <Chip
            label={`Viewing: ${selectedCriterion}`}
            onDelete={() => onCriterionSelect && onCriterionSelect(null)}
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
            barSize={20}
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 0, 0, 0.1)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => {
                if (value === 0) return 'No';
                if (value === 50) return 'Partial';
                if (value === 100) return 'Yes';
                return '';
              }}
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
              tickLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={150}
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
              tickLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
              tickFormatter={(value) => {
                // Truncate long criterion names
                return value.length > 20 ? `${value.substring(0, 20)}...` : value;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="value"
              name="Compliance Level"
              radius={[0, 4, 4, 0]}
              cursor="pointer"
              onClick={handleBarClick}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === selectedCriterion
                      ? entry.color
                      : `${entry.color}80`
                  }
                  stroke={
                    entry.name === selectedCriterion
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

export default BestPracticesComplianceChart;
