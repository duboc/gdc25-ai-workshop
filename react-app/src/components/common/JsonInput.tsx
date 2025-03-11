import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Alert, 
  Collapse, 
  IconButton,
  Divider,
  useTheme,
  Tooltip,
  Fade
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import { parseAndValidateJson } from '../../utils/jsonValidation';
import { useJsonData } from '../../contexts/JsonDataContext';

interface JsonInputProps {
  tabId: string;
}

const JsonInput: React.FC<JsonInputProps> = ({ tabId }) => {
  const [expanded, setExpanded] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors?: string[];
  } | null>(null);
  
  const { updateTabData } = useJsonData();
  const theme = useTheme();

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
    setValidationResult(null);
  };

  const handleValidate = () => {
    if (!jsonInput.trim()) {
      setValidationResult({
        isValid: false,
        errors: ['Please enter JSON data']
      });
      return;
    }

    const result = parseAndValidateJson(jsonInput, tabId);
    setValidationResult(result);

    if (result.isValid && result.data) {
      updateTabData(tabId, result.data);
    }
  };

  const handleLoadExample = async () => {
    try {
      // Load the appropriate example file based on the tab ID
      let exampleFile = '/json_examples/1.problems.json'; // default
      
      switch (tabId) {
        case 'spam':
          exampleFile = '/json_examples/2.spam.json';
          break;
        case 'version':
          exampleFile = '/json_examples/3.comparison.json';
          break;
        case 'stories':
          exampleFile = '/json_examples/4.user_stories.json';
          break;
        case 'marketing':
          exampleFile = '/json_examples/5.marketing.json';
          break;
        case 'video':
          exampleFile = '/json_examples/6.ftue_video.json';
          break;
        default:
          exampleFile = '/json_examples/1.problems.json';
      }
      
      const response = await fetch(exampleFile);
      const data = await response.text();
      setJsonInput(data);
    } catch (error) {
      console.error('Failed to load example:', error);
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        mb: 3, 
        overflow: 'hidden',
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: expanded ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
          background: 'linear-gradient(90deg, rgba(245, 247, 250, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CodeIcon 
            sx={{ 
              mr: 1.5, 
              color: theme.palette.primary.light,
              filter: 'drop-shadow(0 0 3px rgba(179, 136, 255, 0.5))'
            }} 
          />
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            DATA CONSOLE
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip 
            title={expanded ? "Collapse console" : "Expand console"} 
            placement="left"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            arrow
          >
            <IconButton 
              onClick={handleToggleExpand}
              aria-expanded={expanded}
              aria-label="toggle json input"
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Collapse in={expanded}>
        <Box 
          sx={{ 
            p: 2,
            background: 'rgba(245, 247, 250, 0.9)',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <TextField
            label="Paste JSON data here"
            multiline
            rows={10}
            value={jsonInput}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.text.primary,
              },
            }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
              }
            }}
            error={validationResult !== null && !validationResult.isValid}
            helperText={
              validationResult !== null && !validationResult.isValid
                ? 'Invalid JSON format'
                : ''
            }
          />
          
          {validationResult && (
            <Box sx={{ mb: 2 }}>
              {validationResult.isValid ? (
                <Alert 
                  icon={<CheckCircleOutlineIcon />} 
                  severity="success"
                  sx={{
                    backgroundColor: 'rgba(0, 230, 118, 0.1)',
                    color: theme.palette.success.light,
                    border: `1px solid ${theme.palette.success.dark}`,
                    '& .MuiAlert-icon': {
                      color: theme.palette.success.light,
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    DATA VALIDATED SUCCESSFULLY
                  </Typography>
                  <Typography variant="caption">
                    JSON data has been applied to the visualization
                  </Typography>
                </Alert>
              ) : (
                <Alert 
                  icon={<ErrorOutlineIcon />} 
                  severity="error"
                  sx={{ 
                    mb: 1,
                    backgroundColor: 'rgba(255, 23, 68, 0.1)',
                    color: theme.palette.error.light,
                    border: `1px solid ${theme.palette.error.dark}`,
                    '& .MuiAlert-icon': {
                      color: theme.palette.error.light,
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    VALIDATION FAILED
                  </Typography>
                  <Typography variant="caption">
                    Invalid JSON format detected
                  </Typography>
                </Alert>
              )}
              
              {validationResult.errors && validationResult.errors.length > 0 && (
                <Box 
                  sx={{ 
                    mt: 1, 
                    p: 2, 
                    backgroundColor: 'rgba(255, 23, 68, 0.05)', 
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.error.dark}`,
                    color: theme.palette.error.light,
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontFamily: '"Rajdhani", sans-serif',
                      fontWeight: 600,
                      mb: 1,
                      color: theme.palette.error.light,
                    }}
                  >
                    ERROR LOG:
                  </Typography>
                  <ul style={{ margin: '8px 0', paddingLeft: '24px' }}>
                    {validationResult.errors.map((error, index) => (
                      <li key={index}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                          }}
                        >
                          {error}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          )}
          
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleValidate}
                startIcon={<ContentPasteIcon />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  fontFamily: '"Rajdhani", sans-serif',
                  boxShadow: '0 0 10px rgba(98, 0, 234, 0.3)',
                  '&:hover': {
                    boxShadow: '0 0 15px rgba(98, 0, 234, 0.5)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Validate & Apply
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLoadExample}
                startIcon={<DownloadIcon />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  fontFamily: '"Rajdhani", sans-serif',
                  borderColor: 'rgba(0, 229, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'rgba(0, 229, 255, 0.8)',
                    background: 'rgba(0, 229, 255, 0.05)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Load Example
              </Button>
            </Box>
            
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.5,
                alignSelf: 'center',
                fontFamily: 'monospace',
              }}
            >
              {jsonInput ? `${jsonInput.length} characters` : 'No data'}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default JsonInput;
