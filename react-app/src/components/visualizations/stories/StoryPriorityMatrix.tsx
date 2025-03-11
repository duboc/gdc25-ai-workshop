import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  useTheme,
  Tooltip,
} from '@mui/material';
import { UserStory, Theme } from '../../../types';
import GridViewIcon from '@mui/icons-material/GridView';

interface StoryPriorityMatrixProps {
  themes: Theme[];
  selectedTheme: string | null;
}

// Define priority levels and their order
const PRIORITY_LEVELS = ['High', 'Medium', 'Low'];

// Define story point ranges
const STORY_POINT_RANGES = [
  { label: 'Small (1-3)', min: 1, max: 3 },
  { label: 'Medium (5-8)', min: 5, max: 8 },
  { label: 'Large (13+)', min: 13, max: Infinity },
];

const StoryPriorityMatrix: React.FC<StoryPriorityMatrixProps> = ({
  themes,
  selectedTheme,
}) => {
  const theme = useTheme();

  // Define colors for each theme
  const THEME_COLORS: Record<string, string> = {
    'Control Issues': '#8884d8',
    '"Do You Want to Quit STK" Bug': '#82ca9d',
    'Performance Optimization': '#ffc658',
    'UI/UX Improvements': '#ff8042',
    'Multiplayer Functionality': '#0088fe',
    // Add more theme colors as needed
  };

  // Filter stories based on selected theme
  const filteredThemes = selectedTheme
    ? themes.filter((t) => t.name === selectedTheme)
    : themes;

  // Flatten all stories from filtered themes
  const allStories = filteredThemes.flatMap((t) =>
    t.stories.map((story) => ({
      ...story,
      themeName: t.name,
      themeColor: THEME_COLORS[t.name] || '#8884d8', // Default color if not found
    }))
  );

  // Group stories by priority and story point range
  const storyMatrix: Record<
    string,
    Record<string, Array<UserStory & { themeName: string; themeColor: string }>>
  > = {};

  // Initialize the matrix
  PRIORITY_LEVELS.forEach((priority) => {
    storyMatrix[priority] = {};
    STORY_POINT_RANGES.forEach((range) => {
      storyMatrix[priority][range.label] = [];
    });
  });

  // Fill the matrix with stories
  allStories.forEach((story) => {
    const priority = story.priority;
    const points = story.story_points;

    // Find the appropriate story point range
    const range = STORY_POINT_RANGES.find((r) => points >= r.min && points <= r.max);

    if (range && storyMatrix[priority]) {
      storyMatrix[priority][range.label].push(story);
    }
  });

  // Render a story card
  const renderStoryCard = (
    story: UserStory & { themeName: string; themeColor: string }
  ) => {
    return (
      <Tooltip
        key={`${story.themeName}-${story.as_a}-${story.i_want}`}
        title={
          <Box>
            <Typography variant="subtitle2">As a {story.as_a}</Typography>
            <Typography variant="body2">I want {story.i_want}</Typography>
            <Typography variant="body2">So that {story.so_that}</Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                Acceptance Criteria:
              </Typography>
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
                {story.acceptance_criteria.slice(0, 3).map((criteria, idx) => (
                  <li key={idx}>
                    <Typography variant="caption">{criteria}</Typography>
                  </li>
                ))}
                {story.acceptance_criteria.length > 3 && (
                  <Typography variant="caption">
                    +{story.acceptance_criteria.length - 3} more criteria
                  </Typography>
                )}
              </ul>
            </Box>
          </Box>
        }
        arrow
        placement="top"
      >
        <Box
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: '8px',
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${story.themeColor}30`,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              boxShadow: `0 0 8px ${story.themeColor}50`,
            },
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
          >
            <Chip
              label={`${story.story_points} pts`}
              size="small"
              sx={{
                backgroundColor: `${story.themeColor}20`,
                color: story.themeColor,
                fontWeight: 'bold',
                fontSize: '0.7rem',
              }}
            />
            <Chip
              label={story.themeName}
              size="small"
              sx={{
                backgroundColor: `${story.themeColor}20`,
                color: story.themeColor,
                fontWeight: 'bold',
                fontSize: '0.7rem',
                maxWidth: 100,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {story.as_a}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {story.i_want}
          </Typography>
        </Box>
      </Tooltip>
    );
  };

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
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <GridViewIcon
          sx={{
            mr: 1.5,
            color: theme.palette.primary.main,
            filter: 'drop-shadow(0 0 2px rgba(165, 180, 252, 0.3))',
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
          Story Priority Matrix
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Column headers (story point ranges) */}
        <Grid item xs={2}>
          {/* Empty cell for the corner */}
        </Grid>
        {STORY_POINT_RANGES.map((range) => (
          <Grid item xs={10 / STORY_POINT_RANGES.length} key={range.label}>
            <Box
              sx={{
                p: 1,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px 8px 0 0',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: 'none',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                }}
              >
                {range.label}
              </Typography>
            </Box>
          </Grid>
        ))}

        {/* Matrix rows */}
        {PRIORITY_LEVELS.map((priority) => (
          <React.Fragment key={priority}>
            {/* Row header (priority) */}
            <Grid item xs={2}>
              <Box
                sx={{
                  p: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    priority === 'High'
                      ? 'rgba(244, 63, 94, 0.05)'
                      : priority === 'Medium'
                      ? 'rgba(245, 158, 11, 0.05)'
                      : 'rgba(16, 185, 129, 0.05)',
                  borderRadius: '8px 0 0 8px',
                  border: '1px solid',
                  borderColor:
                    priority === 'High'
                      ? 'rgba(244, 63, 94, 0.1)'
                      : priority === 'Medium'
                      ? 'rgba(245, 158, 11, 0.1)'
                      : 'rgba(16, 185, 129, 0.1)',
                  borderRight: 'none',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    color:
                      priority === 'High'
                        ? theme.palette.error.light
                        : priority === 'Medium'
                        ? theme.palette.warning.light
                        : theme.palette.success.light,
                  }}
                >
                  {priority} Priority
                </Typography>
              </Box>
            </Grid>

            {/* Matrix cells */}
            {STORY_POINT_RANGES.map((range) => (
              <Grid item xs={10 / STORY_POINT_RANGES.length} key={`${priority}-${range.label}`}>
                <Box
                  sx={{
                    p: 1,
                    minHeight: 150,
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    border: '1px solid rgba(0, 0, 0, 0.04)',
                    borderRadius: 0,
                    overflowY: 'auto',
                    maxHeight: 250,
                  }}
                >
                  {storyMatrix[priority][range.label].length > 0 ? (
                    storyMatrix[priority][range.label].map((story) =>
                      renderStoryCard(story)
                    )
                  ) : (
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.5,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        No stories
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default StoryPriorityMatrix;
