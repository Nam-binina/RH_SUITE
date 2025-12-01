import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// Icônes
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";

function MesCandidatures() {
  const navigate = useNavigate();
  const theme = useTheme();

  const candidatures = [
    {
      id: 1,
      title: "Développeur React",
      company: "Tech Solutions",
      dateCandidature: "20 Octobre 2025",
      status: "En attente",
      image: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
    },
    {
      id: 2,
      title: "Designer UI/UX",
      company: "Creative Studio",
      dateCandidature: "10 Octobre 2025",
      status: "Acceptée",
      image: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
    },
    {
      id: 3,
      title: "Développeur Backend Node.js",
      company: "SoftTech",
      dateCandidature: "5 Octobre 2025",
      status: "Refusée",
      image: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    },
  ];

  // Navigation
  const handleVoirDetails = (candidature) =>
    navigate("/Details-Annonces", { state: candidature });
  const handleGoToProfil = () => navigate("/profilCandidat");
  const handleMesCandidatures = () => navigate("/Voir-Mes-Candidatures");
  const handleLogOut = () => navigate("/logout");
  const handleGoToTableauBord = () => navigate("/tableaudebord");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          bgcolor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          py: 2,
        }}
      >
        <List>
          <ListItem button onClick={handleGoToProfil}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Moi - Deconnexion" />
          </ListItem>

          <ListItem button onClick={handleMesCandidatures}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Mes candidatures" />
          </ListItem>

          <ListItem button onClick={handleGoToTableauBord}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Annonces" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Agenda" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Infos utiles" />
          </ListItem>

          <Divider sx={{ my: 1 }} />

          <ListItem button onClick={handleLogOut}>
           
          </ListItem>
        </List>
      </Box>

      {/* Contenu principal */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Mes Candidatures
        </Typography>

        {candidatures.length === 0 ? (
          <Typography color="text.secondary" sx={{ mt: 3 }}>
            Vous n'avez encore postulé à aucune offre.
          </Typography>
        ) : (
          candidatures.map((candidature) => (
            <Card
              key={candidature.id}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0px 3px 12px rgba(0,0,0,0.08)",
                "&:hover": { boxShadow: "0px 5px 20px rgba(0,0,0,0.12)" },
                transition: "0.3s",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={candidature.image}
                  alt={candidature.company}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {candidature.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <BusinessIcon color="action" fontSize="small" />
                    <Typography color="text.secondary">{candidature.company}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography color="text.secondary">
                      Candidaté le {candidature.dateCandidature}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={candidature.status}
                    color={
                      candidature.status === "Acceptée"
                        ? "success"
                        : candidature.status === "Refusée"
                        ? "error"
                        : "warning"
                    }
                    sx={{ fontWeight: 600 }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleVoirDetails(candidature)}
                  >
                    Voir détails
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
}

export default MesCandidatures;
