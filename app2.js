import { createTheme, CssBaseline, ThemeProvider, Box } from "@mui/material";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import { useState } from "react";
import LoginCandidat from "./candidat/pages/LoginCandidat";
import LoginEntreprise from "./entreprise/pages/LoginEntreprise";
import ProfilEntreprise from "./entreprise/pages/ProfilEntreprise";
import NavbarEntreprise from "./entreprise/layout/NavbarEntreprise";
import ListCandidate from "./entreprise/pages/ListCandidate"
import VoirProfil from "./entreprise/pages/VoirProfil";
import Filter from "./entreprise/pages/Filter";
import CalendrierAbsences from "./entreprise/pages/CalendrierAbsences";
import DemandesConge from "./entreprise/pages/DemandesConge";
import Configuration from "./entreprise/pages/Configuration";

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
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
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
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState({ isConnected: false, type: null });

  const handleLoginEntreprise = () => {
    setUser({ isConnected: true, type: "entreprise" });
  };

  const handleLogout = () => {
    setUser({
      isConnected: false,
      type: null
    })
  }

  const renderNavbar = () => {
    if(!user.isConnected) return null;
    if (user.type === "entreprise") {
      return (
        <div position="fixed">
          <NavbarEntreprise onLogout={handleLogout}/>
        </div>
      ) 
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f0b16 0%, #1a1525 100%)",
        }}
      >
        <Router>
          {renderNavbar()}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              marginLeft:
                user.isConnected && user.type === "entreprise" ? "80px" : 0,
              minHeight: "100vh",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/loginCandidat" element={<LoginCandidat />} />
              <Route
                path="/loginEntreprise"
                element={
                  user.isConnected && user.type === "entreprise" ? (
                    <Navigate to="/profilEntreprise" replace />
                  ) : (
                    <LoginEntreprise onLogin={handleLoginEntreprise} />
                  )
                }
              />
<Route
  path="/voirprofil/:id"
  element={
    user.isConnected && user.type === "entreprise" ? (
      <VoirProfil theme={theme} />
    ) : (
      <Navigate to="/loginEntreprise" replace />
    )
  }
/>


              <Route
                path="/profilEntreprise"
                element={
                  user.isConnected && user.type === "entreprise" ? (
                    <ProfilEntreprise />
                  ) : (
                    <Navigate to="/loginEntreprise" replace />
                  )
                }
              />
              <Route
                path="/listCandidate"
                element={
                  user.isConnected && user.type === "entreprise" ? (
                    <ListCandidate />
                  ) : (
                    <Navigate to="/loginEntreprise" replace />
                  )
                }
              />
              <Route
                path="/calendrierAbsences"
                element={
                  user.isConnected && user.type === "entreprise" ? (
                    <CalendrierAbsences />
                  ) : (
                    <Navigate to="/loginEntreprise" replace />
                  )
                }
              />
              <Route
                path="/demandesConge"
                element={
                  user.isConnected && user.type === "entreprise" ? (
                    <DemandesConge />
                  ) : (
                    <Navigate to="/loginEntreprise" replace />
                  )
                }
              />
              <Route
                path="/configuration"
                element={
                  user.isConnected && user.type === "entreprise" ? (
                    <Configuration />
                  ) : (
                    <Navigate to="/loginEntreprise" replace />
                  )
                }
              />
<Route
  path="/voirprofil"
  element={
    user.isConnected && user.type === "entreprise" ? (
      <VoirProfil theme={theme} />
    ) : (
      <Navigate to="/loginEntreprise" replace />
    )
  }
/>

              <Route
                path="/filter"
                element={
                  user.isConnected && user.type === "entreprise" ? (
                    <Filter />
                  ) : (
                    <Navigate to="/loginEntreprise" replace />
                  )
                }
              />
            </Routes>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
