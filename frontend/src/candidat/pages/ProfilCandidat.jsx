import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Fade,
  Chip,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ProfilCandidat = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [candidatData] = useState({
    prenom: "Tendry",
    nom: "Rakoto",
    email: "tendry.rakoto@example.com",
    numero: "+261 34 12 345 67",
    adresse: "Lot III Antananarivo",
    date_naissance: "1995-06-15",
    linkedin: "https://linkedin.com/in/tendry",
    github: "https://github.com/tendry",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    titre: "Développeur Full-Stack Junior",
    niveau_etude: "Licence en Informatique",
    experience: "2 ans d’expérience en développement web",
    competences: ["React", "Node.js", "MySQL", "Python", "Git"],
    langues: ["Français", "Anglais", "Malgache"],
    description:
      "Passionné par le développement web, j’aime apprendre de nouvelles technologies et créer des solutions pratiques et efficaces. Mon objectif est de rejoindre une équipe dynamique où je pourrais progresser techniquement tout en apportant une vraie valeur ajoutée.",
  });

  // Fonctions de navigation
  const handleMesCandidatures = () => navigate("/Voir-Mes-Candidatures");
  const handleGotoTableBord = () => navigate("/Tableau-bord");
  const handleGoToEditProfil = () => navigate("/Modifier-Profil");
  const handleExportCV = () => navigate("/Export-CV");
  const handleLogOut = () => navigate("/logout");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* --- Barre latérale --- */}
      <Box
        sx={{
          width: 230,
          bgcolor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          py: 2,
        }}
      >
        <List>
          <ListItem button onClick={handleMesCandidatures}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Mes candidatures" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favoris" />
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

          <ListItem button onClick={() => navigate("/logout")}>
  <ListItemIcon><LogoutIcon /></ListItemIcon>
  <ListItemText primary="Déconnexion" />
</ListItem>

        </List>
      </Box>

      {/* --- Contenu principal --- */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          background: theme.palette.background.default,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 900, px: 2 }}>
          <Fade in timeout={600}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                backdropFilter: "blur(20px)",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Message d'accueil */}
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Bonjour {candidatData.prenom} !
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary, mb: 4 }}
                >
                  Heureux de vous revoir. Continuez votre recherche d’emploi,
                  suivez vos candidatures et mettez à jour votre profil pour
                  attirer les recruteurs.
                </Typography>

                {/* En-tête du profil */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 4,
                  }}
                >
                  <Avatar
                    src={candidatData.photo}
                    sx={{
                      width: 130,
                      height: 130,
                      mb: 2,
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                    }}
                  />
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
                    {candidatData.prenom} {candidatData.nom}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {candidatData.titre}
                  </Typography>
                </Box>

                {/* Informations de contact */}
                <List sx={{ p: 0 }}>
                  {[
                    { icon: <EmailIcon />, text: candidatData.email },
                    { icon: <PhoneIcon />, text: candidatData.numero },
                    { icon: <LocationOnIcon />, text: candidatData.adresse },
                    {
                      icon: <CalendarTodayIcon />,
                      text: candidatData.date_naissance,
                    },
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon
                        sx={{
                          minWidth: 40,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          color: theme.palette.text.primary,
                          fontSize: "0.95rem",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Liens sociaux */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <Tooltip title="LinkedIn">
                    <IconButton
                      component="a"
                      href={candidatData.linkedin}
                      target="_blank"
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}15`,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: `${theme.palette.primary.main}30`,
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="GitHub">
                    <IconButton
                      component="a"
                      href={candidatData.github}
                      target="_blank"
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}15`,
                        color: theme.palette.secondary.main,
                        "&:hover": {
                          backgroundColor: `${theme.palette.secondary.main}30`,
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* À propos */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    À propos de moi
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {candidatData.description}
                  </Typography>
                </Box>

                {/* Compétences */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Compétences
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {candidatData.competences.map((comp, index) => (
                      <Chip
                        key={index}
                        label={comp}
                        sx={{
                          backgroundColor: `${theme.palette.primary.main}15`,
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Langues */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Langues parlées
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {candidatData.langues.map((lang, index) => (
                      <Chip
                        key={index}
                        label={lang}
                        sx={{
                          backgroundColor: `${theme.palette.secondary.main}15`,
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Boutons d’action */}
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 5,
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    onClick={handleGoToEditProfil}
                    variant="outlined"
                    sx={{
                      px: 4,
                      py: 1.2,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Modifier le profil
                  </Button>

                  <Button
                    onClick={handleMesCandidatures}
                    variant="contained"
                    sx={{
                      px: 4,
                      py: 1.2,
                      borderRadius: 2,
                      fontWeight: 600,
                      background: theme.palette.primary.main,
                    }}
                  >
                    Mes candidatures
                  </Button>

                  <Button
                    onClick={handleGotoTableBord}
                    sx={{
                      px: 4,
                      py: 1.2,
                      borderRadius: 2,
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: "#fff",
                      boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                      "&:hover": {
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    Voir les annonces
                  </Button>

                  <Button
                    onClick={handleExportCV}
                    sx={{
                      px: 4,
                      py: 1.2,
                      borderRadius: 2,
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: "#fff",
                      boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                      "&:hover": {
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    Exporter le CV
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilCandidat;
