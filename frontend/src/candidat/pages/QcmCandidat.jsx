import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Fade,
  Alert,
} from "@mui/material";

import {
  Person as PersonIcon,
  Work as WorkIcon,
  Favorite as FavoriteIcon,
  CalendarToday as CalendarTodayIcon,
  Info as InfoIcon,
  Logout as LogoutIcon,
  Quiz as QuizIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

const QcmCandidat = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const annonce = location.state?.annonce;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Navigation fonctions menu
  const handleGoToProfil = () => navigate("/ProfilCandidat");
  const handleMesCandidatures = () => navigate("/Voir-Mes-Candidatures");
  const handleLogOut = () => navigate("/Log-out");

  // Chargement des questions selon le poste
  useEffect(() => {
    if (annonce?.title === "Développeur React") {
      setQuestions([
        { id: 1, question: "Que fait useState en React ?", options: ["Crée un composant", "Gère l'état local", "Fait une requête API"], answer: 1 },
        { id: 2, question: "Quel hook s'exécute après le rendu ?", options: ["useState", "useEffect", "useMemo"], answer: 1 },
        { id: 3, question: "Quel est le rôle de JSX ?", options: ["Transformer le DOM", "Mélanger HTML et JS", "Créer des fichiers CSS dynamiques"], answer: 1 },
      ]);
    } else if (annonce?.title === "Backend Node.js") {
      setQuestions([
        { id: 1, question: "Quel framework est basé sur Node.js ?", options: ["Express", "Django", "Spring"], answer: 0 },
        { id: 2, question: "Quel format utilise JSON ?", options: ["Texte", "Binaire", "XML"], answer: 0 },
        { id: 3, question: "Quel module gère les routes dans Express ?", options: ["router", "path", "serve"], answer: 0 },
      ]);
    }
  }, [annonce]);

  // Gestion des réponses
  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: parseInt(value, 10) });
  };

  // Soumission et calcul du score
  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });
    const result = (correct / questions.length) * 100;
    setScore(result);

    setTimeout(() => {
      navigate("/Voir-Mes-Candidatures", {
        state: {
          message: `Candidature et QCM soumis avec succès ! Score obtenu : ${result.toFixed(0)}%.`,
        },
      });
    }, 4000);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      {/* --- MENU LATÉRAL --- */}
      <Box
        sx={{
          width: 260,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "#fff",
          p: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
            Tableau de bord
          </Typography>

          <List>
            <ListItem button onClick={handleGoToProfil}>
              <ListItemIcon>
                <PersonIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Mes infos" />
            </ListItem>

            <ListItem button onClick={handleMesCandidatures}>
              <ListItemIcon>
                <WorkIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Mes candidatures" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <FavoriteIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Favoris" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <CalendarTodayIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Agenda" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <InfoIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Infos utiles" />
            </ListItem>

            <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.3)" }} />

          

          </List>
        </Box>
      </Box>

      {/* --- CONTENU QCM --- */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Fade in timeout={600}>
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
              <QuizIcon color="primary" /> QCM pour le poste : {annonce?.title}
            </Typography>

            {questions.map((q) => (
              <Card
                key={q.id}
                sx={{
                  mb: 3,
                  backgroundColor: `${theme.palette.background.paper}`,
                  borderLeft: `5px solid ${theme.palette.primary.main}`,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {q.id}. {q.question}
                  </Typography>
                  <RadioGroup onChange={(e) => handleChange(q.id, e.target.value)}>
                    {q.options.map((opt, index) => (
                      <FormControlLabel
                        key={index}
                        value={index.toString()}
                        control={<Radio />}
                        label={opt}
                      />
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ px: 4, py: 1.2 }}>
                Soumettre mes réponses
              </Button>
            </Box>

            {score !== null && (
              <Fade in timeout={800}>
                <Alert
                  icon={<CheckCircleIcon fontSize="inherit" />}
                  severity={score >= 70 ? "success" : "warning"}
                  sx={{
                    mt: 4,
                    backgroundColor: `${score >= 70 ? theme.palette.success.light : theme.palette.warning.light}30`,
                    border: `1px solid ${score >= 70 ? theme.palette.success.main : theme.palette.warning.main}`,
                  }}
                >
                  Vous avez obtenu un score de <b>{score.toFixed(0)}%</b>.{" "}
                  {score >= 70
                    ? "Félicitations, vous êtes admissible à l’entretien !"
                    : "Vous devrez réviser avant une nouvelle tentative."}
                </Alert>
              </Fade>
            )}
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default QcmCandidat;
