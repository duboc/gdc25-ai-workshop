import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  useTheme,
  IconButton,
  Collapse,
} from '@mui/material';
import { FtueAnalysisCriterion } from '../../../types';
import TableChartIcon from '@mui/icons-material/TableChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface CriteriaDetailTableProps {
  criteria: FtueAnalysisCriterion[];
  selectedCriterion: string | null;
}

const CriteriaDetailTable: React.FC<CriteriaDetailTableProps> = ({
  criteria,
  selectedCriterion,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Filter criteria based on selected criterion
  const filteredCriteria = selectedCriterion
    ? criteria.filter(item => item.criterion === selectedCriterion)
    : criteria;

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Toggle expanded row
  const toggleExpandRow = (criterionName: string) => {
    setExpandedRow(expandedRow === criterionName ? null : criterionName);
  };

  // Get status chip color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Yes':
        return '#4CAF50';
      case 'Partial':
        return '#FFC107';
      case 'No':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  // Format numerical values for display
  const formatNumericalValue = (criterion: FtueAnalysisCriterion): string => {
    const { numericalValue } = criterion;
    
    if (numericalValue.timeInSeconds !== undefined) {
      return `${numericalValue.timeInSeconds} seconds`;
    }
    
    if (numericalValue.maxDurationInSeconds !== undefined) {
      return `${numericalValue.maxDurationInSeconds} seconds`;
    }
    
    if (numericalValue.permissionsRequestedWithoutExplanationCount !== undefined) {
      return `${numericalValue.permissionsRequestedWithoutExplanationCount} permissions`;
    }
    
    if (numericalValue.isSkippable !== undefined) {
      return numericalValue.isSkippable ? 'Yes' : 'No';
    }
    
    if (numericalValue.isLanguageConsistent !== undefined) {
      return numericalValue.isLanguageConsistent ? 'Yes' : 'No';
    }
    
    if (numericalValue.isLoginMandatory !== undefined) {
      return numericalValue.isLoginMandatory ? 'Yes' : 'No';
    }
    
    if (numericalValue.loginOptionsCount !== undefined) {
      return `${numericalValue.loginOptionsCount} options`;
    }
    
    if (numericalValue.isAutomaticGoogleLogin !== undefined) {
      return numericalValue.isAutomaticGoogleLogin ? 'Yes' : 'No';
    }
    
    if (numericalValue.interstitialCount !== undefined) {
      return `${numericalValue.interstitialCount} ads`;
    }
    
    if (numericalValue.purchaseModalCount !== undefined) {
      return `${numericalValue.purchaseModalCount} modals`;
    }
    
    if (numericalValue.isOptionsAccessible !== undefined) {
      return numericalValue.isOptionsAccessible ? 'Yes' : 'No';
    }
    
    if (numericalValue.isStartGameClear !== undefined) {
      return numericalValue.isStartGameClear ? 'Yes' : 'No';
    }
    
    if (numericalValue.isProfileVisible !== undefined) {
      return numericalValue.isProfileVisible ? 'Yes' : 'No';
    }
    
    if (numericalValue.isProfileCustomizable !== undefined) {
      return numericalValue.isProfileCustomizable ? 'Yes' : 'No';
    }
    
    if (numericalValue.instancesWithoutFeedbackCount !== undefined) {
      return `${numericalValue.instancesWithoutFeedbackCount} instances`;
    }
    
    return 'N/A';
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: '12px',
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TableChartIcon
            sx={{
              mr: 1.5,
              color: theme.palette.primary.light,
              filter: 'drop-shadow(0 0 3px rgba(179, 136, 255, 0.5))',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            FTUE Criteria Details
          </Typography>
        </Box>

        {selectedCriterion && (
          <Chip
            label={`Filtered: ${selectedCriterion}`}
            color="primary"
            size="small"
            sx={{
              fontWeight: 'bold',
            }}
          />
        )}
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="FTUE criteria table">
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(124, 77, 255, 0.05)',
                },
              }}
            >
              <TableCell width="40px"></TableCell>
              <TableCell>Criterion</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Metric</TableCell>
              <TableCell>Observations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCriteria
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((criterion) => (
                <React.Fragment key={criterion.criterion}>
                  <TableRow
                    hover
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(124, 77, 255, 0.05)',
                      },
                      ...(criterion.criterion === selectedCriterion && {
                        backgroundColor: 'rgba(124, 77, 255, 0.1)',
                      }),
                    }}
                  >
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => toggleExpandRow(criterion.criterion)}
                      >
                        {expandedRow === criterion.criterion ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          color: theme.palette.text.primary,
                        }}
                      >
                        {criterion.criterion}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={criterion.meetsBestPractices}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(criterion.meetsBestPractices),
                          color: '#fff',
                          fontWeight: 'bold',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {formatNumericalValue(criterion)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {criterion.observations}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={expandedRow === criterion.criterion}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 2, ml: 4 }}>
                          <Typography
                            variant="subtitle2"
                            gutterBottom
                            component="div"
                            sx={{ color: theme.palette.primary.main }}
                          >
                            Suggested Improvements
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              mb: 2,
                              fontStyle: criterion.suggestedImprovements ? 'normal' : 'italic',
                            }}
                          >
                            {criterion.suggestedImprovements || 'No improvements needed.'}
                          </Typography>
                          
                          <Typography
                            variant="subtitle2"
                            gutterBottom
                            component="div"
                            sx={{ color: theme.palette.primary.main }}
                          >
                            Detailed Observations
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                            }}
                          >
                            {criterion.observations}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCriteria.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CriteriaDetailTable;
