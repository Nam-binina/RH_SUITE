import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
  LinearProgress,
  Divider,
  Badge,
  Tabs,
  Tab,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Tooltip,
  useTheme,
} from "@mui/material";
import { ModernButton } from "../layout/ModernButton";
import { Send, Call } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Icônes SVG personnalisées

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const WorkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.52-1.53-2.67 0-4.83 2.16-4.83 4.83 0 .38.04.75.13 1.1-4.02-.2-7.58-2.13-9.97-5.06-.42.72-.66 1.55-.66 2.44 0 1.68.85 3.16 2.15 4.03-.79-.03-1.54-.24-2.19-.61v.06c0 2.34 1.67 4.29 3.88 4.74-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z" />
  </svg>
);

const VoirProfil = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [recentProjects, setRecentProjects] = useState(null);
  
  const [loading, setLoading] = useState(true);
  // Données de profil complètes
  // const profileData = {
  //   // Informations de base
  //   firstName: "Alexandre",
  //   lastName: "Dupont",
  //   title: "Développeur Full Stack Senior",
  //   company: "Tech Innovation Inc.",
  //   avatar: null,
  //   coverImage: null,

  //   // Statut
  //   status: "Actif",
  //   verified: true,
  //   premium: true,

  //   // Coordonnées
  //   email: "alexandre.dupont@email.com",
  //   phone: "+33 6 12 34 56 78",
  //   location: "Paris, France",
  //   website: "www.alexandredupont.dev",

  //   // Professionnel
  //   experience: "8 ans",
  //   education: "Master en Informatique",
  //   joinDate: "Janvier 2020",
  //   department: "Développement Web",

  //   // Bio
  //   bio: "Passionné par le développement web et les nouvelles technologies. Spécialisé dans React, Node.js et l'architecture cloud. J'aime créer des solutions innovantes et partager mes connaissances avec la communauté.",

  //   // Compétences avec niveaux
  //   skills: [
  //     { name: "React", level: 95 },
  //     { name: "Node.js", level: 90 },
  //     { name: "TypeScript", level: 88 },
  //     { name: "Python", level: 85 },
  //     { name: "AWS", level: 80 },
  //     { name: "Docker", level: 82 },
  //     { name: "MongoDB", level: 78 },
  //     { name: "GraphQL", level: 75 },
  //   ],

  //   // Réalisations
  //   achievements: [
  //     {
  //       title: "Contributeur Star",
  //       icon: "⭐",
  //       description: "Plus de 1000 contributions",
  //     },
  //     {
  //       title: "Mentor Expert",
  //       icon: "🎓",
  //       description: "Formation de 50+ développeurs",
  //     },
  //     {
  //       title: "Innovation Award",
  //       icon: "🏆",
  //       description: "Prix de l'innovation 2024",
  //     },
  //     {
  //       title: "Open Source Hero",
  //       icon: "💻",
  //       description: "20+ projets open source",
  //     },
  //   ],

  //   // Statistiques
  //   stats: {
  //     projects: 127,
  //     commits: 5420,
  //     reviews: 890,
  //     followers: 1234,
  //   },

  //   // Réseaux sociaux
  //   social: {
  //     github: "github.com/alexandre-dupont",
  //     linkedin: "linkedin.com/in/alexandre-dupont",
  //     twitter: "@alex_dupont_dev",
  //   },

  //   // Projets récents
  //   recentProjects: [
  //     {
  //       name: "E-Commerce Platform",
  //       role: "Lead Developer",
  //       status: "En production",
  //       tech: ["React", "Node.js", "MongoDB"],
  //     },
  //     {
  //       name: "Analytics Dashboard",
  //       role: "Full Stack Developer",
  //       status: "En cours",
  //       tech: ["Vue.js", "Python", "PostgreSQL"],
  //     },
  //     {
  //       name: "Mobile App iOS",
  //       role: "Backend Developer",
  //       status: "Terminé",
  //       tech: ["Swift", "Firebase", "GraphQL"],
  //     },
  //   ],

  //   // Langues
  //   languages: [
  //     { name: "Français", level: "Natif" },
  //     { name: "Anglais", level: "Courant" },
  //     { name: "Espagnol", level: "Intermédiaire" },
  //   ],

  //   // Certifications
  //   certifications: [
  //     "AWS Certified Solutions Architect",
  //     "Google Cloud Professional",
  //     "MongoDB Certified Developer",
  //   ],
  // };
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`http://localhost:8181/api/candidats/${id}`),
      axios.get(`http://localhost:8181/api/candidats/projets/${id}`)
    ])
      .then(([profileRes, projectsRes]) => {
        setProfileData(profileRes.data);
        setRecentProjects(projectsRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du profil :", err);
        setLoading(false);
      });
  }, [id]);
  if (!profileData) {
    return <div>Chargement...</div>; // Affichage pendant le fetch
  }

  if (loading) return <Typography>Chargement...</Typography>;
  // if (!recentProjects) return <Typography>Projet introuvable</Typography>;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
      {/* Cover Image & Avatar Section */}
      <Card
        sx={{
          mb: 3,
          overflow: "visible",
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Cover Image */}
        <Box
          sx={{
            height: 200,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            position: "relative",
          }}
        ></Box>

        <CardContent sx={{ pt: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            {/* Avatar Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: -8,
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.success.main,
                      border: `3px solid ${theme.palette.background.paper}`,
                    }}
                  />
                }
              >
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    fontSize: "3rem",
                    fontWeight: 700,
                  }}
                >
                  {profileData.prenom.charAt(0)}
                  {profileData.nom.charAt(0)}
                </Avatar>
              </Badge>

              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                {/* {profileData.verified && (
                  <Chip
                    label="Vérifié"
                    size="small"
                    icon={<StarIcon />}
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}20`,
                      color: theme.palette.primary.light,
                      border: `1px solid ${theme.palette.primary.main}`,
                    }}
                  />
                )}
                {profileData.premium && (
                  <Chip
                    label="Premium"
                    size="small"
                    icon={<TrophyIcon />}
                    sx={{
                      backgroundColor: `${theme.palette.warning.main}20`,
                      color: theme.palette.warning.main,
                      border: `1px solid ${theme.palette.warning.main}`,
                    }}
                  />
                )} */}
              </Box>
            </Box>

            {/* Main Info Section */}
            <Box sx={{ flex: 1, pt: { xs: 2, md: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: 0.5,
                    }}
                  >
                    {profileData.prenom} {profileData.nom}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {/* {profileData.title} */}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {/* {profileData.company} */}
                  </Typography>
                </Box>

                <Chip
                  // label={profileData.status}
                  sx={{
                    backgroundColor: `${theme.palette.success.main}20`,
                    color: theme.palette.success.main,
                    border: `1px solid ${theme.palette.success.main}`,
                    fontWeight: 600,
                  }}
                />
              </Box>

              {/* Stats Cards */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {Object.entries(profileData.atouts).map(([key, value]) => (
                  <Grid item xs={6} sm={3} key={key}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        backgroundColor: `${theme.palette.primary.main}10`,
                        border: `1px solid ${theme.palette.primary.main}20`,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                        },
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                        }}
                      >
                        {value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          textTransform: "capitalize",
                        }}
                      >
                        {key}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              color: theme.palette.text.secondary,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.main,
              height: 3,
            },
          }}
        >
          <Tab label="À propos" />
          <Tab label="Compétences" />
          <Tab label="Projets" />
          <Tab label="Réalisations" />
        </Tabs>
      </Card>

      {/* Tab Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {activeTab === 0 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Biographie
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                    mb: 4,
                  }}
                >
                  {/* {profileData.bio} */}
                </Typography>

                <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Informations de contact
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={profileData.email}
                      primaryTypographyProps={{
                        color: theme.palette.text.secondary,
                        variant: "body2",
                      }}
                      secondaryTypographyProps={{
                        color: theme.palette.text.primary,
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Téléphone"
                      secondary={profileData.numero}
                      primaryTypographyProps={{
                        color: theme.palette.text.secondary,
                        variant: "body2",
                      }}
                      secondaryTypographyProps={{
                        color: theme.palette.text.primary,
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Localisation"
                      secondary={profileData.adresse}
                      primaryTypographyProps={{
                        color: theme.palette.text.secondary,
                        variant: "body2",
                      }}
                      secondaryTypographyProps={{
                        color: theme.palette.text.primary,
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WorkIcon />
                    </ListItemIcon>
                    <ListItemText
                      // primary="Expérience"
                      // secondary={profileData.experience}
                      // primaryTypographyProps={{
                      //   color: theme.palette.text.secondary,
                      //   variant: "body2",
                      // }}
                      // secondaryTypographyProps={{
                      //   color: theme.palette.text.primary,
                      // }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                    <ListItemText
                      // primary="Membre depuis"
                      // secondary={profileData.joinDate}
                      // primaryTypographyProps={{
                      //   color: theme.palette.text.secondary,
                      //   variant: "body2",
                      // }}
                      // secondaryTypographyProps={{
                      //   color: theme.palette.text.primary,
                      // }}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Réseaux sociaux
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Tooltip title="GitHub">
                    <IconButton
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}10`,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: `${theme.palette.primary.main}20`,
                        },
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn">
                    <IconButton
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}10`,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: `${theme.palette.primary.main}20`,
                        },
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Twitter">
                    <IconButton
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}10`,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: `${theme.palette.primary.main}20`,
                        },
                      }}
                    >
                      <TwitterIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          )}

          {activeTab === 1 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Compétences techniques
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {profileData.competences.map((skill) => (
                    <Box key={skill.nom}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 500,
                          }}
                        >
                          {skill.nom}
                        </Typography>
                        {/* <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                          }}
                        >
                          {skill.level}%
                        </Typography> */}
                      </Box>
                      {/* <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: `${theme.palette.primary.main}20`,
                          "& .MuiLinearProgress-bar": {
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            borderRadius: 4,
                          },
                        }}
                      /> */}
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 4, borderColor: theme.palette.divider }} />

                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Langues
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {profileData.langues.map((language) => (
                    <Chip
                      key={language.nom}
                      label={`${language.nom}`}
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}20`,
                        color: theme.palette.secondary.light,
                        border: `1px solid ${theme.palette.secondary.main}40`,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Projets récents
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {Array.isArray(recentProjects) && recentProjects.map((project, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 3,
                        backgroundColor: `${theme.palette.primary.main}05`,
                        border: `1px solid ${theme.palette.divider}`,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateX(8px)",
                          borderColor: theme.palette.primary.main,
                          boxShadow: `0 4px 20px ${theme.palette.primary.main}20`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                              mb: 0.5,
                            }}
                          >
                            {project.nom}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            {/* {project.role} */}
                          </Typography>
                        </Box>
                        <Chip
                          // label={project.status}
                          // size="small"
                          // sx={{
                          //   backgroundColor:
                          //     project.status === "En production"
                          //       ? `${theme.palette.success.main}20`
                          //       : project.status === "En cours"
                          //       ? `${theme.palette.warning.main}20`
                          //       : `${theme.palette.text.secondary}20`,
                          //   color:
                          //     project.status === "En production"
                          //       ? theme.palette.success.main
                          //       : project.status === "En cours"
                          //       ? theme.palette.warning.main
                          //       : theme.palette.text.secondary,
                          //   border: `1px solid ${
                          //     project.status === "En production"
                          //       ? theme.palette.success.main
                          //       : project.status === "En cours"
                          //       ? theme.palette.warning.main
                          //       : theme.palette.text.secondary
                          //   }`,
                          // }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {project.tech.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: `${theme.palette.primary.main}20`,
                              color: theme.palette.primary.light,
                              fontSize: "0.75rem",
                            }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {activeTab === 3 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Réalisations & Badges
                </Typography>
                <Grid container spacing={2}>
                  {profileData.achievements && profileData.achievements.map((achievement, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          backgroundColor: `${theme.palette.primary.main}10`,
                          border: `1px solid ${theme.palette.primary.main}30`,
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: `0 8px 32px ${theme.palette.primary.main}30`,
                          },
                        }}
                      >
                        <Typography variant="h2" sx={{ mb: 1 }}>
                          {achievement.icon}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          {achievement.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {achievement.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Right Column - Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Certifications Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Certifications
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {profileData.certificats.map((cert, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      backgroundColor: `${theme.palette.primary.main}10`,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.primary.main}20`,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}15`,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                      }}
                    >
                      {cert}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Activity Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Activité récente
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem
                  sx={{
                    px: 0,
                    py: 1.5,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                      }}
                    >
                      Nouveau projet créé
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Il y a 2 heures
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    py: 1.5,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                      }}
                    >
                      Code review complétée
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Il y a 5 heures
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    py: 1.5,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                      }}
                    >
                      Badge obtenu: Expert React
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Hier
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                      }}
                    >
                      Nouveau follower
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Il y a 2 jours
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <ModernButton variant="pulse" startIcon={<Send />}>
          Envoyer un email
        </ModernButton>
        <ModernButton variant="pulse" startIcon={<Call />}>
          Appeler
        </ModernButton>
        <ModernButton variant="pulse" startIcon={<Send />}>
          Envoyer un message
        </ModernButton>
      </Box>
      <br />
      <br />
    </Box>
  );
};

export default VoirProfil;
