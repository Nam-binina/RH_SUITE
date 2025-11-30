import React, { useState } from "react";
import { Button, Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const BoutonChoix = ({
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
      {/* Bouton pleine largeur */}
      <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Si tu es candidat :
        </h3>
        <Link to="/loginCandidat">
          <BoutonChoix variant="gradient" fullWidth startIcon={<SendIcon />}>
            Candidat
          </BoutonChoix>
        </Link>
      </Box>

       <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Si tu es employe :
        </h3>
        <Link to="/loginEmploye">
          <BoutonChoix variant="gradient" fullWidth startIcon={<SendIcon />}>
            employe
          </BoutonChoix>
        </Link>
      </Box>


      <Box>
        <h3 style={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
          Si tu es une entreprise :
        </h3>
        <Link to="/loginEntreprise">
          <BoutonChoix variant="gradient" fullWidth startIcon={<SendIcon />}>
            Entreprise
          </BoutonChoix>
        </Link>
      </Box>
    </Box>
  );
};

export default ButtonShowcase;
export { BoutonChoix };
