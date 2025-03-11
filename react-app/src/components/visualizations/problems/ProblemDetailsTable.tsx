import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Chip, 
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Collapse,
  IconButton
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Problem } from '../../../types';

interface ProblemDetailsTableProps {
  problems: Problem[];
}

// Row component for expandable table
const Row: React.FC<{ problem: Problem }> = ({ problem }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  // Map severity to color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return theme.palette.error;
      case 'Major':
        return theme.palette.warning;
      case 'Minor':
        return theme.palette.info;
      default:
        return theme.palette.primary;
    }
  };

  const severityColor = getSeverityColor(problem.severity);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {problem.category}
        </TableCell>
        <TableCell align="right">{problem.frequency}</TableCell>
        <TableCell align="center">
          <Chip 
            label={problem.severity} 
            sx={{ 
              bgcolor: severityColor.light,
              color: severityColor.contrastText,
              fontWeight: 'bold'
            }} 
          />
        </TableCell>
        <TableCell align="center">{problem.trend}</TableCell>
        <TableCell>
          {problem.affected_user_segments.map((segment, index) => (
            <Chip 
              key={index} 
              label={segment} 
              size="small" 
              sx={{ mr: 0.5, mb: 0.5 }} 
            />
          ))}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Example Reviews
              </Typography>
              <Table size="small" aria-label="example reviews">
                <TableHead>
                  <TableRow>
                    <TableCell>Review</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {problem.example_reviews.map((review, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {review.content}
                      </TableCell>
                      <TableCell align="right">{review.at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ProblemDetailsTable: React.FC<ProblemDetailsTableProps> = ({ problems }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sort problems by frequency in descending order
  const sortedProblems = [...problems].sort((a, b) => b.frequency - a.frequency);
  
  // Apply pagination
  const paginatedProblems = sortedProblems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        mb: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        Problem Details
      </Typography>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Category</TableCell>
              <TableCell align="right">Frequency</TableCell>
              <TableCell align="center">Severity</TableCell>
              <TableCell align="center">Trend</TableCell>
              <TableCell>Affected User Segments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProblems.map((problem) => (
              <Row key={problem.category} problem={problem} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={problems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProblemDetailsTable;
