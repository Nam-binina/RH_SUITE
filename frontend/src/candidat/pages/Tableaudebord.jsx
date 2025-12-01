import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Container,
  TextField,
  InputAdornment,
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
  Work,
  Favorite,
  CalendarToday,
  Info,
  Logout,
  Business,
  LocationOn,
  AccessTime,
  Code,
  Star,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Search from "@mui/icons-material/Search";

const Tableaudebord = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [candidatData] = useState({
    prenom: "Tendry",
    nom: "Rakoto",
    email: "tendry.rakoto@example.com",
    photo: "https://via.placeholder.com/80",
  });

  const annonces = [
    {
      id: 1,
      title: "Développeur React",
      company: "Tech Solutions",
      date: "15 Sept 2025",
      localisation: "Paris 3e",
      specialites: "JavaScript, React, API REST",
      statut: "Ouvert",
    },
    {
      id: 2,
      title: "Backend Node.js",
      company: "E-commerce Corp",
      date: "12 Sept 2025",
      localisation: "Lyon",
      specialites: "Node.js, Express, MongoDB",
      statut: "Ouvert",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Analytics Pro",
      date: "8 Sept 2025",
      localisation: "Marseille",
      specialites: "Python, SQL, Power BI",
      statut: "Fermé",
    },
    {
      id: 4,
      title: "Mobile Flutter",
      company: "Wellness App",
      date: "6 Sept 2025",
      localisation: "Toulouse",
      specialites: "Flutter, Dart, Firebase",
      statut: "Ouvert",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const searchedAnnonces = annonces.filter((a) =>
    [a.title, a.company].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigation
  const handleGoToProfil = () => navigate("/profilCandidat");
  const handleMesCandidatures = () => navigate("/Voir-Mes-Candidatures");
  const handleVoirDetailsAnnonces = (annonce) =>
    navigate("/Details-Annonces", { state: annonce });
  const handlePostuler = (annonce) =>
    navigate("/qcm", { state: { annonce } });
const handleLogOut = () => {
  // Supprimer éventuellement l'état du user stocké
  localStorage.removeItem("user"); // si tu stockes l'utilisateur en localStorage
  navigate("/login"); // redirection vers la page de connexion
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
          Mon Espace
        </Typography>

        <List>
          <ListItem button onClick={handleGoToProfil}>
            <ListItemIcon>
              <Person sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Moi - Deconnexion" />
          </ListItem>

          <ListItem button onClick={handleMesCandidatures}>
            <ListItemIcon>
              <Work sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Mes candidatures" />
          </ListItem>


          <Divider sx={{ my: 2 }} />
  
          {/* Déconnexion */}
         
        </List>
      </Box>

      {/* Contenu principal */}
      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={candidatData.photo} sx={{ width: 80, height: 80 }} />
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
                Bonjour {candidatData.prenom} !
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Découvrez les dernières annonces correspondant à vos compétences
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Star />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            Recommandations
          </Button>
        </Box>

        {/* Recherche */}
        <TextField
          fullWidth
          placeholder="Rechercher un poste ou une entreprise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Annonces */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 3 }}>
          {searchedAnnonces.length > 0 ? (
            searchedAnnonces.map((annonce) => (
              <Card
                key={annonce.id}
                sx={{
                  borderRadius: 2,
                  backdropFilter: "blur(15px)",
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                  boxShadow: 4,
                  transition: "all 0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {annonce.title}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.8 }}>
                    <Business sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="body2">{annonce.company}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.8 }}>
                    <LocationOn sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="body2">{annonce.localisation}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.8 }}>
                    <AccessTime sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="body2">{annonce.date}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Code sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="body2">{annonce.specialites}</Typography>
                  </Box>

                  <Chip
                    label={annonce.statut}
                    color={annonce.statut === "Ouvert" ? "success" : "error"}
                    size="small"
                  />
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Tooltip title="Postuler">
                    <Button size="small" variant="contained" onClick={() => handlePostuler(annonce)}>
                      Postuler
                    </Button>
                  </Tooltip>
                  <Tooltip title="Voir détails">
                    <Button size="small" variant="outlined" onClick={() => handleVoirDetailsAnnonces(annonce)}>
                      Détails
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography>Aucune annonce trouvée.</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Tableaudebord;
