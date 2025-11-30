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
  Tabs,
  Tab,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Tooltip,
  Rating,
  useTheme,
} from "@mui/material";

// Icônes SVG personnalisées
const EditIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

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

const WebsiteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
  </svg>
);

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
  </svg>
);

const ProfilEntreprise = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  // Données complètes de l'entreprise
  const companyData = {
    // Informations de base
    name: "Tech Innovation Solutions",
    tagline: "Transforming Ideas into Digital Reality",
    industry: "Technologie & Développement Web",
    type: "Société par Actions Simplifiée (SAS)",
    founded: "2015",
    logo: null,
    coverImage: null,

    // Statut
    status: "Actif",
    verified: true,
    certified: true,

    // Coordonnées
    email: "contact@techinnovation.com",
    phone: "+33 1 23 45 67 89",
    address: "123 Avenue des Champs-Élysées",
    city: "Paris",
    postalCode: "75008",
    country: "France",
    website: "www.techinnovation.com",

    // À propos
    description:
      "Tech Innovation Solutions est une entreprise leader dans le développement de solutions numériques innovantes. Nous accompagnons nos clients dans leur transformation digitale en proposant des services de développement web, mobile et cloud computing de haute qualité. Notre équipe d'experts passionnés crée des produits qui font la différence.",

    mission:
      "Notre mission est de rendre la technologie accessible à tous en créant des solutions intuitives, performantes et évolutives qui répondent aux défis de demain.",

    vision:
      "Devenir le partenaire de confiance incontournable pour toute entreprise souhaitant innover et se démarquer dans le monde digital.",

    values: [
      "Innovation continue",
      "Excellence technique",
      "Satisfaction client",
      "Travail d'équipe",
      "Responsabilité sociale",
    ],

    // Chiffres clés
    stats: {
      employees: "150+",
      clients: "500+",
      projects: "1200+",
      countries: "25",
    },

    // Finances (données publiques)
    financial: {
      revenue: "€15M",
      growth: "+45%",
      funding: "€5M",
      valuation: "€50M",
    },

    // Équipe dirigeante
    leadership: [
      {
        name: "Marie Dubois",
        position: "CEO & Co-fondatrice",
        description: "15 ans d'expérience dans la tech",
      },
      {
        name: "Jean Martin",
        position: "CTO & Co-fondateur",
        description: "Expert en architecture cloud",
      },
      {
        name: "Sophie Laurent",
        position: "CFO",
        description: "Ancienne directrice financière chez Google",
      },
      {
        name: "Thomas Bernard",
        position: "CMO",
        description: "Spécialiste marketing digital",
      },
    ],

    // Services
    services: [
      {
        name: "Développement Web",
        description:
          "Applications web sur mesure avec les dernières technologies",
        icon: "🌐",
      },
      {
        name: "Applications Mobile",
        description: "Apps iOS et Android natives et cross-platform",
        icon: "📱",
      },
      {
        name: "Cloud & DevOps",
        description: "Infrastructure cloud et automatisation",
        icon: "☁️",
      },
      {
        name: "Conseil IT",
        description: "Stratégie digitale et transformation",
        icon: "💡",
      },
      {
        name: "UI/UX Design",
        description: "Design d'expérience utilisateur moderne",
        icon: "🎨",
      },
      {
        name: "Data & IA",
        description: "Solutions d'intelligence artificielle",
        icon: "🤖",
      },
    ],

    // Technologies
    technologies: [
      { name: "React", level: 95 },
      { name: "Node.js", level: 92 },
      { name: "Python", level: 88 },
      { name: "AWS", level: 90 },
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 82 },
      { name: "MongoDB", level: 87 },
      { name: "PostgreSQL", level: 89 },
    ],

    // Clients prestigieux
    clients: [
      "Google",
      "Microsoft",
      "Amazon",
      "IBM",
      "Oracle",
      "Salesforce",
      "Adobe",
      "SAP",
      "Airbus",
      "L'Oréal",
      "Total",
      "Orange",
    ],

    // Récompenses
    awards: [
      {
        title: "Best Tech Startup 2024",
        organization: "French Tech",
        year: "2024",
        icon: "🏆",
      },
      {
        title: "Innovation Award",
        organization: "European Digital Awards",
        year: "2023",
        icon: "⭐",
      },
      {
        title: "Top 100 Employers",
        organization: "Great Place to Work",
        year: "2024",
        icon: "🎖️",
      },
      {
        title: "Sustainable Company",
        organization: "Green IT Award",
        year: "2023",
        icon: "🌱",
      },
    ],

    // Certifications
    certifications: [
      "ISO 9001:2015 - Qualité",
      "ISO 27001 - Sécurité",
      "AWS Partner Network",
      "Google Cloud Partner",
      "Microsoft Gold Partner",
    ],

    // Culture d\'entreprise
    culture: {
      benefits: [
        "Télétravail flexible",
        "Formation continue",
        "Mutuelle premium",
        "RTT supplémentaires",
        "Stock options",
        "Salle de sport",
      ],
      perks: [
        "Team buildings réguliers",
        "Budget formation 5000€/an",
        "Matériel dernière génération",
        "Tickets restaurant",
        "Horaires flexibles",
        "Congés illimités",
      ],
    },

    // Actualités récentes
    news: [
      {
        title: "Levée de fonds de 5M€",
        date: "Il y a 1 mois",
        category: "Financement",
      },
      {
        title: "Ouverture du bureau de Lyon",
        date: "Il y a 2 mois",
        category: "Expansion",
      },
      {
        title: "Partenariat avec AWS",
        date: "Il y a 3 mois",
        category: "Partenariat",
      },
      {
        title: "Prix de l'Innovation 2024",
        date: "Il y a 4 mois",
        category: "Récompense",
      },
    ],

    // Réseaux sociaux
    social: {
      linkedin: "linkedin.com/company/tech-innovation",
      twitter: "@tech_innovation",
      facebook: "facebook.com/techinnovation",
      instagram: "@techinnovation",
    },

    // Notes et avis
    ratings: {
      overall: 4.8,
      glassdoor: 4.7,
      trustpilot: 4.9,
      googleReviews: 4.8,
    },
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
      {/* Cover Image & Logo Section */}
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
            height: 250,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            position: "relative",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: `${theme.palette.background.paper}90`,
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <CardContent sx={{ pt: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            {/* Logo Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: -10,
              }}
            >
              <Avatar
                sx={{
                  width: 180,
                  height: 180,
                  border: `6px solid ${theme.palette.background.paper}`,
                  boxShadow: "0 12px 48px rgba(0, 0, 0, 0.5)",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  fontSize: "3.5rem",
                  fontWeight: 700,
                }}
              >
                TIS
              </Avatar>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {companyData.verified && (
                  <Chip
                    label="Vérifié"
                    size="small"
                    icon={<StarIcon />}
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}20`,
                      color: theme.palette.primary.light,
                      border: `1px solid ${theme.palette.primary.main}`,
                      fontWeight: 600,
                    }}
                  />
                )}
                {companyData.certified && (
                  <Chip
                    label="Certifié"
                    size="small"
                    icon={<AwardIcon />}
                    sx={{
                      backgroundColor: `${theme.palette.success.main}20`,
                      color: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.main}`,
                      fontWeight: 600,
                    }}
                  />
                )}
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
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: 0.5,
                    }}
                  >
                    {companyData.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      mb: 1,
                      fontStyle: "italic",
                    }}
                  >
                    "{companyData.tagline}"
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Fondée en {companyData.founded}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Rating
                      value={companyData.ratings.overall}
                      precision={0.1}
                      readOnly
                      size="large"
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, mt: 0.5 }}
                    >
                      {companyData.ratings.overall} / 5.0
                    </Typography>
                  </Box>
                  <Chip
                    label={companyData.status}
                    sx={{
                      backgroundColor: `${theme.palette.success.main}20`,
                      color: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.main}`,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      height: 36,
                    }}
                  />
                </Box>
              </Box>
              {/* Stats Cards */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {Object.entries(companyData.stats).map(([key, value]) => (
                  <Grid item xs={6} sm={3} key={key}>
                    <Paper
                      sx={{
                        p: 2.5,
                        textAlign: "center",
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                        border: `1px solid ${theme.palette.primary.main}30`,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-6px) scale(1.02)",
                          boxShadow: `0 12px 32px ${theme.palette.primary.main}30`,
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 700,
                          mb: 0.5,
                        }}
                      >
                        {value}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          textTransform: "capitalize",
                          fontWeight: 500,
                        }}
                      >
                        {key === "employees"
                          ? "Employés"
                          : key === "clients"
                          ? "Clients"
                          : key === "projects"
                          ? "Projets"
                          : "Pays"}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Financial Stats */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {Object.entries(companyData.financial).map(([key, value]) => (
                  <Grid item xs={6} sm={3} key={key}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1.5,
                        backgroundColor: `${theme.palette.background.paper}50`,
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: theme.palette.success.main,
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
                        {key === "revenue"
                          ? "Chiffre d'affaires"
                          : key === "growth"
                          ? "Croissance"
                          : key === "funding"
                          ? "Financement"
                          : "Valorisation"}
                      </Typography>
                    </Box>
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
          <Tab label="Services" />
          <Tab label="Équipe" />
          <Tab label="Clients & Partenaires" />
          <Tab label="Récompenses" />
        </Tabs>
      </Card>

      {/* Tab Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {activeTab === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    À propos de nous
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    {companyData.description}
                  </Typography>

                  <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Notre Mission
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    {companyData.mission}
                  </Typography>

                  <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Notre Vision
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                    }}
                  >
                    {companyData.vision}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Nos Valeurs
                  </Typography>
                  <Grid container spacing={2}>
                    {companyData.values.map((value, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          sx={{
                            p: 2.5,
                            backgroundColor: `${theme.palette.primary.main}10`,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.primary.main}30`,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                              transform: "translateX(8px)",
                              borderColor: theme.palette.primary.main,
                              backgroundColor: `${theme.palette.primary.main}15`,
                            },
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                            }}
                          >
                            ✓ {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Expertises Techniques
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    {companyData.technologies.map((tech) => (
                      <Box key={tech.name}>
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
                              fontWeight: 600,
                            }}
                          >
                            {tech.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 700,
                            }}
                          >
                            {tech.level}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={tech.level}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: `${theme.palette.primary.main}20`,
                            "& .MuiLinearProgress-bar": {
                              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              borderRadius: 5,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}

          {activeTab === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Nos Services
                  </Typography>
                  <Grid container spacing={3}>
                    {companyData.services.map((service, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          sx={{
                            p: 3,
                            height: "100%",
                            backgroundColor: `${theme.palette.primary.main}05`,
                            border: `1px solid ${theme.palette.divider}`,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              borderColor: theme.palette.primary.main,
                              boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                            },
                          }}
                        >
                          <Typography variant="h2" sx={{ mb: 2 }}>
                            {service.icon}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            {service.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              lineHeight: 1.6,
                            }}
                          >
                            {service.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}

          {activeTab === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Équipe Dirigeante
                  </Typography>
                  <Grid container spacing={3}>
                    {companyData.leadership.map((member, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          sx={{
                            p: 3,
                            textAlign: "center",
                            backgroundColor: `${theme.palette.background.paper}`,
                            border: `1px solid ${theme.palette.divider}`,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                              borderColor: theme.palette.primary.main,
                            },
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 100,
                              height: 100,
                              mx: "auto",
                              mb: 2,
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              fontSize: "2rem",
                              fontWeight: 700,
                            }}
                          >
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                              mb: 0.5,
                            }}
                          >
                            {member.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 500,
                              mb: 1,
                            }}
                          >
                            {member.position}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: "0.85rem",
                            }}
                          >
                            {member.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Culture & Avantages
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Avantages
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {companyData.culture.benefits.map((benefit, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: theme.palette.primary.main,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            {benefit}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Avantages supplémentaires
                  </Typography>
                  <Grid container spacing={2}>
                    {companyData.culture.perks.map((perk, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: theme.palette.secondary.main,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            {perk}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}

          {activeTab === 3 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Clients Prestigieux
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {companyData.clients.map((client, index) => (
                      <Chip
                        key={index}
                        label={client}
                        sx={{
                          backgroundColor: `${theme.palette.primary.main}15`,
                          color: theme.palette.text.primary,
                          border: `1px solid ${theme.palette.primary.main}30`,
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          padding: "8px 4px",
                          "&:hover": {
                            backgroundColor: `${theme.palette.primary.main}25`,
                            borderColor: theme.palette.primary.main,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}

          {activeTab === 4 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Récompenses & Distinctions
                  </Typography>
                  <Grid container spacing={3}>
                    {companyData.awards.map((award, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          sx={{
                            p: 3,
                            textAlign: "center",
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
                            border: `1px solid ${theme.palette.primary.main}30`,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05) rotate(2deg)",
                              boxShadow: `0 12px 40px ${theme.palette.primary.main}30`,
                            },
                          }}
                        >
                          <Typography variant="h1" sx={{ mb: 2 }}>
                            {award.icon}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            {award.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              mb: 0.5,
                            }}
                          >
                            {award.organization}
                          </Typography>
                          <Chip
                            label={award.year}
                            size="small"
                            sx={{
                              backgroundColor: `${theme.palette.primary.main}30`,
                              color: theme.palette.primary.light,
                              fontWeight: 600,
                            }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Certifications
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {companyData.certifications.map((cert, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2.5,
                          backgroundColor: `${theme.palette.success.main}10`,
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.success.main}30`,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            backgroundColor: `${theme.palette.success.main}15`,
                            borderColor: theme.palette.success.main,
                            transform: "translateX(8px)",
                          },
                        }}
                      >
                        <AwardIcon />
                        <Typography
                          variant="body1"
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
            </Box>
          )}
        </Grid>

        {/* Right Column - Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Contact Card */}
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
                Coordonnées
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={companyData.email}
                    primaryTypographyProps={{
                      color: theme.palette.text.primary,
                      fontSize: "0.9rem",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={companyData.phone}
                    primaryTypographyProps={{
                      color: theme.palette.text.primary,
                      fontSize: "0.9rem",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${companyData.address}, ${companyData.postalCode} ${companyData.city}, ${companyData.country}`}
                    primaryTypographyProps={{
                      color: theme.palette.text.primary,
                      fontSize: "0.9rem",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <WebsiteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={companyData.website}
                    primaryTypographyProps={{
                      color: theme.palette.primary.main,
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Réseaux sociaux
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                <Tooltip title="LinkedIn">
                  <IconButton
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
                <Tooltip title="Twitter">
                  <IconButton
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}30`,
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Facebook">
                  <IconButton
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}30`,
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Instagram">
                  <IconButton
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}30`,
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>

          {/* News Card */}
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
                Actualités récentes
              </Typography>
              <List sx={{ p: 0 }}>
                {companyData.news.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom:
                        index < companyData.news.length - 1
                          ? `1px solid ${theme.palette.divider}`
                          : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}05`,
                        paddingLeft: 1,
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            flex: 1,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Chip
                          label={item.category}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.7rem",
                            backgroundColor: `${theme.palette.primary.main}20`,
                            color: theme.palette.primary.light,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {item.date}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Ratings Card */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Notes & Avis
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: `${theme.palette.primary.main}10`,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary, mb: 1 }}
                  >
                    Google Reviews
                  </Typography>
                  <Rating
                    value={companyData.ratings.googleReviews}
                    precision={0.1}
                    readOnly
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {companyData.ratings.googleReviews}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilEntreprise;
