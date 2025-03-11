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
import { SuspiciousPatterns } from '../../../types';

interface SuspiciousPatternsTableProps {
  suspiciousPatterns: SuspiciousPatterns;
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
      id={`suspicious-tabpanel-${index}`}
      aria-labelledby={`suspicious-tab-${index}`}
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
    id: `suspicious-tab-${index}`,
    'aria-controls': `suspicious-tabpanel-${index}`,
  };
};

const SuspiciousPatternsTable: React.FC<SuspiciousPatternsTableProps> = ({ 
  suspiciousPatterns 
}) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
        Suspicious Patterns
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="suspicious patterns tabs"
        >
          <Tab label="Short Reviews" {...a11yProps(0)} />
          <Tab label="Emoji Abuse" {...a11yProps(1)} />
          <Tab label="Generic Comments" {...a11yProps(2)} />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <TableContainer>
          <Table size="small" aria-label="short reviews table">
            <TableHead>
              <TableRow>
                <TableCell>Review ID</TableCell>
                <TableCell>Content</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Length</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suspiciousPatterns.short_reviews.map((review) => (
                <TableRow key={review.review_id}>
                  <TableCell component="th" scope="row">
                    {review.review_id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>{review.content}</TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={`${review.rating} ★`} 
                      size="small" 
                      sx={{ 
                        bgcolor: review.rating >= 4 ? theme.palette.success.light : theme.palette.error.light,
                        color: review.rating >= 4 ? theme.palette.success.contrastText : theme.palette.error.contrastText
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">{review.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <TableContainer>
          <Table size="small" aria-label="emoji abuse table">
            <TableHead>
              <TableRow>
                <TableCell>Review ID</TableCell>
                <TableCell>Content</TableCell>
                <TableCell align="right">Emoji Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suspiciousPatterns.emoji_abuse.map((review) => (
                <TableRow key={review.review_id}>
                  <TableCell component="th" scope="row">
                    {review.review_id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>{review.content}</TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={review.emoji_count} 
                      size="small" 
                      color={review.emoji_count > 5 ? "error" : "warning"} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <TableContainer>
          <Table size="small" aria-label="generic comments table">
            <TableHead>
              <TableRow>
                <TableCell>Review ID</TableCell>
                <TableCell>Content</TableCell>
                <TableCell align="right">Frequency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suspiciousPatterns.generic_comments.map((review) => (
                <TableRow key={review.review_id}>
                  <TableCell component="th" scope="row">
                    {review.review_id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>{review.content}</TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={review.frequency} 
                      size="small" 
                      color={review.frequency > 10 ? "error" : "warning"} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Paper>
  );
};

export default SuspiciousPatternsTable;
