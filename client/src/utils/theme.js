export const theme = {
  colors: {
    // Primary colors
    primary: {
      sage: '#7C9082', // Main brand color
      sageLight: '#9BAF9F',
      sageDark: '#5A6B5F',
    },
    secondary: {
      terracotta: '#C17B5D',
      terracottaLight: '#D49A7F',
      terracottaDark: '#A65D3D',
    },
    neutral: {
      cream: '#F5F1E8',
      creamLight: '#FAF7F0',
      creamDark: '#E8E4DB',
    },
    // Functional colors
    success: '#4A7C59',
    warning: '#D4A373',
    error: '#BC4749',
    info: '#6B8F71',
    // Text colors
    text: {
      primary: '#2C3639',
      secondary: '#4A4A4A',
      light: '#6B7280',
    },
    // Background colors
    background: {
      light: '#FFFFFF',
      dark: '#1A1A1A',
    }
  },
  typography: {
    fontFamily: {
      heading: "'Poppins', sans-serif",
      body: "'Open Sans', sans-serif",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  }
}; 