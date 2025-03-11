import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Theme } from '../../../types';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface UserStoryCardsProps {
  themes: Theme[];
  selectedTheme: string | null;
}

export const UserStoryCards: React.FC<UserStoryCardsProps> = ({ 
  themes,
  selectedTheme
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

  // Filter themes based on selection
  const filteredThemes = selectedTheme 
    ? themes.filter(t => t.name === selectedTheme) 
    : themes;

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return theme.palette.error;
      case 'Medium':
        return theme.palette.warning;
      case 'Low':
        return theme.palette.success;
      default:
        return theme.palette.primary;
    }
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
        <AssignmentIcon 
          sx={{ 
            mr: 1.5, 
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
          User Story Details
        </Typography>
      </Box>
      
      {filteredThemes.map((themeItem) => (
        <Box key={themeItem.name} sx={{ mb: 4 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              p: 1,
              borderRadius: '8px',
              backgroundColor: `${THEME_COLORS[themeItem.name] || '#8884d8'}15`,
            }}
          >
            <Box 
              sx={{ 
                width: 16, 
                height: 16, 
                backgroundColor: THEME_COLORS[themeItem.name] || '#8884d8',
                borderRadius: '4px',
                mr: 1.5
              }} 
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                color: THEME_COLORS[themeItem.name] || '#8884d8',
              }}
            >
              {themeItem.name}
            </Typography>
          </Box>
          
          {themeItem.stories.map((story, storyIndex) => (
            <Accordion 
              key={`${themeItem.name}-story-${storyIndex}`}
              sx={{
                mb: 2,
                backgroundColor: theme.palette.background.paper,
                backgroundImage: 'none',
                borderRadius: '8px',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '0 0 16px 0',
                  borderRadius: '8px',
                  boxShadow: `0 0 10px ${THEME_COLORS[themeItem.name] || '#8884d8'}30`,
                },
                border: `1px solid ${THEME_COLORS[themeItem.name] || '#8884d8'}30`,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon 
                    sx={{ 
                      color: THEME_COLORS[themeItem.name] || '#8884d8'
                    }} 
                  />
                }
                sx={{ 
                  borderRadius: '8px',
                  '&.Mui-expanded': {
                    borderRadius: '8px 8px 0 0',
                  },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        label={`${story.story_points} pts`}
                        size="small"
                        sx={{
                          backgroundColor: `${THEME_COLORS[themeItem.name] || '#8884d8'}20`,
                          color: THEME_COLORS[themeItem.name] || '#8884d8',
                          fontWeight: 'bold',
                          mr: 1,
                        }}
                      />
                      <Chip
                        label={story.priority}
                        size="small"
                        sx={{
                          backgroundColor: `${getPriorityColor(story.priority).main}20`,
                          color: getPriorityColor(story.priority).main,
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        fontStyle: 'italic',
                      }}
                    >
                      {story.supporting_reviews.length > 0 ? `${story.supporting_reviews.length} supporting reviews` : 'No supporting reviews'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PersonIcon 
                      sx={{ 
                        mr: 1, 
                        mt: 0.5,
                        color: theme.palette.text.secondary,
                        fontSize: '1.2rem',
                      }} 
                    />
                    <Typography 
                      variant="body1"
                      sx={{ 
                        fontWeight: 600,
                      }}
                    >
                      As a {story.as_a}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                    <LightbulbIcon 
                      sx={{ 
                        mr: 1, 
                        mt: 0.5,
                        color: theme.palette.text.secondary,
                        fontSize: '1.2rem',
                      }} 
                    />
                    <Typography 
                      variant="body2"
                      sx={{ 
                        color: theme.palette.text.secondary,
                      }}
                    >
                      I want {story.i_want}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              
              <AccordionDetails sx={{ pt: 0 }}>
                <Divider 
                  sx={{ 
                    my: 2,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  }} 
                />
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <SettingsIcon 
                    sx={{ 
                      mr: 1, 
                      mt: 0.5,
                      color: theme.palette.text.secondary,
                      fontSize: '1.2rem',
                    }} 
                  />
                  <Typography variant="body2">
                    So that {story.so_that}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 1,
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  Acceptance Criteria
                </Typography>
                
                <List 
                  dense 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    mb: 2,
                  }}
                >
                  {story.acceptance_criteria.map((criteria, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon 
                          fontSize="small" 
                          sx={{ 
                            color: theme.palette.success.main
                          }} 
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={criteria} 
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          sx: { 
                            color: theme.palette.text.primary
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                {story.supporting_reviews.length > 0 && (
                  <>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        mb: 1,
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}
                    >
                      Supporting Reviews
                    </Typography>
                    
                    <List 
                      dense 
                      sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: '8px',
                      }}
                    >
                      {story.supporting_reviews.map((review, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <FormatQuoteIcon 
                              fontSize="small" 
                              sx={{ 
                                color: theme.palette.info.main
                              }} 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={review} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              sx: { 
                                fontStyle: 'italic',
                                color: theme.palette.text.secondary
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
      
      {filteredThemes.length === 0 && (
        <Box 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '8px',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No themes selected. Please select a theme from the chart above to view user stories.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
