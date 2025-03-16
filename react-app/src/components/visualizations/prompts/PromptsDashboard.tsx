import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Divider,
  Chip,
  useTheme,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material';
import { PromptData } from '../../../types/promptsTypes';
import ReactMarkdown from 'react-markdown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PromptsDashboardProps {
  data: PromptData | null;
}

const PromptsDashboard: React.FC<PromptsDashboardProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  if (!data || !data.prompts || data.prompts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          No prompts available
        </Typography>
      </Box>
    );
  }

  const handleCopyPrompt = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setCopySuccess('Failed to copy');
      });
  };

  const filteredPrompts = data.prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPromptData = selectedPrompt 
    ? data.prompts.find(p => p.id === selectedPrompt) 
    : null;

  return (
    <Box sx={{ p: 3 }}>
      {!selectedPrompt ? (
        // Prompts list view
        <>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 700,
                mb: 1
              }}
            >
              AI Prompts Library
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Browse and use these pre-crafted prompts for different analysis tasks
            </Typography>
            
            <TextField
              fullWidth
              placeholder="Search prompts..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {filteredPrompts.map((prompt) => (
              <Grid item xs={12} sm={6} md={4} key={prompt.id}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(124, 77, 255, 0.2)',
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => setSelectedPrompt(prompt.id)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        sx={{ 
                          mb: 1,
                          fontWeight: 600,
                          color: theme.palette.primary.main
                        }}
                      >
                        {prompt.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {prompt.content.split('\n').slice(1, 4).join(' ').substring(0, 120)}...
                      </Typography>
                      
                      <Box sx={{ mt: 'auto', pt: 1 }}>
                        <Chip 
                          label={`Prompt ${prompt.id.split('_')[0]}`}
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(124, 77, 255, 0.1)',
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        // Single prompt detail view
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => setSelectedPrompt(null)}
              sx={{ 
                mr: 2,
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              Back to Library
            </Button>
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 700,
                flexGrow: 1
              }}
            >
              {selectedPromptData?.title}
            </Typography>
            
            <Tooltip title={copySuccess || "Copy prompt"}>
              <IconButton 
                onClick={() => selectedPromptData && handleCopyPrompt(selectedPromptData.content)}
                color="primary"
                sx={{ 
                  ml: 2,
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(124, 77, 255, 0.2)',
                  }
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Chip 
                label={`Prompt ${selectedPromptData?.id.split('_')[0]}`}
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  mb: 2
                }}
              />
              
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ 
                '& h1': { 
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.primary.main
                },
                '& h2': { 
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  mb: 1.5,
                  mt: 3
                },
                '& h3': { 
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  mb: 1,
                  mt: 2.5
                },
                '& p': { 
                  mb: 1.5,
                  lineHeight: 1.6
                },
                '& ul, & ol': { 
                  pl: 3,
                  mb: 2
                },
                '& li': { 
                  mb: 0.5
                },
                '& blockquote': {
                  borderLeft: '4px solid rgba(124, 77, 255, 0.3)',
                  pl: 2,
                  py: 0.5,
                  my: 2,
                  backgroundColor: 'rgba(124, 77, 255, 0.05)',
                  borderRadius: '0 8px 8px 0',
                }
              }}>
                {selectedPromptData && (
                  <Box className="markdown-content" sx={{
                    '& pre': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '4px',
                      padding: 2,
                      overflowX: 'auto',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    },
                    '& code': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '4px',
                      padding: '0.2em 0.4em',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }
                  }}>
                    <ReactMarkdown>
                      {selectedPromptData.content}
                    </ReactMarkdown>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default PromptsDashboard;
