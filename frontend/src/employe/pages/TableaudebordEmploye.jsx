import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Container,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";

import {
  Person,
  AccessTime,
  CalendarMonth,
  Logout,
  Paid,
  History,
  WarningAmber,
  BeachAccess,
  DashboardCustomize,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const TableaudebordEmploye = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Données employé
  const [employeData] = useState({
    prenom: "Tendry",
    nom: "Rakoto",
    poste: "Développeur Fullstack",
    photo: "https://via.placeholder.com/80",
    deconnexionEmployeRestants: 14,
    heuresSemaine: 38,
    heuresMois: 160,
    pointage: 1,
  });

  // Alertes RH (exemples)
  const alertes = [
    { id: 1, message: "Votre fiche de paie du mois est disponible.", type: "info" },
    { id: 2, message: "Régularisation d'absence en attente de justification.", type: "warning" },
  ];

  // Navigation
  const handleGoToProfil = () => navigate("/profilEmploye");
  const handleGoTorelevePresence = () => navigate("/relevePresence");
  const handleGoTopointage = () => navigate("/pointage");
  const handleGoToFichePaie = () => navigate("/fichePaie");
  const handleGoTodeconnexionEmploye = () => navigate("/deconnexionEmploye");

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          bgcolor: theme.palette.background.paper,
          display: "flex",
          flexDirection: "column",
          py: 2,
          borderRight: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2, fontWeight: 600 }}>
          Espace employé
        </Typography>

        <List>
          <ListItem button onClick={handleGoToProfil}>
            <ListItemIcon>
              <Person sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Mon Profil" />
          </ListItem>

          <ListItem button onClick={handleGoTorelevePresence}>
            <ListItemIcon>
              <AccessTime sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Présence" />
          </ListItem>

          <ListItem button onClick={handleGoTopointage}>
            <ListItemIcon>
              <CalendarMonth sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="pointage" />
          </ListItem>

          <ListItem button onClick={handleGoToFichePaie}>
            <ListItemIcon>
              <Paid sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Fiche de paie" />
          </ListItem>

         

          <Divider sx={{ my: 2 }} />

          {/* Logout */}
          <ListItem button onClick={handleGoTodeconnexionEmploye}>
            <ListItemIcon>
              <Logout sx={{ color: theme.palette.error.main }} />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItem>
        </List>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={employeData.photo} sx={{ width: 80, height: 80 }} />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Bonjour {employeData.prenom}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Poste : {employeData.poste}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<DashboardCustomize />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            Vue globale
          </Button>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 3,
          }}
        >
          {/* Heures semaine */}
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Heures cette semaine
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {employeData.heuresSemaine}h
              </Typography>
            </CardContent>
          </Card>

          {/* Heures mois */}
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Heures ce mois
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {employeData.heuresMois}h
              </Typography>
            </CardContent>
          </Card>

          {/* Congés restants */}
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Congés restants
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {employeData.deconnexionEmployeRestants} jours
              </Typography>
            </CardContent>
          </Card>

          {/* pointage */}
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                pointage ce mois
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {employeData.pointage}
              </Typography>
            </CardContent>
          </Card>

          {/* Fiche de paie */}
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Fiche de paie
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Mois en cours
              </Typography>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="outlined" onClick={handleGoToFichePaie}>
                Voir fiche
              </Button>
            </CardActions>
          </Card>

          {/* Alertes RH */}
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Alertes RH
              </Typography>

              {alertes.length === 0 ? (
                <Typography sx={{ mt: 1 }}>Aucune alerte.</Typography>
              ) : (
                alertes.map((a) => (
                  <Chip
                    key={a.id}
                    icon={<WarningAmber />}
                    label={a.message}
                    color={a.type === "warning" ? "warning" : "info"}
                    sx={{ my: 0.5 }}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default TableaudebordEmploye;
