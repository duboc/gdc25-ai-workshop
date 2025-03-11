import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  useTheme
} from '@mui/material';
import { Recommendations } from '../../../types';

interface RecommendationsTableProps {
  recommendations: Recommendations;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`recommendations-tabpanel-${index}`}
      aria-labelledby={`recommendations-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `recommendations-tab-${index}`,
    'aria-controls': `recommendations-tabpanel-${index}`,
  };
};

const RecommendationsTable: React.FC<RecommendationsTableProps> = ({ 
  recommendations 
}) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Helper function to get color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return theme.palette.error;
      case 'medium':
        return theme.palette.warning;
      case 'low':
        return theme.palette.info;
      default:
        return theme.palette.primary;
    }
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        mb: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        Recommendations
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="recommendations tabs"
        >
          <Tab label="Spam Detection" {...a11yProps(0)} />
          <Tab label="Quality Improvement" {...a11yProps(1)} />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <TableContainer>
          <Table size="small" aria-label="spam detection recommendations table">
            <TableHead>
              <TableRow>
                <TableCell>Issue</TableCell>
                <TableCell>Suggestion</TableCell>
                <TableCell align="right">Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations.spam_detection.map((recommendation, index) => {
                const priorityColor = getPriorityColor(recommendation.priority);
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {recommendation.issue}
                    </TableCell>
                    <TableCell>{recommendation.suggestion}</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={recommendation.priority.toUpperCase()} 
                        size="small" 
                        sx={{ 
                          bgcolor: priorityColor.light,
                          color: priorityColor.contrastText,
                          fontWeight: 'bold'
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <TableContainer>
          <Table size="small" aria-label="quality improvement recommendations table">
            <TableHead>
              <TableRow>
                <TableCell>Area</TableCell>
                <TableCell>Suggestion</TableCell>
                <TableCell align="right">Expected Impact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations.quality_improvement.map((recommendation, index) => {
                const impactColor = getPriorityColor(recommendation.expected_impact);
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {recommendation.area}
                    </TableCell>
                    <TableCell>{recommendation.suggestion}</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={recommendation.expected_impact.toUpperCase()} 
                        size="small" 
                        sx={{ 
                          bgcolor: impactColor.light,
                          color: impactColor.contrastText,
                          fontWeight: 'bold'
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Paper>
  );
};

export default RecommendationsTable;
