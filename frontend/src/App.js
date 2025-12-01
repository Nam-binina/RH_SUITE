import { createTheme, CssBaseline, ThemeProvider, Box } from "@mui/material";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// --- CANDIDAT ---
import LoginCandidat from "./candidat/pages/LoginCandidat";
import FormCandidat from "./candidat/pages/FormCandidat";
import ProfilCandidat from "./candidat/pages/ProfilCandidat";
import FiltreAnnonces from "./candidat/pages/FiltreAnnonces";
import DetailsAnnonces from "./candidat/pages/DetailsAnnonces";
import MesCandidatures from "./candidat/pages/MesCandidatures";
import Tableaudebord from "./candidat/pages/Tableaudebord";
import ModifierProfil from "./candidat/pages/ModifierProfil";
import ExportCV from "./candidat/pages/ExportCV";
import QcmCandidat from "./candidat/pages/QcmCandidat";
import DeconnexionCandidat from "./candidat/pages/Deconnexion";

// --- EMPLOYE --- (NOUVEAUX IMPORTS)
import LoginEmploye from "./employe/pages/LoginEmploye";
import TableaudebordEmploye from "./employe/pages/TableaudebordEmploye";
import RelevePresence from "./employe/pages/RelevePresence";
import Pointage from "./employe/pages/Pointage";
import FichePaie from "./employe/pages/FichePaie";
import FiltreMoisAnnee from "./employe/pages/FiltreMoisAnnee";
import DeconnexionEmploye from "./employe/pages/Deconnexion";
import ProfilEmploye from "./employe/pages/ProfilEmploye";
import ModifierProfilEmploye from "./employe/pages/ModifierProfilEmploye";
import MesDocuments from "./employe/pages/MesDocuments";
import PerformanceEmploye from "./employe/pages/PerformanceEmploye";
import DemandeCongeEmploye from "./employe/pages/DemandeCongeEmploye";

// --- ENTREPRISE ---
import LoginEntreprise from "./entreprise/pages/LoginEntreprise";
import ProfilEntreprise from "./entreprise/pages/ProfilEntreprise";
import NavbarEntreprise from "./entreprise/layout/NavbarEntreprise";
import Announcement from "./entreprise/pages/Announcement";
import VoirProfil from "./entreprise/pages/VoirProfil";
import Filter from "./entreprise/pages/Filter";
import ListingAnnouncement from "./entreprise/pages/ListingAnnouncement";
import ListCandidate from "./entreprise/pages/ListCandidate";
import CalendrierAbsences from "./entreprise/pages/CalendrierAbsences";
import DemandesConge from "./entreprise/pages/DemandesConge";
import Configuration from "./entreprise/pages/Configuration";

// --- PAGE D’ACCUEIL ---
import Home from "./Home";

// --- THEME GLOBAL ---
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7e57c2", light: "#b085f5", dark: "#4d2c91", contrastText: "#ffffff" },
    secondary: { main: "#b085f5", light: "#e1d6ff", dark: "#7e57c2" },
    background: { default: "#0f0b16", paper: "#1a1525" },
    text: { primary: "#ffffff", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)" },
    success: { main: "#4caf50", contrastText: "#ffffff" },
    warning: { main: "#ffa726" },
    error: { main: "#f44336" },
    divider: "rgba(126, 87, 194, 0.3)",
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

  // Initialize user from localStorage so routes/navbar persist on reload
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "null");
      if (stored) {
        // stored may contain a `type` or `roles` field depending on auth flow
        const inferredType = stored.type || (stored.roles ? String(stored.roles[0]).toLowerCase() : null);
        setUser({ isConnected: true, type: inferredType });
      }
    } catch (e) {
      // ignore invalid localStorage
    }
  }, []);

  // CONNEXION / DECONNEXION
  const handleLoginCandidat = () => setUser({ isConnected: true, type: "candidat" });
  const handleLoginEntreprise = () => setUser({ isConnected: true, type: "entreprise" });
  const handleLoginEmploye = () => setUser({ isConnected: true, type: "employe" });
  const handleLogout = () => setUser({ isConnected: false, type: null });

  // NAVBAR : visible uniquement pour entreprise
  const renderNavbar = () => {
    if(!user.isConnected) return null;
    if (user.type === "entreprise") {
      return (
        <div position="fixed">
          <NavbarEntreprise onLogout={handleLogout} />
        </div>
      )
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #0f0b16 0%, #1a1525 100%)" }}>
        <Router>
          {renderNavbar()}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", marginLeft: user.isConnected && user.type === "entreprise" ? "80px" : 0 }}>
            <Routes>

              {/* --------------------------------- */}
              {/* PAGE D’ACCUEIL */}
              {/* --------------------------------- */}
              <Route path="/" element={<Home />} />


              {/* --------------------------------- */}
              {/* LOGIN CANDIDAT */}
              {/* --------------------------------- */}
              <Route
                path="/loginCandidat"
                element={
                  user.isConnected && user.type === "candidat"
                    ? <Navigate to="/tableaudebord" replace />
                    : <LoginCandidat onLogin={handleLoginCandidat} />
                }
              />


              {/* --------------------------------- */}
              {/* LOGIN EMPLOYE (CORRIGÉ) */}
              {/* --------------------------------- */}
              <Route
                path="/loginEmploye"
                element={
                  user.isConnected && user.type === "employe"
                    ? <Navigate to="/tableaudebordEmploye" replace />
                    : <LoginEmploye onLogin={handleLoginEmploye} />
                }
              />


              {/* --------------------------------- */}
              {/* LOGIN ENTREPRISE */}
              {/* --------------------------------- */}
              <Route
                path="/loginEntreprise"
                element={
                  user.isConnected && user.type === "entreprise"
                    ? <Navigate to="/profilEntreprise" replace />
                    : <LoginEntreprise onLogin={handleLoginEntreprise} />
                }
              />


              {/* --------------------------------- */}
              {/* TABLEAU DE BORD CANDIDAT */}
              {/* --------------------------------- */}
              <Route
                path="/tableaudebord"
                element={
                  user.isConnected && user.type === "candidat"
                    ? <Tableaudebord />
                    : <Navigate to="/loginCandidat" replace />
                }
              />


              {/* --------------------------------- */}
              {/* ROUTES CANDIDAT */}
              {/* --------------------------------- */}
              <Route path="/profilCandidat" element={user.type === "candidat" ? <ProfilCandidat /> : <Navigate to="/loginCandidat" />} />
              <Route path="/Details-Annonces" element={user.type === "candidat" ? <DetailsAnnonces /> : <Navigate to="/loginCandidat" />} />
              <Route path="/formCandidat/:annonceId" element={user.type === "candidat" ? <FormCandidat /> : <Navigate to="/loginCandidat" />} />
              <Route path="/Voir-Mes-Candidatures" element={user.type === "candidat" ? <MesCandidatures /> : <Navigate to="/loginCandidat" />} />
              <Route path="/Modifier-Profil" element={user.type === "candidat" ? <ModifierProfil /> : <Navigate to="/loginCandidat" />} />
              <Route path="/qcm" element={user.type === "candidat" ? <QcmCandidat /> : <Navigate to="/loginCandidat" />} />
              <Route path="/Export-CV" element={user.type === "candidat" ? <ExportCV /> : <Navigate to="/loginCandidat" />} />
              <Route path="/filtreAnnonces" element={user.type === "candidat" ? <FiltreAnnonces /> : <Navigate to="/loginCandidat" />} />


              {/* ====================================================== */}
              {/* ==================== EMPLOYÉ ========================= */}
              {/* ====================================================== */}

              <Route path="/ProfilEmploye" element={user.type === "employe" ? <ProfilEmploye /> : <Navigate to="/loginEmploye" />} />

              {/* TABLEAU DE BORD EMPLOYÉ */}
              <Route
                path="/tableaudebordEmploye"
                element={
                  user.isConnected && user.type === "employe"
                    ? <TableaudebordEmploye />
                    : <Navigate to="/loginEmploye" replace />
                }
              />

              {/* PAGE RELEVÉ DE PRÉSENCE */}
              <Route
                path="/relevePresence"
                element={
                  user.isConnected && user.type === "employe"
                    ? <RelevePresence />
                    : <Navigate to="/loginEmploye" replace />
                }
              />

              {/* PAGE POINTAGE */}
              <Route
                path="/pointage"
                element={
                  user.isConnected && user.type === "employe"
                    ? <Pointage />
                    : <Navigate to="/loginEmploye" replace />
                }
              />

              {/* PAGE FICHE DE PAIE MENSUELLE */}
              <Route
                path="/fichePaie"
                element={
                  user.isConnected && user.type === "employe"
                    ? <FichePaie />
                    : <Navigate to="/loginEmploye" replace />
                }
              />

              {/* PAGE FILTRE MOIS & ANNÉE (optionnelle) */}
              <Route
                path="/filtreMoisAnnee"
                element={
                  user.isConnected && user.type === "employe"
                    ? <FiltreMoisAnnee />
                    : <Navigate to="/loginEmploye" replace />
                }
              />

              {/* PAGE PERFORMANCE */}
              <Route
                path="/Performance-Employe"
                element={
                  user.isConnected && user.type === "employe"
                    ? <PerformanceEmploye />
                    : <Navigate to="/loginEmploye" replace />
                }
              />

              {/* DEMANDE DE CONGÉ EMPLOYÉ */}
              <Route
                path="/demandeConge"
                element={
                  user.isConnected && user.type === "employe"
                    ? <DemandeCongeEmploye />
                    : <Navigate to="/loginEmploye" replace />
                }
              />

              {/* DECONNEXION EMPLOYÉ */}
              <Route
                path="/deconnexionEmploye"
                element={
                  user.isConnected && user.type === "employe"
                    ? <DeconnexionEmploye onLogout={handleLogout} />
                    : <Navigate to="/loginEmploye" replace />
                }
              />
              
              <Route path="/Modifier-Profil-Employe" element={user.type === "employe" ? <ModifierProfilEmploye /> : <Navigate to="/loginEmploye" />} />
              <Route path="/MesDocuments" element={user.type === "employe" ? <MesDocuments /> : <Navigate to="/loginEmploye" />} />

              {/* --------------------------------- */}
              {/* ROUTES ENTREPRISE */}
              {/* --------------------------------- */}
              <Route path="/listAnnouncement" element={user.type === "entreprise" ? <ListingAnnouncement /> : <Navigate to="/loginEntreprise" />} />
              <Route path="/listCandidate" element={user.isConnected && user.type === "entreprise" ? <ListCandidate /> : <Navigate to="/loginEntreprise" replace />} />
              <Route path="/calendrierAbsences" element={user.isConnected && user.type === "entreprise" ? <CalendrierAbsences /> : <Navigate to="/loginEntreprise" replace />} />
              <Route path="/demandesConge" element={user.isConnected && user.type === "entreprise" ? <DemandesConge /> : <Navigate to="/loginEntreprise" replace />} />
              <Route path="/configuration" element={user.isConnected && user.type === "entreprise" ? <Configuration /> : <Navigate to="/loginEntreprise" replace />} />
              <Route path="/filter" element={user.isConnected && user.type === "entreprise" ? <Filter /> : <Navigate to="/loginEntreprise" replace />} />
              <Route path="/voirprofil/:id" element={user.type === "entreprise" ? <VoirProfil theme={theme} /> : <Navigate to="/loginEntreprise" />} />
              <Route path="/voirprofil" element={user.isConnected && user.type === "entreprise" ? <VoirProfil theme={theme} /> : <Navigate to="/loginEntreprise" replace />} />

            </Routes>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
