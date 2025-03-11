import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Paper,
  Typography,
  Box,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { Theme, ThemeBreakdown } from '../../../types';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

interface ThemeBreakdownChartProps {
  themes: Theme[];
  themeBreakdown: ThemeBreakdown;
  onThemeSelect?: (themeName: string | null) => void;
}

const ThemeBreakdownChart: React.FC<ThemeBreakdownChartProps> = ({
  themes,
  themeBreakdown,
  onThemeSelect,
}) => {
  const theme = useTheme();
  const [chartType, setChartType] = useState<'pie' | 'donut'>('donut');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Define colors for each theme
  const THEME_COLORS = [
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

  // Transform the theme breakdown data for the chart
  const chartData = Object.entries(themeBreakdown).map(
    ([name, points], index) => ({
      name,
      value: points,
      color: THEME_COLORS[index % THEME_COLORS.length],
      stories: themes.find((t) => t.name === name)?.stories.length || 0,
    })
  );

  const handleChartTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: 'pie' | 'donut' | null
  ) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  const handlePieClick = (_data: any, index: number) => {
    if (onThemeSelect) {
      if (activeIndex === index) {
        // If clicking the same slice, deselect it
        setActiveIndex(null);
        onThemeSelect(null);
      } else {
        // Select the clicked slice
        setActiveIndex(index);
        onThemeSelect(chartData[index].name);
      }
    }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
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
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              mb: 1,
              color: data.color,
            }}
          >
            {data.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.5,
            }}
          >
            <Typography variant="body2" sx={{ mr: 2 }}>
              Story Points:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {data.value}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              User Stories:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {data.stories}
            </Typography>
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
          mt: 2,
        }}
      >
        {payload.map((entry: any, index: number) => (
          <Box
            key={`legend-${index}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              px: 1,
              py: 0.5,
              cursor: 'pointer',
              border:
                activeIndex === index
                  ? `1px solid ${entry.color}`
                  : '1px solid transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
            onClick={() => handlePieClick(null, index)}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: entry.color,
                borderRadius: '2px',
                mr: 1,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color:
                  activeIndex === index
                    ? entry.color
                    : theme.palette.text.primary,
                fontWeight: activeIndex === index ? 'bold' : 'normal',
              }}
            >
              {entry.name}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        height: 400,
        mb: 3,
        borderRadius: '12px',
        background: '#FFFFFF',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
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
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          Theme Breakdown by Story Points
        </Typography>

        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '& .MuiToggleButton-root': {
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
              },
            },
          }}
        >
          <ToggleButton value="pie">
            <PieChartIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="donut">
            <DonutLargeIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={chartType === 'pie' ? 100 : 100}
              innerRadius={chartType === 'pie' ? 0 : 60}
              fill="#8884d8"
              dataKey="value"
              onClick={handlePieClick}
              activeIndex={activeIndex !== null ? [activeIndex] : []}
              activeShape={(props: any) => {
                const RADIAN = Math.PI / 180;
                const {
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  startAngle,
                  endAngle,
                  fill,
                  percent,
                  name,
                } = props;
                const sin = Math.sin(-RADIAN * midAngle);
                const cos = Math.cos(-RADIAN * midAngle);
                const sx = cx + (outerRadius + 10) * cos;
                const sy = cy + (outerRadius + 10) * sin;
                const mx = cx + (outerRadius + 30) * cos;
                const my = cy + (outerRadius + 30) * sin;
                const ex = mx + (cos >= 0 ? 1 : -1) * 22;
                const ey = my;
                const textAnchor = cos >= 0 ? 'start' : 'end';

                return (
                  <g>
                    <text
                      x={cx}
                      y={cy}
                      dy={8}
                      textAnchor="middle"
                      fill={fill}
                      style={{ fontWeight: 'bold' }}
                    >
                      {name}
                    </text>
                    <path
                      d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                      stroke={fill}
                      fill="none"
                    />
                    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                    <text
                      x={ex + (cos >= 0 ? 1 : -1) * 12}
                      y={ey}
                      textAnchor={textAnchor}
                      fill="#999"
                    >{`${(percent * 100).toFixed(0)}%`}</text>
                  </g>
                );
              }}
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
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ThemeBreakdownChart;
