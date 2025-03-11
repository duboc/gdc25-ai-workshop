import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Chip,
  useTheme,
} from '@mui/material';
import { ProblemData } from '../../../types';
import ProblemFrequencyChart from './ProblemFrequencyChart';
import ProblemSeverityMatrix from './ProblemSeverityMatrix';
import ProblemDetailsTable from './ProblemDetailsTable';
import ProblemTrendAnalysis from './ProblemTrendAnalysis';
import JsonInput from '../../common/JsonInput';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import WarningIcon from '@mui/icons-material/Warning';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

interface ProblemAnalysisDashboardProps {
  data: ProblemData | null;
}

const ProblemAnalysisDashboard: React.FC<ProblemAnalysisDashboardProps> = ({
  data,
}) => {
  const theme = useTheme();

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <JsonInput tabId="problems" />
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: '16px',
            border: '2px dashed rgba(0, 0, 0, 0.1)',
            background: '#FFFFFF',
            backdropFilter: 'blur(8px)',
          }}
        >
          <SportsEsportsIcon
            sx={{
              fontSize: 80,
              color: 'rgba(99, 102, 241, 0.2)',
              mb: 2,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            No Player Feedback Data Available
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mt: 1,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            Please paste JSON data in the DATA CONSOLE above to visualize player
            feedback analysis.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <JsonInput tabId="problems" />

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: '16px',
          background: '#FFFFFF',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SportsEsportsIcon
            sx={{
              fontSize: '2.5rem',
              mr: 2,
              color: theme.palette.primary.main,
              filter: 'drop-shadow(0 0 4px rgba(165, 180, 252, 0.3))',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.02em',
              background: 'linear-gradient(45deg, #6366F1 30%, #14B8A6 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              filter: 'drop-shadow(0 0 1px rgba(99, 102, 241, 0.3))',
            }}
          >
            PLAYER FEEDBACK ANALYSIS
          </Typography>
        </Box>

        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: theme.palette.text.secondary,
            textShadow: 'none',
            borderLeft: `3px solid ${theme.palette.primary.main}`,
            pl: 2,
            py: 1,
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
            borderRadius: '0 8px 8px 0',
          }}
        >
          {data.executive_summary}
        </Typography>

        <Box
          sx={{
            mt: 4,
            mb: 2,
            p: 3,
            borderRadius: '12px',
            background: 'rgba(20, 184, 166, 0.05)',
            border: '1px solid rgba(20, 184, 166, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TipsAndUpdatesIcon
              sx={{
                mr: 1.5,
                color: theme.palette.secondary.main,
                filter: 'drop-shadow(0 0 2px rgba(94, 234, 212, 0.3))',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              POWER-UPS & STRATEGIES
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {data.actionable_insights.map((insight, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    p: 2,
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.04)',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(20, 184, 166, 0.1)',
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 700,
                        color: theme.palette.secondary.main,
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {insight}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ProblemFrequencyChart problems={data.problem_analysis.table} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProblemSeverityMatrix problems={data.problem_analysis.table} />
        </Grid>
        <Grid item xs={12}>
          <ProblemTrendAnalysis
            periodTrends={data.sentiment_trend_analysis.period_trends}
            summary={data.sentiment_trend_analysis.summary}
          />
        </Grid>
        <Grid item xs={12}>
          <ProblemDetailsTable problems={data.problem_analysis.table} />
        </Grid>
      </Grid>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          mt: 3,
          borderRadius: '16px',
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
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FormatListNumberedIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
          PLAYER FEEDBACK STATS
        </Typography>

        <Divider
          sx={{
            mb: 3,
            borderColor: 'rgba(0, 0, 0, 0.06)',
            '&::before, &::after': {
              borderColor: 'rgba(0, 0, 0, 0.06)',
            },
          }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(244, 63, 94, 0.05)',
                border: '1px solid rgba(244, 63, 94, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <WarningIcon
                sx={{
                  fontSize: '2rem',
                  color: theme.palette.error.light,
                  mb: 1,
                }}
              />
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Critical Issues
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: theme.palette.error.light,
                }}
              >
                {data.problem_analysis.critical_problems_count}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <GroupIcon
                sx={{
                  fontSize: '2rem',
                  color: theme.palette.primary.main,
                  mb: 1,
                }}
              />
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Affected Player Groups
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: 'center',
                }}
              >
                {data.problem_analysis.most_affected_segments.map(
                  (segment, index) => (
                    <Chip
                      key={index}
                      label={segment}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                      }}
                    />
                  )
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(20, 184, 166, 0.05)',
                border: '1px solid rgba(20, 184, 166, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 1, width: '100%' }}
              >
                <TimelineIcon
                  sx={{
                    fontSize: '1.5rem',
                    color: theme.palette.secondary.main,
                    mr: 1,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Trend Summary
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary,
                  lineHeight: 1.5,
                }}
              >
                {data.problem_analysis.trend_summary}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <FormatListNumberedIcon
                sx={{
                  fontSize: '2rem',
                  color: theme.palette.success.light,
                  mb: 1,
                }}
              />
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Total Issues Analyzed
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: theme.palette.success.light,
                }}
              >
                {data.problem_analysis.table.length}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProblemAnalysisDashboard;
