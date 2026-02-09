import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#F0C74B',
    },
    background: {
      default: '#F2F1ED',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#141414',
      secondary: '#5B5B5B',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Space Grotesk, IBM Plex Sans, Segoe UI, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
});

export default theme;