import React, { useState } from "react";
import {
  Button,
  IconButton,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Box,
  useTheme,
  Tooltip,
  Badge,
} from "@mui/material";

// Icônes SVG personnalisées
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const AddIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const ModernButton = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  children,
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick = () => {},
  ...props
}) => {
  const theme = useTheme();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick(event);
  };

  // Styles de base selon la variante
  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: "12px",
      textTransform: "none",
      fontWeight: 600,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
      transform: isClicked ? "scale(0.95)" : "scale(1)",
    };

    switch (variant) {
      case "gradient":
        return {
          ...baseStyles,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.primary.contrastText,
          border: "none",
          boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
          "&:hover": {
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            boxShadow: `0 6px 24px ${theme.palette.primary.main}50`,
            transform: "translateY(-2px)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transition: "left 0.5s",
          },
          "&:hover::before": {
            left: "100%",
          },
        };

      case "glassmorphism":
        return {
          ...baseStyles,
          background: `rgba(126, 87, 194, 0.1)`,
          backdropFilter: "blur(20px)",
          border: `1px solid ${theme.palette.primary.main}30`,
          color: theme.palette.primary.main,
          "&:hover": {
            background: `rgba(126, 87, 194, 0.2)`,
            borderColor: theme.palette.primary.light,
            boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
            transform: "translateY(-2px)",
          },
        };

      case "neon":
        return {
          ...baseStyles,
          background: "transparent",
          color: theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: `0 0 20px ${theme.palette.primary.main}30, inset 0 0 20px ${theme.palette.primary.main}10`,
          "&:hover": {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: `0 0 30px ${theme.palette.primary.main}60, inset 0 0 30px ${theme.palette.primary.main}20`,
            textShadow: `0 0 10px ${theme.palette.primary.contrastText}`,
          },
        };

      case "floating":
        return {
          ...baseStyles,
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
            borderColor: theme.palette.primary.main,
          },
        };

      case "pulse":
        return {
          ...baseStyles,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.primary.contrastText,
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%": {
              boxShadow: `0 0 0 0 ${theme.palette.primary.main}70`,
            },
            "70%": {
              boxShadow: `0 0 0 10px ${theme.palette.primary.main}00`,
            },
            "100%": {
              boxShadow: `0 0 0 0 ${theme.palette.primary.main}00`,
            },
          },
        };

      default:
        return baseStyles;
    }
  };

  return (
    <Button
      variant={
        variant === "gradient" ||
        variant === "glassmorphism" ||
        variant === "neon" ||
        variant === "floating" ||
        variant === "pulse"
          ? "contained"
          : variant
      }
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={loading ? <div className="spinner" /> : startIcon}
      endIcon={endIcon}
      onClick={handleClick}
      sx={getButtonStyles()}
      {...props}
    >
      {children}
    </Button>
  );
};

// Composant d'exemples
const ButtonShowcase = () => {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        maxWidth: 800,
        mx: "auto",
        p: 3,
      }}
    >
      {/* Boutons principales variantes */}
      <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Boutons principaux
        </h3>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <ModernButton variant="gradient" startIcon={<PlayIcon />}>
            Démarrer
          </ModernButton>

          <ModernButton
            variant="glassmorphism"
            startIcon={<DownloadIcon />}
            loading={loading}
            onClick={handleDownload}
          >
            {loading ? "Téléchargement..." : "Télécharger"}
          </ModernButton>

          <ModernButton variant="neon" startIcon={<StarIcon />}>
            Premium
          </ModernButton>

          <ModernButton variant="floating" startIcon={<ShareIcon />}>
            Partager
          </ModernButton>

          <ModernButton variant="pulse" startIcon={<SendIcon />}>
            Envoyer
          </ModernButton>
        </Box>
      </Box>

      {/* Boutons avec états */}
      <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Boutons interactifs
        </h3>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <ModernButton
            variant="glassmorphism"
            startIcon={<HeartIcon filled={liked} />}
            onClick={() => setLiked(!liked)}
            sx={{
              color: liked
                ? theme.palette.error.main
                : theme.palette.primary.main,
              borderColor: liked
                ? theme.palette.error.main
                : theme.palette.primary.main,
            }}
          >
            {liked ? "Aimé" : "Aimer"}
          </ModernButton>

          <Badge badgeContent={4} color="error">
            <ModernButton variant="floating">Notifications</ModernButton>
          </Badge>

          <ModernButton variant="gradient" disabled>
            Désactivé
          </ModernButton>
        </Box>
      </Box>

      {/* Groupes de boutons */}
      <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Groupes de boutons
        </h3>

        <Box sx={{ mb: 3 }}>
          <ButtonGroup
            variant="outlined"
            sx={{
              "& .MuiButton-root": {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: `${theme.palette.primary.main}10`,
                  borderColor: theme.palette.primary.light,
                },
              },
            }}
          >
            <Button>Précédent</Button>
            <Button>Actuel</Button>
            <Button>Suivant</Button>
          </ButtonGroup>
        </Box>

        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          sx={{
            "& .MuiToggleButton-root": {
              border: `1px solid ${theme.palette.primary.main}30`,
              color: theme.palette.text.primary,
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}10`,
              },
            },
          }}
        >
          <ToggleButton value="left">Gauche</ToggleButton>
          <ToggleButton value="center">Centre</ToggleButton>
          <ToggleButton value="right">Droite</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Boutons flottants */}
      <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Boutons flottants
        </h3>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Tooltip title="Ajouter un élément">
            <Fab
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="Valider">
            <IconButton
              sx={{
                background: `${theme.palette.success.main}20`,
                color: theme.palette.success.main,
                border: `2px solid ${theme.palette.success.main}`,
                "&:hover": {
                  background: theme.palette.success.main,
                  color: theme.palette.success.contrastText,
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Tailles */}
      <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Différentes tailles
        </h3>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <ModernButton variant="gradient" size="small">
            Petit
          </ModernButton>
          <ModernButton variant="gradient" size="medium">
            Moyen
          </ModernButton>
          <ModernButton variant="gradient" size="large">
            Grand
          </ModernButton>
        </Box>
      </Box>

      {/* Bouton pleine largeur */}
      <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Pleine largeur
        </h3>
        <ModernButton variant="gradient" fullWidth startIcon={<SendIcon />}>
          Bouton pleine largeur
        </ModernButton>
      </Box>
    </Box>
  );
};

export default ButtonShowcase;
export { ModernButton };
