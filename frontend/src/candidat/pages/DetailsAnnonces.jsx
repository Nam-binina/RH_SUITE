import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaidIcon from "@mui/icons-material/Paid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";

// --- Exemple d’annonce (dans un vrai projet, ce serait via une API ou props)
const annonces = [
  {
    id: 1,
    title: "Développeur React",
    company: "Tech Solutions",
    description:
      "Rejoignez notre équipe pour concevoir des interfaces web performantes avec React, Material UI et Redux. Vous collaborerez avec des designers et des développeurs backend pour créer des applications modernes et réactives.",
    tags: ["React", "JavaScript", "Material-UI", "Redux", "API REST"],
    date: "15 Sept 2025",
    status: "Ouvert",
    salary: "3 500 € / mois",
    contract: "CDI",
    location: "Antananarivo, Madagascar",
    experience: "2+ ans",
    isFavorite: false,
    advantages: ["Télétravail possible", "Formation continue", "Mutuelle santé"],
    image: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
  },
  {
    id: 2,
    title: "Backend Node.js",
    company: "Digital Factory",
    description:
      "Participez au développement de microservices performants et scalables en Node.js. Vous travaillerez sur la conception d’API sécurisées et sur l’optimisation des performances serveur.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    date: "12 Sept 2025",
    status: "Ouvert",
    salary: "4 000 € / mois",
    contract: "CDI",
    location: "Paris, France",
    experience: "3+ ans",
    isFavorite: true,
    advantages: ["Tickets restaurant", "Télétravail hybride", "Équipe jeune et dynamique"],
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103626.png",
  },
];

function DetailsAnnonces() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { annonceId } = useParams();

  // --- Récupération de l’annonce ---
  const annonce =
    location.state?.annonce ||
    annonces.find((a) => a.id === parseInt(annonceId, 10)) ||
    annonces[0];

  // --- Navigation ---
  const handleRetour = () => navigate("/tableaudebord");
  const handleGoToVoirProfil = () => navigate("/ProfilCandidat");
  const handleMesCandidatures = () => navigate("/MesCandidatures");
  const handleLogOut = () => navigate("/LoginCandidat");

  const handleToggleFavorite = () => {
    console.log("Ajouté/retiré des favoris");
  };
  const handlePostuler = (id, annonce) => {
  navigate(`/qcm/${id}`, { state: { annonce } }); // ✅ données sérialisables
};

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      {/* Barre latérale gauche */}
      <Box
        sx={{
          width: 230,
          bgcolor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          py: 2,
          boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
        }}
      >
        <List>
          <ListItem button onClick={handleGoToVoirProfil}>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Mes infos" />
          </ListItem>

          <ListItem button onClick={handleMesCandidatures}>
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Mes candidatures" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Favoris" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <CalendarTodayIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Agenda" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Infos utiles" />
          </ListItem>

          <Divider sx={{ my: 1 }} />

          <ListItem button onClick={handleLogOut}>
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItem>
        </List>
      </Box>

      {/* Contenu principal */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            p: 4,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* En-tête de l’annonce */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src={annonce.image}
              sx={{ width: 80, height: 80, mr: 2, bgcolor: "grey.200" }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {annonce.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BusinessIcon color="action" fontSize="small" />
                <Typography color="text.secondary">{annonce.company}</Typography>
              </Box>
            </Box>

            <Box sx={{ ml: "auto" }}>
              <Tooltip
                title={
                  annonce.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
                }
              >
                <IconButton
                  onClick={handleToggleFavorite}
                  sx={{
                    color: annonce.isFavorite ? "error.main" : "grey.500",
                  }}
                >
                  {annonce.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Informations principales */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
            <Chip
              icon={<PaidIcon />}
              label={annonce.salary}
              variant="outlined"
              color="success"
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={annonce.contract}
              variant="outlined"
              color="primary"
            />
            <Chip
              icon={<LocationOnIcon />}
              label={annonce.location}
              variant="outlined"
              color="secondary"
            />
            <Chip
              icon={<StarIcon />}
              label={annonce.experience}
              variant="outlined"
              color="warning"
            />
          </Box>

          {/* Description détaillée */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            {annonce.description}
          </Typography>

          {/* Compétences requises */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Compétences requises :
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {annonce.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{
                  backgroundColor: `${theme.palette.primary.main}15`,
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>

          {/* Avantages */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Avantages :
          </Typography>
          <ul style={{ marginTop: 0, marginBottom: 20 }}>
            {annonce.advantages.map((adv, index) => (
              <li key={index}>
                <Typography variant="body2" color="text.secondary">
                  {adv}
                </Typography>
              </li>
            ))}
          </ul>

          {/* Informations complémentaires */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              mt: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography color="text.secondary">
                Publiée le {annonce.date}
              </Typography>
            </Box>

            <Chip
              label={annonce.status}
              color={annonce.status === "Ouvert" ? "success" : "error"}
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* Boutons d’action */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleRetour}
            >
              Retour
            </Button>
           
           <Button
  variant="contained"
  onClick={() => handlePostuler(annonces.id, annonces)} // ✅ envoie un id et/ou l'objet
>
  Postuler
</Button>

          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default DetailsAnnonces;
