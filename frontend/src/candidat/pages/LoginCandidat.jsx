import React, { useState } from "react";
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
  Link,
} from "@mui/material";
import { Lock, Person, Email, Phone, Save, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LoginCandidat = ({ onLogin }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      onLogin();
      console.log("Connexion candidat:", {
        email: formData.email,
        password: formData.password,
      });
      navigate("/tableaudebord");
    } else {
      console.log("Inscription candidat:", formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
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
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 800, px: 2 }}>
        <Fade in={true} timeout={600}>
          <Card
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              backdropFilter: "blur(20px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
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
                  {isLogin ? "Connexion Candidat" : "Créer un Compte Candidat"}
                </Typography>

                <Typography variant="body2" sx={{ mt: 2 }}>
                  {isLogin ? "Vous n'avez pas de compte ? " : "Vous avez déjà un compte ? "}
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {isLogin ? "Créer un compte" : "Se connecter"}
                  </Link>
                </Typography>
              </Box>

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
                    {isLogin
                      ? "Connexion réussie !"
                      : "Compte candidat créé avec succès !"}
                  </Alert>
                </Fade>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    required
                    InputProps={{
                      startAdornment: (
                        <Email sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                      ),
                    }}
                  />
                  <TextField
                    label="Mot de passe"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    required
                    InputProps={{
                      startAdornment: (
                        <Lock sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                      ),
                    }}
                  />

                  {!isLogin && (
                    <>
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
                            startAdornment: (
                              <Person sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                            ),
                          }}
                        />
                        <TextField
                          label="Nom"
                          value={formData.lastName}
                          onChange={handleInputChange("lastName")}
                          required
                        />
                      </Box>

                      <TextField
                        label="Téléphone"
                        value={formData.phone}
                        onChange={handleInputChange("phone")}
                        InputProps={{
                          startAdornment: (
                            <Phone sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                          ),
                        }}
                      />

                      <TextField
                        label="Confirmer le mot de passe"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange("confirmPassword")}
                        required
                      />
                    </>
                  )}

                  <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
                    {!isLogin && (
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={handleReset}
                        startIcon={<Clear />}
                      >
                        Réinitialiser
                      </Button>
                    )}
                    <Button type="submit" variant="contained" startIcon={<Save />}>
                      {isLogin ? "Se connecter" : "S'inscrire"}
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

export default LoginCandidat;
