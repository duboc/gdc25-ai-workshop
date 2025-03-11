import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { UserStoriesData } from '../../../types';
import ThemeBreakdownChart from './ThemeBreakdownChart';
import StoryPriorityMatrix from './StoryPriorityMatrix';
import { UserStoryCards } from './UserStoryCards';
import JsonInput from '../../common/JsonInput';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useTheme } from '@mui/material';

interface UserStoriesDashboardProps {
  data: UserStoriesData | null;
}

const UserStoriesDashboard: React.FC<UserStoriesDashboardProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleThemeSelect = (themeName: string | null) => {
    setSelectedTheme(themeName);
  };

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <JsonInput tabId="stories" />
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
              color: 'rgba(0, 0, 0, 0.1)',
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
            No User Stories Data Available
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
            Please paste JSON data in the DATA CONSOLE above to visualize user
            stories.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <JsonInput tabId="stories" />

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
            USER STORIES ANALYSIS
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
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            pl: 2,
            py: 1,
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
            borderRadius: '0 8px 8px 0',
          }}
        >
          This dashboard presents user stories derived from player feedback.
          There are {data.summary.total_stories} user stories across{' '}
          {data.themes.length} themes, with a total of{' '}
          {data.summary.total_story_points} story points. Click on a theme in
          the chart below to filter the stories.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
            }}
          >
            {selectedTheme
              ? `Showing stories for: ${selectedTheme}`
              : 'Showing all themes'}
          </Typography>

          {selectedTheme && (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.main,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={() => handleThemeSelect(null)}
            >
              Clear selection
            </Typography>
          )}
        </Box>
      </Paper>

      <ThemeBreakdownChart
        themes={data.themes}
        themeBreakdown={data.summary.theme_breakdown}
        onThemeSelect={handleThemeSelect}
      />

      <StoryPriorityMatrix
        themes={data.themes}
        selectedTheme={selectedTheme}
      />

      <UserStoryCards
        themes={data.themes}
        selectedTheme={selectedTheme}
      />
    </Box>
  );
};

export default UserStoriesDashboard;
