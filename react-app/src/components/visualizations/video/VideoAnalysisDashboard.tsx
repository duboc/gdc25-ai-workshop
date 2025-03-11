import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { VideoData } from '../../../types';
import BestPracticesComplianceChart from './BestPracticesComplianceChart';
import CriteriaDetailTable from './CriteriaDetailTable';
import LoadingTimeAnalysisChart from './LoadingTimeAnalysisChart';
import UserExperienceScorecard from './UserExperienceScorecard';
import JsonInput from '../../common/JsonInput';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useTheme } from '@mui/material';

interface VideoAnalysisDashboardProps {
  data: VideoData | null;
}

const VideoAnalysisDashboard: React.FC<VideoAnalysisDashboardProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedCriterion, setSelectedCriterion] = useState<string | null>(null);
  
  // Handle criterion selection
  const handleCriterionSelect = (criterionName: string | null) => {
    setSelectedCriterion(criterionName);
  };
  
  // Empty state when no data is available
  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <JsonInput tabId="video" />
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: '16px',
            border: '2px dashed rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <VideocamIcon 
            sx={{ 
              fontSize: 80, 
              color: 'rgba(124, 77, 255, 0.2)',
              mb: 2
            }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            No Video Analysis Data Available
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mt: 1,
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            Please paste JSON data in the DATA CONSOLE above to visualize FTUE video analysis.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <JsonInput tabId="video" />
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 3,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 50%, rgba(124, 77, 255, 0.03) 0%, transparent 70%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <VideocamIcon 
            sx={{ 
              fontSize: '2.5rem', 
              mr: 2,
              color: theme.palette.primary.light,
              filter: 'drop-shadow(0 0 8px rgba(179, 136, 255, 0.5))'
            }} 
          />
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: 'linear-gradient(45deg, #B388FF 30%, #00E5FF 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              filter: 'drop-shadow(0 0 2px rgba(179, 136, 255, 0.5))',
            }}
          >
            FTUE VIDEO ANALYSIS
          </Typography>
        </Box>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: theme.palette.text.secondary,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            pl: 2,
            py: 1,
            backgroundColor: 'rgba(124, 77, 255, 0.1)',
            borderRadius: '0 8px 8px 0',
          }}
        >
          This dashboard presents a comprehensive analysis of First Time User Experience (FTUE) based on video recordings.
          The analysis covers key aspects like loading times, tutorial experience, permissions handling, and overall user interface clarity.
          Click on a criterion in the charts below to filter the data and explore specific details.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
            }}
          >
            {selectedCriterion ? `Showing details for: ${selectedCriterion}` : 'Showing all criteria'}
          </Typography>
          
          {selectedCriterion && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.primary.main,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
              onClick={() => handleCriterionSelect(null)}
            >
              Clear selection
            </Typography>
          )}
        </Box>
      </Paper>
      
      <UserExperienceScorecard data={data} />
      
      <BestPracticesComplianceChart 
        criteria={data.ftueAnalysis} 
        onCriterionSelect={handleCriterionSelect}
        selectedCriterion={selectedCriterion}
      />
      
      <LoadingTimeAnalysisChart 
        criteria={data.ftueAnalysis}
        selectedCriterion={selectedCriterion}
      />
      
      <CriteriaDetailTable 
        criteria={data.ftueAnalysis}
        selectedCriterion={selectedCriterion}
      />
    </Box>
  );
};

export default VideoAnalysisDashboard;
