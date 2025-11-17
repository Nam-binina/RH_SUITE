import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7e57c2",
      light: "#b085f5",
      dark: "#4d2c91",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b085f5",
      light: "#e1d6ff",
      dark: "#7e57c2",
    },
    background: {
      default: "#0f0b16",
      paper: "#1a1525",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(126, 87, 194, 0.3)",
    success: {
      main: "#4caf50",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffa726",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(26, 21, 37, 0.95)",
          backdropFilter: "blur(20px)",
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a1525",
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1525",
          backgroundImage: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: "12px", textTransform: "none", fontWeight: 600 },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: { borderRadius: "16px" },
      },
    },
  },
});

export default theme;