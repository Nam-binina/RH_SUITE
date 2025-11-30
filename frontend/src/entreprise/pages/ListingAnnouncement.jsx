import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  LinearProgress,
  Paper,
  useTheme,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// Icônes SVG (inchangées)
const MoreVertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const ListingAnnouncement = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobListings ,setJobListings] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:8181/api/postes")
      .then((res) => {
        const profils = res.data.map((profil) => ({
        id: profil.id,
        title: profil.domaine.nom,
        diplome: profil.diplome.nom,
        ageMin: profil.ageMin,
        ageMax: profil.ageMax,
        skills: profil.competences.map(c => c.nom),
        certificats: profil.certificats.map(c => c.nom),
        langues: profil.langues.map(l => l.nom),
        remote: profil.remote,
        salary: profil.salary,
        experience: profil.experience,
        postedDate: profil.datelimite
        }));
        setJobListings(profils);
      })
      .catch((err) => console.error("Erreur lors du chargement des candidats:", err));
  }, []);

  // Données des annonces (inchangées)
  // const jobListings = [
  //   {
  //     id: 1,
  //     title: "Développeur Full Stack Senior",
  //     company: "Tech Innovation Inc.",
  //     location: "Paris, France",
  //     type: "CDI",
  //     remote: true,
  //     salary: "50k - 70k €",
  //     experience: "Senior (5+ ans)",
  //     status: "active",
  //     postedDate: "2024-10-15",
  //     deadline: "2024-11-30",
  //     applications: 42,
  //     views: 328,
  //     questions: 8,
  //     skills: ["React", "Node.js", "TypeScript", "AWS"],
  //     description:
  //       "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique.",
  //   },
  //   {
  //     id: 2,
  //     title: "Designer UI/UX",
  //     company: "Digital Solutions SARL",
  //     location: "Lyon, France",
  //     type: "CDI",
  //     remote: true,
  //     salary: "40k - 55k €",
  //     experience: "Intermédiaire (3-5 ans)",
  //     status: "active",
  //     postedDate: "2024-10-20",
  //     deadline: "2024-12-15",
  //     applications: 28,
  //     views: 215,
  //     questions: 5,
  //     skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
  //     description:
  //       "Créez des expériences utilisateur exceptionnelles pour nos produits innovants.",
  //   },
  //   {
  //     id: 3,
  //     title: "Data Scientist",
  //     company: "Data Analytics Pro",
  //     location: "Marseille, France",
  //     type: "CDI",
  //     remote: false,
  //     salary: "55k - 75k €",
  //     experience: "Senior (5+ ans)",
  //     status: "closed",
  //     postedDate: "2024-09-10",
  //     deadline: "2024-10-10",
  //     applications: 67,
  //     views: 542,
  //     questions: 10,
  //     skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
  //     description:
  //       "Analysez des données complexes et développez des modèles prédictifs.",
  //   },
  //   {
  //     id: 4,
  //     title: "Stagiaire Développeur Mobile",
  //     company: "Mobile First Startup",
  //     location: "Remote",
  //     type: "Stage",
  //     remote: true,
  //     salary: "1200 €/mois",
  //     experience: "Débutant",
  //     status: "active",
  //     postedDate: "2024-10-22",
  //     deadline: "2024-12-01",
  //     applications: 15,
  //     views: 189,
  //     questions: 6,
  //     skills: ["React Native", "JavaScript", "Mobile Development"],
  //     description:
  //       "Rejoignez notre équipe mobile pour apprendre et contribuer à nos applications.",
  //   },
  //   {
  //     id: 5,
  //     title: "Chef de Projet Technique",
  //     company: "Enterprise Solutions",
  //     location: "Bordeaux, France",
  //     type: "CDI",
  //     remote: false,
  //     salary: "60k - 80k €",
  //     experience: "Expert (10+ ans)",
  //     status: "active",
  //     postedDate: "2024-10-18",
  //     deadline: "2024-11-25",
  //     applications: 23,
  //     views: 267,
  //     questions: 7,
  //     skills: ["Agile", "Scrum", "Leadership", "Management"],
  //     description:
  //       "Pilotez nos projets techniques stratégiques et managez une équipe talentueuse.",
  //   },
  // ];

  // Filtrer les annonces
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Statistiques
  const stats = {
    total: jobListings.length,
    active: jobListings.filter((j) => j.status === "active").length,
    closed: jobListings.filter((j) => j.status === "closed").length,
    paused: jobListings.filter((j) => j.status === "paused").length,
    totalApplications: jobListings.reduce((acc, j) => acc + j.applications, 0),
    totalViews: jobListings.reduce((acc, j) => acc + j.views, 0),
  };

  const handleMenuOpen = (event, job) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  const handleAction = (action) => {
    console.log(`Action: ${action} on job:`, selectedJob);
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return theme.palette.success.main;
      case "closed":
        return theme.palette.error.main;
      case "paused":
        return theme.palette.warning.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "closed":
        return "Fermée";
      case "paused":
        return "En pause";
      default:
        return status;
    }
  };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("fr-FR", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5 }}
          >
            Mes Annonces d'Emploi
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Gérez toutes vos offres d'emploi en un seul endroit
          </Typography>
        </Box>
      </Box>

      {/* Statistiques */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Paper
          sx={{
            p: 2.5,
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
            border: `1px solid ${theme.palette.primary.main}30`,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            {stats.total}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Total Annonces
          </Typography>
        </Paper>
        <Paper
          sx={{
            p: 2.5,
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.success.main}15, ${theme.palette.success.main}10)`,
            border: `1px solid ${theme.palette.success.main}30`,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: theme.palette.success.main }}
          >
            {stats.active}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Actives
          </Typography>
        </Paper>
        <Paper
          sx={{
            p: 2.5,
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.warning.main}15, ${theme.palette.warning.main}10)`,
            border: `1px solid ${theme.palette.warning.main}30`,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: theme.palette.warning.main }}
          >
            {stats.totalApplications}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Candidatures
          </Typography>
        </Paper>
        <Paper
          sx={{
            p: 2.5,
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.info.main}15, ${theme.palette.info.main}10)`,
            border: `1px solid ${theme.palette.info.main}30`,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: theme.palette.info.main }}
          >
            {stats.totalViews}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Vues Totales
          </Typography>
        </Paper>
      </Box>

      {/* Barre de recherche et filtres */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
            }}
          >
            <TextField
              placeholder="Rechercher par titre ou compétence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm("")}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ToggleButtonGroup
              value={filterStatus}
              exclusive
              onChange={(e, val) => val && setFilterStatus(val)}
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  border: `1px solid ${theme.palette.primary.main}30`,
                  color: theme.palette.text.primary,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                },
              }}
            >
              <ToggleButton value="all">Toutes ({stats.total})</ToggleButton>
              <ToggleButton value="active">
                Actives ({stats.active})
              </ToggleButton>
              <ToggleButton value="paused">
                En pause ({stats.paused})
              </ToggleButton>
              <ToggleButton value="closed">
                Fermées ({stats.closed})
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </CardContent>
      </Card>

      {/* Liste des annonces */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filteredJobs.map((job) => {
          const daysRemaining = getDaysRemaining(job.datelimite);

          return (
            <Card
              key={job.id}
              sx={{
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                  borderColor: theme.palette.primary.main,
                  borderWidth: 1,
                  borderStyle: "solid",
                },
                cursor: "pointer",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  {/* Avatar/Logo */}
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    {job.title.substring(0, 2).toUpperCase()}
                  </Avatar>

                  {/* Contenu principal */}
                  <Box sx={{ flex: 1 }}>
                    {/* Header */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                            }}
                          >
                            {job.title}
                          </Typography>
                          <Chip
                            label={getStatusLabel(job.status)}
                            size="small"
                            sx={{
                              backgroundColor: `${getStatusColor(
                                job.status
                              )}20`,
                              color: getStatusColor(job.status),
                              border: `1px solid ${getStatusColor(job.status)}`,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <LocationIcon />
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.text.secondary }}
                            >
                              {job.location}
                            </Typography>
                          </Box>
                          <Chip
                            label={job.type}
                            size="small"
                            variant="outlined"
                          />
                          {job.remote && (
                            <Chip
                              label="Remote"
                              size="small"
                              sx={{
                                backgroundColor: `${theme.palette.success.main}20`,
                                color: theme.palette.success.main,
                              }}
                            />
                          )}
                        </Box>
                      </Box>

                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, job)}
                        sx={{
                          color: theme.palette.text.secondary,
                          "&:hover": {
                            backgroundColor: `${theme.palette.primary.main}15`,
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {job.description}
                    </Typography>

                    {/* Compétences */}
                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                    >
                      {job.skills.slice(0, 4).map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: `${theme.palette.primary.main}20`,
                            color: theme.palette.primary.light,
                            border: `1px solid ${theme.palette.primary.main}30`,
                          }}
                        />
                      ))}
                      {job.skills.length > 4 && (
                        <Chip
                          label={`+${job.skills.length - 4}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>

                    <Divider
                      sx={{ my: 2, borderColor: theme.palette.divider }}
                    />

                    {/* Footer avec statistiques */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(4, 1fr)",
                        },
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mb: 0.5,
                          }}
                        >
                          <PeopleIcon />
                          <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            Candidatures
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {job.applications}
                        </Typography>
                      </Box>

                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mb: 0.5,
                          }}
                        >
                          <ViewIcon />
                          <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            Vues
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {job.views}
                        </Typography>
                      </Box>

                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mb: 0.5,
                          }}
                        >
                          <CalendarIcon />
                          <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            Date limite
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color:
                              daysRemaining < 7
                                ? theme.palette.error.main
                                : theme.palette.text.primary,
                          }}
                        >
                          {daysRemaining > 0
                            ? `${daysRemaining}j restants`
                            : "Expirée"}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            display: "block",
                            mb: 0.5,
                          }}
                        >
                          Salaire
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.success.main,
                          }}
                        >
                          {job.salary}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Barre de progression candidatures */}
                    {job.status === "active" && (
                      <Box sx={{ mt: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            Taux de candidature
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 600,
                            }}
                          >
                            {((job.applications / job.views) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(job.applications / job.views) * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: `${theme.palette.primary.main}20`,
                            "& .MuiLinearProgress-bar": {
                              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            },
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Message si aucun résultat */}
      {filteredJobs.length === 0 && (
        <Card>
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <SearchIcon />
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.secondary, mt: 2, mb: 1 }}
            >
              Aucune annonce trouvée
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.disabled }}
            >
              Essayez de modifier vos critères de recherche ou de filtre
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              sx={{
                mt: 3,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              }}
            >
              Réinitialiser les filtres
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Menu contextuel */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={() => handleAction("view")}>
          <ViewIcon />
          <Typography sx={{ ml: 2 }}>Voir les détails</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleAction("edit")}>
          <EditIcon />
          <Typography sx={{ ml: 2 }}>Modifier</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleAction("candidates")}>
          <PeopleIcon />
          <Typography sx={{ ml: 2 }}>Voir les candidats</Typography>
        </MenuItem>
        <Divider sx={{ my: 1, borderColor: theme.palette.divider }} />
        {selectedJob?.status === "active" && (
          <MenuItem onClick={() => handleAction("pause")}>
            <Typography sx={{ ml: 2, color: theme.palette.warning.main }}>
              Mettre en pause
            </Typography>
          </MenuItem>
        )}
        {selectedJob?.status === "paused" && (
          <MenuItem onClick={() => handleAction("activate")}>
            <Typography sx={{ ml: 2, color: theme.palette.success.main }}>
              Réactiver
            </Typography>
          </MenuItem>
        )}
        {selectedJob?.status === "active" && (
          <MenuItem onClick={() => handleAction("close")}>
            <Typography sx={{ ml: 2, color: theme.palette.error.main }}>
              Fermer l'annonce
            </Typography>
          </MenuItem>
        )}
        <Divider sx={{ my: 1, borderColor: theme.palette.divider }} />
        <MenuItem onClick={() => handleAction("delete")}>
          <DeleteIcon />
          <Typography sx={{ ml: 2, color: theme.palette.error.main }}>
            Supprimer
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ListingAnnouncement;
