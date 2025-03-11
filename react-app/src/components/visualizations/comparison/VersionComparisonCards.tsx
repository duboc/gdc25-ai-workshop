import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Divider, 
  useTheme 
} from '@mui/material';
import { SentimentHighlight } from '../../../types';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

interface VersionComparisonCardsProps {
  bestVersion: SentimentHighlight;
  worstVersion: SentimentHighlight;
}

const VersionComparisonCards: React.FC<VersionComparisonCardsProps> = ({ 
  bestVersion,
  worstVersion
}) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: '12px',
        background: '#FFFFFF',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          gap: 1,
        }}
      >
        <CompareArrowsIcon 
          sx={{ 
            color: theme.palette.primary.main,
            filter: 'drop-shadow(0 0 2px rgba(165, 180, 252, 0.3))'
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
          Version Comparison
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Best Version Card */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3,
              height: '100%',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16,
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ThumbUpIcon 
                sx={{ 
                  color: theme.palette.success.light,
                  fontSize: '1.5rem'
                }} 
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: theme.palette.success.light,
                  fontWeight: 600,
                  letterSpacing: '0.1em'
                }}
              >
                BEST VERSION
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: theme.palette.success.light,
                  mb: 1
                }}
              >
                {bestVersion.versao_aplicativo}
              </Typography>
            </Box>
            
            <Divider 
              sx={{ 
                mb: 2,
                borderColor: 'rgba(16, 185, 129, 0.1)',
              }} 
            />
            
            <Typography 
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                lineHeight: 1.6,
                textShadow: 'none',
              }}
            >
              {bestVersion.resumo_sentimento}
            </Typography>
          </Paper>
        </Grid>
        
        {/* Worst Version Card */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3,
              height: '100%',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.05) 0%, rgba(244, 63, 94, 0.02) 100%)',
              border: '1px solid rgba(244, 63, 94, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16,
                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ThumbDownIcon 
                sx={{ 
                  color: theme.palette.error.light,
                  fontSize: '1.5rem'
                }} 
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: theme.palette.error.light,
                  fontWeight: 600,
                  letterSpacing: '0.1em'
                }}
              >
                NEEDS IMPROVEMENT
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: theme.palette.error.light,
                  mb: 1
                }}
              >
                {worstVersion.versao_aplicativo}
              </Typography>
            </Box>
            
            <Divider 
              sx={{ 
                mb: 2,
                borderColor: 'rgba(244, 63, 94, 0.1)',
              }} 
            />
            
            <Typography 
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                lineHeight: 1.6,
                textShadow: 'none',
              }}
            >
              {worstVersion.resumo_sentimento}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VersionComparisonCards;
