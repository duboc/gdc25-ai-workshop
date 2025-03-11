import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ComparisonData } from '../../../types';
import VersionTimelineChart from './VersionTimelineChart';
import VersionComparisonCards from './VersionComparisonCards';
import VersionDetailTable from './VersionDetailTable';
import JsonInput from '../../common/JsonInput';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useTheme } from '@mui/material';

interface VersionComparisonDashboardProps {
  data: ComparisonData | null;
}

const VersionComparisonDashboard: React.FC<VersionComparisonDashboardProps> = ({
  data,
}) => {
  const theme = useTheme();

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <JsonInput tabId="version" />
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
            No Version Comparison Data Available
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
            Please paste JSON data in the DATA CONSOLE above to visualize
            version comparison analysis.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <JsonInput tabId="version" />

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
            VERSION COMPARISON ANALYSIS
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
          This dashboard compares sentiment across different versions of
          SuperTuxKart. Version {data.melhor_sentimento.versao_aplicativo} has
          the highest sentiment score, while version
          {data.pior_sentimento.versao_aplicativo} has the lowest. The analysis
          helps identify which updates were most positively received by players.
        </Typography>
      </Paper>

      <VersionTimelineChart
        versions={data.historico_versoes}
        bestVersion={data.melhor_sentimento.versao_aplicativo}
        worstVersion={data.pior_sentimento.versao_aplicativo}
      />

      <VersionComparisonCards
        bestVersion={data.melhor_sentimento}
        worstVersion={data.pior_sentimento}
      />

      <VersionDetailTable
        versions={data.historico_versoes}
        bestVersion={data.melhor_sentimento.versao_aplicativo}
        worstVersion={data.pior_sentimento.versao_aplicativo}
      />
    </Box>
  );
};

export default VersionComparisonDashboard;
