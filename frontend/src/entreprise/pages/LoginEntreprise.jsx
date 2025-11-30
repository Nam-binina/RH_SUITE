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
import {
  Home,
  Lock,
  Person,
  Email,
  Phone,
  Save,
  Clear,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LoginEntreprise = ({ onLogin }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    adresse: "",
    phone: "",
    password: "",
    confirmPassword: "", // Ajouté pour la confirmation
    company: "",
    position: "",
    category: "",
    experience: 3,
    skills: [],
    bio: "",
    newsletter: false,
    notifications: true,
    avatar: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Sign Up
  const navigate = useNavigate();
  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      // Mode Login
      onLogin();
      console.log("Connexion avec:", {
        email: formData.email,
        password: formData.password,
      });
      navigate("/profilEntreprise");
    } else {
      // Mode Sign Up
      console.log("Inscription avec:", formData);
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      adresse: "",
      phone: "",
      password: "",
      confirmPassword: "",
      company: "",
      position: "",
      category: "",
      experience: 3,
      skills: [],
      bio: "",
      newsletter: false,
      notifications: true,
      avatar: null,
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
        mx: "auto",
        my: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          px: 2,
        }}
      >
        <Fade in={true} timeout={600}>
          <Card
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              backdropFilter: "blur(20px)",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Header avec lien Sign Up/Login */}
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
                  {isLogin
                    ? "Connexion Entreprise"
                    : "Créer un Profil Entreprise"}
                </Typography>

                {/* Lien pour basculer entre Login et Sign Up */}
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {isLogin
                    ? "Vous n'avez pas de compte ? "
                    : "Vous avez déjà un compte ? "}
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {isLogin ? "Créer un compte" : "Se connecter"}
                  </Link>
                </Typography>
              </Box>

              {/* Alert de succès */}
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
                      : "Profil créé avec succès !"}
                  </Alert>
                </Fade>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Champs communs (toujours visibles) */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      required
                      InputProps={{
                        startAdornment: (
                          <Email
                            sx={{ color: theme.palette.text.secondary, mr: 1 }}
                          />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                        },
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
                          <Lock
                            sx={{ color: theme.palette.text.secondary, mr: 1 }}
                          />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Champs supplémentaires seulement pour Sign Up */}
                  {!isLogin && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ color: theme.palette.text.primary, mb: 1 }}
                      >
                        Informations de l'entreprise
                      </Typography>

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
                              <Person
                                sx={{
                                  color: theme.palette.text.secondary,
                                  mr: 1,
                                }}
                              />
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

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                          gap: 2,
                        }}
                      >
                        <TextField
                          label="Téléphone"
                          value={formData.phone}
                          onChange={handleInputChange("phone")}
                          InputProps={{
                            startAdornment: (
                              <Phone
                                sx={{
                                  color: theme.palette.text.secondary,
                                  mr: 1,
                                }}
                              />
                            ),
                          }}
                        />
                        <TextField
                          label="Adresse"
                          value={formData.adresse}
                          onChange={handleInputChange("adresse")}
                          InputProps={{
                            startAdornment: (
                              <Home
                                sx={{
                                  color: theme.palette.text.secondary,
                                  mr: 1,
                                }}
                              />
                            ),
                          }}
                        />
                      </Box>

                      {/* Confirmation mot de passe seulement pour Sign Up */}
                      <TextField
                        label="Confirmer le mot de passe"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange("confirmPassword")}
                        required={!isLogin}
                        InputProps={{
                          startAdornment: (
                            <Lock
                              sx={{
                                color: theme.palette.text.secondary,
                                mr: 1,
                              }}
                            />
                          ),
                        }}
                      />
                    </>
                  )}

                  {/* Boutons d'action */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      mt: 3,
                    }}
                  >
                    {!isLogin && (
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={handleReset}
                        startIcon={<Clear />}
                        sx={{
                          borderColor: theme.palette.text.secondary,
                          color: theme.palette.text.secondary,
                          minWidth: 140,
                          "&:hover": {
                            backgroundColor: `${theme.palette.text.secondary}10`,
                            borderColor: theme.palette.text.primary,
                            color: theme.palette.text.primary,
                          },
                        }}
                      >
                        Réinitialiser
                      </Button>
                    )}
                    <Link to="/profilEntreprise">
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Save />}
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          minWidth: 140,
                          boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                          "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                            boxShadow: `0 6px 24px ${theme.palette.primary.main}50`,
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        {isLogin ? "Se connecter" : "S'inscrire"}
                      </Button>
                    </Link>
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

export default LoginEntreprise;
