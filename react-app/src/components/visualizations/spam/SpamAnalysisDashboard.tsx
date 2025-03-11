import React from 'react';
import { Grid, Typography, Paper, Box, Divider } from '@mui/material';
import { SpamData } from '../../../types';
import RatingDistributionChart from './RatingDistributionChart';
import ReviewLengthChart from './ReviewLengthChart';
import SuspiciousPatternsTable from './SuspiciousPatternsTable';
import QualityMetricsCard from './QualityMetricsCard';
import RecommendationsTable from './RecommendationsTable';
import JsonInput from '../../common/JsonInput';

interface SpamAnalysisDashboardProps {
  data: SpamData | null;
}

const SpamAnalysisDashboard: React.FC<SpamAnalysisDashboardProps> = ({ data }) => {
  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <JsonInput tabId="spam" />
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="text.secondary">
            No data available
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Please paste JSON data in the input panel above to visualize spam analysis.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <JsonInput tabId="spam" />
      
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Spam Detection Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          Analysis of review quality and spam detection for {data.meta_analysis.total_reviews} reviews 
          from {data.meta_analysis.time_period.start_date} to {data.meta_analysis.time_period.end_date}.
        </Typography>
        
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Analysis Date: {data.meta_analysis.analysis_date}
          </Typography>
        </Box>
      </Paper>
      
      <QualityMetricsCard metrics={data.overall_quality_metrics} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RatingDistributionChart ratingDistribution={data.statistical_analysis.rating_distribution} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReviewLengthChart reviewLength={data.statistical_analysis.review_length} />
        </Grid>
        <Grid item xs={12}>
          <SuspiciousPatternsTable suspiciousPatterns={data.content_analysis.suspicious_patterns} />
        </Grid>
        <Grid item xs={12}>
          <RecommendationsTable recommendations={data.recommendations} />
        </Grid>
      </Grid>
      
      <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Sentiment Discrepancies
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="body2" paragraph>
          Total sentiment discrepancies found: {data.content_analysis.sentiment_discrepancies.total_found}
        </Typography>
        
        {data.content_analysis.sentiment_discrepancies.examples.length > 0 && (
          <Grid container spacing={2}>
            {data.content_analysis.sentiment_discrepancies.examples.map((example, index) => (
              <Grid item xs={12} key={index}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.default',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {example.reason}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    "{example.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Rating: {example.rating} ★
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sentiment Score: {example.sentiment_score}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default SpamAnalysisDashboard;
