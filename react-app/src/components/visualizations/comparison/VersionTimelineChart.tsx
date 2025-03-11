import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { VersionData } from '../../../types';

interface VersionTimelineChartProps {
  versions: VersionData[];
  bestVersion: string;
  worstVersion: string;
}

const VersionTimelineChart: React.FC<VersionTimelineChartProps> = ({
  versions,
  bestVersion,
  worstVersion,
}) => {
  const theme = useTheme();

  // Sort versions by version number (assuming version numbers are in format like "1.0", "1.1", etc.)
  const sortedVersions = [...versions].sort((a, b) => {
    const versionA = parseFloat(a.versao_aplicativo);
    const versionB = parseFloat(b.versao_aplicativo);
    return versionA - versionB;
  });

  // Transform the version data for the chart
  const chartData = sortedVersions.map((version) => ({
    version: version.versao_aplicativo,
    score: version.score_sentimento_positivo,
    sentiment: version.sentimento,
    summary: version.resumo_sentimento,
    isBest: version.versao_aplicativo === bestVersion,
    isWorst: version.versao_aplicativo === worstVersion,
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
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              color: data.isBest
                ? theme.palette.success.light
                : data.isWorst
                ? theme.palette.error.light
                : theme.palette.primary.light,
            }}
          >
            Version {label}
            {data.isBest && (
              <Box
                component="span"
                sx={{
                  ml: 1,
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: theme.palette.success.light,
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  fontWeight: 'bold',
                }}
              >
                BEST
              </Box>
            )}
            {data.isWorst && (
              <Box
                component="span"
                sx={{
                  ml: 1,
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(244, 63, 94, 0.1)',
                  color: theme.palette.error.light,
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  fontWeight: 'bold',
                }}
              >
                WORST
              </Box>
            )}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              p: 1,
              borderRadius: '4px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mr: 1,
                fontWeight: 'bold',
              }}
            >
              Sentiment Score:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  data.score >= 7
                    ? theme.palette.success.light
                    : data.score >= 5
                    ? theme.palette.warning.light
                    : theme.palette.error.light,
                fontWeight: 'bold',
              }}
            >
              {data.score}/10
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 1,
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
            }}
          >
            {data.sentiment.charAt(0).toUpperCase() + data.sentiment.slice(1)}{' '}
            sentiment
          </Typography>
          <Typography variant="body2">
            {data.summary.length > 150
              ? data.summary.substring(0, 150) + '...'
              : data.summary}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  // Calculate average score for reference line
  const averageScore =
    chartData.reduce((sum, item) => sum + item.score, 0) / chartData.length;

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        height: 400,
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        background: '#FFFFFF',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        Version Sentiment Timeline
      </Typography>
      <Box sx={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 0, 0, 0.06)"
            />
            <XAxis
              dataKey="version"
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.06)' }}
            />
            <YAxis
              domain={[0, 10]}
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.06)' }}
              label={{
                value: 'Sentiment Score',
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
            <ReferenceLine
              y={averageScore}
              stroke={theme.palette.warning.main}
              strokeDasharray="3 3"
              label={{
                value: `Avg: ${averageScore.toFixed(1)}`,
                position: 'right',
                fill: theme.palette.warning.main,
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              name="Sentiment Score"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                const isBest = payload.isBest;
                const isWorst = payload.isWorst;

                if (isBest) {
                  return (
                    <svg
                      x={cx - 10}
                      y={cy - 10}
                      width={20}
                      height={20}
                      fill={theme.palette.success.main}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  );
                }

                if (isWorst) {
                  return (
                    <svg
                      x={cx - 10}
                      y={cy - 10}
                      width={20}
                      height={20}
                      fill={theme.palette.error.main}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                    </svg>
                  );
                }

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={theme.palette.background.paper}
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{ r: 8, fill: theme.palette.secondary.main }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default VersionTimelineChart;
