import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Fade,
  useTheme,
} from "@mui/material";
import { Person, Email, Phone, UploadFile, Save, Clear, Work } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const FormCandidat = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Récupération des infos de l’annonce passée en navigation
  const annonce = location.state?.annonce || null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cv: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field) => (event) => {
    if (field === "cv") {
      setFormData((prev) => ({ ...prev, cv: event.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Candidat :", formData);
    console.log("Annonce postulée :", annonce);

    // Simulation d'envoi vers backend
    setShowSuccess(true);

    // Après succès : redirection vers page "Mes candidatures"
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/Voir-Mes-Candidatures", {
        state: { message: "Votre candidature a été enregistrée." },
      });
    }, 3000);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cv: null,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        <Fade in={true} timeout={600}>
          <Card
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              backdropFilter: "blur(15px)",
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: 4,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Titre principal */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  Déposer votre candidature
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Remplissez ce formulaire pour postuler à cette offre.
                </Typography>
              </Box>

              {/* Détails de l’annonce */}
              {annonce && (
                <Card
                  sx={{
                    mb: 3,
                    backgroundColor: `${theme.palette.action.hover}`,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Work /> {annonce.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {annonce.company} — {annonce.date}
                  </Typography>
                </Card>
              )}

              {/* Message de succès */}
              {showSuccess && (
                <Fade in={showSuccess}>
                  <Alert
                    severity="success"
                    sx={{
                      mb: 3,
                      backgroundColor: `${theme.palette.success.main}15`,
                      color: theme.palette.success.main,
                      border: `1px solid ${theme.palette.success.main}30`,
                    }}
                  >
                    Candidature envoyée avec succès !
                  </Alert>
                </Fade>
              )}

              {/* Formulaire */}
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Nom et prénom */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Prénom"
                      value={formData.firstName}
                      onChange={handleInputChange("firstName")}
                      required
                      InputProps={{
                        startAdornment: <Person sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
                      }}
                    />
                    <TextField
                      label="Nom"
                      value={formData.lastName}
                      onChange={handleInputChange("lastName")}
                      required
                    />
                  </Box>

                  {/* Email */}
                  <TextField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    required
                    InputProps={{
                      startAdornment: <Email sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
                    }}
                  />

                  {/* Téléphone */}
                  <TextField
                    label="Téléphone"
                    value={formData.phone}
                    onChange={handleInputChange("phone")}
                    InputProps={{
                      startAdornment: <Phone sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
                    }}
                  />

                  {/* CV */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Joindre votre CV (.pdf)
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadFile />}
                    >
                      Sélectionner un fichier
                      <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={handleInputChange("cv")}
                      />
                    </Button>
                    {formData.cv && (
                      <Typography variant="caption" color="text.secondary">
                        Fichier sélectionné : {formData.cv.name}
                      </Typography>
                    )}
                  </Box>

                  {/* Boutons */}
                  <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      startIcon={<Clear />}
                      onClick={handleReset}
                    >
                      Réinitialiser
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Save />}
                    >
                      Envoyer
                    </Button>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </Box>
  );
};

export default FormCandidat;
