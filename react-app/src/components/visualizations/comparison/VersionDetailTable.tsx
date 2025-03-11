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
  TableSortLabel,
  Chip,
  useTheme,
  Tooltip,
} from '@mui/material';
import { VersionData } from '../../../types';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

interface VersionDetailTableProps {
  versions: VersionData[];
  bestVersion: string;
  worstVersion: string;
}

type Order = 'asc' | 'desc';
type OrderBy = 'versao_aplicativo' | 'score_sentimento_positivo' | 'sentimento';

const VersionDetailTable: React.FC<VersionDetailTableProps> = ({
  versions,
  bestVersion,
  worstVersion,
}) => {
  const theme = useTheme();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('versao_aplicativo');

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedVersions = React.useMemo(() => {
    const comparator = (a: VersionData, b: VersionData) => {
      let valueA: string | number;
      let valueB: string | number;

      if (orderBy === 'versao_aplicativo') {
        valueA = parseFloat(a.versao_aplicativo);
        valueB = parseFloat(b.versao_aplicativo);
      } else if (orderBy === 'score_sentimento_positivo') {
        valueA = a.score_sentimento_positivo;
        valueB = b.score_sentimento_positivo;
      } else {
        valueA = a.sentimento;
        valueB = b.sentimento;
      }

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    };

    return [...versions].sort(comparator);
  }, [versions, order, orderBy]);

  // Helper function to get sentiment color
  const getSentimentColor = (sentiment: string, score: number) => {
    if (sentiment === 'positivo') {
      return theme.palette.success;
    } else if (sentiment === 'neutro') {
      return theme.palette.warning;
    } else {
      return theme.palette.error;
    }
  };

  // Helper function to get version status
  const getVersionStatus = (version: string) => {
    if (version === bestVersion) {
      return {
        label: 'BEST',
        color: theme.palette.success,
      };
    } else if (version === worstVersion) {
      return {
        label: 'NEEDS WORK',
        color: theme.palette.error,
      };
    }
    return null;
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          gap: 1,
        }}
      >
        <FormatListNumberedIcon
          sx={{
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
          Version Details
        </Typography>
      </Box>

      <TableContainer
        sx={{
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell
                sortDirection={orderBy === 'versao_aplicativo' ? order : false}
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <TableSortLabel
                  active={orderBy === 'versao_aplicativo'}
                  direction={orderBy === 'versao_aplicativo' ? order : 'asc'}
                  onClick={() => handleRequestSort('versao_aplicativo')}
                >
                  Version
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={
                  orderBy === 'score_sentimento_positivo' ? order : false
                }
                align="center"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <TableSortLabel
                  active={orderBy === 'score_sentimento_positivo'}
                  direction={
                    orderBy === 'score_sentimento_positivo' ? order : 'asc'
                  }
                  onClick={() => handleRequestSort('score_sentimento_positivo')}
                >
                  Score
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === 'sentimento' ? order : false}
                align="center"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <TableSortLabel
                  active={orderBy === 'sentimento'}
                  direction={orderBy === 'sentimento' ? order : 'asc'}
                  onClick={() => handleRequestSort('sentimento')}
                >
                  Sentiment
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                Summary
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedVersions.map((version) => {
              const sentimentColor = getSentimentColor(
                version.sentimento,
                version.score_sentimento_positivo
              );
              const versionStatus = getVersionStatus(version.versao_aplicativo);

              return (
                <TableRow
                  key={version.versao_aplicativo}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.03)',
                    },
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: versionStatus
                        ? versionStatus.color.light
                        : theme.palette.text.primary,
                    }}
                  >
                    {version.versao_aplicativo}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    <Chip
                      label={`${version.score_sentimento_positivo}/10`}
                      size="small"
                      sx={{
                        backgroundColor: `rgba(${
                          sentimentColor === theme.palette.success
                            ? '16, 185, 129'
                            : sentimentColor === theme.palette.warning
                            ? '245, 158, 11'
                            : '244, 63, 94'
                        }, 0.2)`,
                        color: sentimentColor.light,
                        fontWeight: 'bold',
                        minWidth: 60,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={version.sentimento.toUpperCase()}
                      size="small"
                      sx={{
                        backgroundColor: `rgba(${
                          sentimentColor === theme.palette.success
                            ? '16, 185, 129'
                            : sentimentColor === theme.palette.warning
                            ? '245, 158, 11'
                            : '244, 63, 94'
                        }, 0.2)`,
                        color: sentimentColor.light,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={version.resumo_sentimento}
                      placement="top"
                      arrow
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {version.resumo_sentimento}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    {versionStatus && (
                      <Chip
                        label={versionStatus.label}
                        size="small"
                        sx={{
                          backgroundColor: `rgba(${
                            versionStatus.color === theme.palette.success
                              ? '16, 185, 129'
                              : '244, 63, 94'
                          }, 0.2)`,
                          color: versionStatus.color.light,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default VersionDetailTable;
