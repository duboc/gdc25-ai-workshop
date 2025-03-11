import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define the app analytics theme options with a modern, light feel
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#6366F1', // Indigo
      light: '#A5B4FC',
      dark: '#4F46E5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#14B8A6', // Teal
      light: '#5EEAD4',
      dark: '#0F766E',
      contrastText: '#ffffff',
    },
    error: {
      main: '#F43F5E', // Rose
      light: '#FDA4AF',
      dark: '#E11D48',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F59E0B', // Amber
      light: '#FCD34D',
      dark: '#D97706',
      contrastText: '#000000',
    },
    info: {
      main: '#3B82F6', // Blue
      light: '#93C5FD',
      dark: '#2563EB',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10B981', // Emerald
      light: '#6EE7B7',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F9FAFB', // Very light gray background
      paper: '#FFFFFF', // White for paper elements
    },
    text: {
      primary: '#1F2937', // Dark gray, slightly softer than black
      secondary: '#6B7280', // Medium gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '6rem',
      letterSpacing: '0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3.75rem',
      letterSpacing: '0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '3rem',
      letterSpacing: '0.02em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '0.02em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      letterSpacing: '0.02em',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none',
      letterSpacing: '0.05em',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
    },
    overline: {
      fontWeight: 400,
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
          },
        },
        contained: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          background: '#6366F1',
          '&:hover': {
            background: '#4F46E5',
          },
        },
        containedSecondary: {
          background: '#14B8A6',
          '&:hover': {
            background: '#0F766E',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
        },
        rounded: {
          borderRadius: '12px',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        },
        elevation2: {
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(99, 102, 241, 0.04)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
        filled: {
          background: 'rgba(0, 0, 0, 0.04)',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.01em',
          transition: 'all 0.15s ease-in-out',
          '&.Mui-selected': {
            color: '#6366F1',
            fontWeight: 600,
          },
          '&:hover': {
            color: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.04)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
          borderRadius: '2px 2px 0 0',
          background: '#6366F1',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#F9FAFB',
          backgroundAttachment: 'fixed',
          scrollbarColor: "#D1D5DB #F9FAFB",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#F9FAFB",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#D1D5DB",
            minHeight: 24,
            border: "2px solid #F9FAFB",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#9CA3AF",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#9CA3AF",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#9CA3AF",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#F9FAFB",
          },
        },
      },
    },
  },
};

// Create the theme
const theme = createTheme(themeOptions);

export default theme;
