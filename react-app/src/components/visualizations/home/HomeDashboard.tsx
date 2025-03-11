import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  TextField, 
  Divider, 
  Card, 
  CardContent, 
  CardActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Link,
  useTheme,
  CircularProgress,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CodeIcon from '@mui/icons-material/Code';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import AndroidIcon from '@mui/icons-material/Android';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Review {
  id: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
}

interface ScrapingResult {
  appPackage: string;
  reviewCount: number;
  reviews: Review[];
}

const HomeDashboard: React.FC = () => {
  const theme = useTheme();
  const [appPackage, setAppPackage] = useState('');
  const [reviewCount, setReviewCount] = useState('100');
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrapingResult, setScrapingResult] = useState<ScrapingResult | null>(null);
  
  const handleAppPackageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppPackage(event.target.value);
  };
  
  const handleReviewCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewCount(event.target.value);
  };
  
  const handleScrapeReviews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/scrape-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appPackage,
          reviewCount: parseInt(reviewCount, 10),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to scrape reviews');
      }
      
      const data = await response.json();
      setScrapingResult(data);
      setActiveStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownloadCSV = () => {
    if (!appPackage) return;
    
    const url = `http://localhost:8080/api/download-reviews?appPackage=${encodeURIComponent(appPackage)}&reviewCount=${encodeURIComponent(reviewCount)}`;
    window.open(url, '_blank');
    setActiveStep(2);
  };
  
  const handleCloseError = () => {
    setError(null);
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            fontFamily: '"Rajdhani", sans-serif',
            background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 2
          }}
        >
          Android App Review Analysis Workshop
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 800 }}>
          Welcome to the Android App Review Analysis Workshop! This tool helps you extract valuable insights from Google Play Store reviews using AI. Follow the steps below to get started.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                fontFamily: '"Rajdhani", sans-serif',
                mb: 3
              }}
            >
              Step-by-Step Workflow
            </Typography>
            
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 3 }}>
              <Step>
                <StepLabel 
                  StepIconProps={{ 
                    icon: <SearchIcon />,
                    sx: { 
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Scrape Reviews
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Enter an Android app package name (e.g., com.spotify.music) and the number of reviews to scrape.
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          label="App Package Name"
                          variant="outlined"
                          placeholder="e.g., com.spotify.music"
                          value={appPackage}
                          onChange={handleAppPackageChange}
                          InputProps={{
                            startAdornment: <AndroidIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                          }}
                          size="small"
                          disabled={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Number of Reviews"
                          variant="outlined"
                          type="number"
                          value={reviewCount}
                          onChange={handleReviewCountChange}
                          size="small"
                          disabled={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                      sx={{ 
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                      disabled={!appPackage || isLoading}
                      onClick={handleScrapeReviews}
                    >
                      {isLoading ? 'Scraping...' : 'Start Scraping'}
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel 
                  StepIconProps={{ 
                    icon: <DownloadIcon />,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Download CSV
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Once the scraping is complete, download the CSV file containing the reviews.
                  </Typography>
                  
                  {scrapingResult && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Scraped {scrapingResult.reviewCount} reviews for {scrapingResult.appPackage}
                      </Typography>
                      
                      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2, maxHeight: 200 }}>
                        <Table size="small" stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell>User</TableCell>
                              <TableCell>Rating</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Review</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {scrapingResult.reviews.map((review) => (
                              <TableRow key={review.id}>
                                <TableCell>{review.userName}</TableCell>
                                <TableCell>{review.rating} ★</TableCell>
                                <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                                <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {review.content}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}
                  
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<DownloadIcon />}
                      sx={{ 
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                      disabled={!scrapingResult}
                      onClick={handleDownloadCSV}
                    >
                      Download Reviews CSV
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel 
                  StepIconProps={{ 
                    icon: <CodeIcon />,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Process in Google AI Studio
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Upload the CSV to Google AI Studio and use one of our specialized prompts to analyze the reviews.
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      href="https://makersuite.google.com/app/prompts"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                      onClick={() => setActiveStep(3)}
                    >
                      Open Google AI Studio
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel 
                  StepIconProps={{ 
                    icon: <BarChartIcon />,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Visualize Results
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Copy the JSON output from Google AI Studio and paste it into the appropriate visualization tab.
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Select a visualization tab from the navigation bar above to get started.
                    </Typography>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Box>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                fontFamily: '"Rajdhani", sans-serif',
                mb: 3
              }}
            >
              Available Analysis Types
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        fontFamily: '"Rajdhani", sans-serif',
                        mb: 1
                      }}
                    >
                      User Feedback
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Identify key problems and suggestions from user reviews.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      sx={{ textTransform: 'none' }}
                    >
                      View Example
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        fontFamily: '"Rajdhani", sans-serif',
                        mb: 1
                      }}
                    >
                      Review Quality
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Detect spam and analyze review quality metrics.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      sx={{ textTransform: 'none' }}
                    >
                      View Example
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        fontFamily: '"Rajdhani", sans-serif',
                        mb: 1
                      }}
                    >
                      Version Comparison
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Compare metrics across different app versions.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      sx={{ textTransform: 'none' }}
                    >
                      View Example
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        fontFamily: '"Rajdhani", sans-serif',
                        mb: 1
                      }}
                    >
                      User Stories
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Generate user stories from review feedback.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      sx={{ textTransform: 'none' }}
                    >
                      View Example
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4 }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.1) 0%, rgba(0, 229, 255, 0.1) 100%)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    fontWeight: 600,
                    fontFamily: '"Rajdhani", sans-serif',
                    mb: 2
                  }}
                >
                  Need Help?
                </Typography>
                <Typography variant="body2" paragraph>
                  Check out our documentation and resources to learn more about the workshop.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  View Documentation
                </Button>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeDashboard;
