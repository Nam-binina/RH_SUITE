import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Pointage() {
  // STATES
  const [datePointage, setDatePointage] = useState("");
  const [entree, setEntree] = useState("");
  const [sortie, setSortie] = useState("");
  const [pauseDebut, setPauseDebut] = useState("");
  const [pauseFin, setPauseFin] = useState("");
  const goTableaudebord = () => navigate("/tableaudebordEmploye");
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      datePointage,
      entree,
      sortie,
      pauseDebut,
      pauseFin,
    };

    console.log("Pointage soumis :", data);
    alert("Pointage envoyé (front uniquement)");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Pointage de présence
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="date"
              label="Date du pointage"
              InputLabelProps={{ shrink: true }}
              value={datePointage}
              onChange={(e) => setDatePointage(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              type="time"
              label="Heure d'entrée"
              InputLabelProps={{ shrink: true }}
              value={entree}
              onChange={(e) => setEntree(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              type="time"
              label="Heure de sortie"
              InputLabelProps={{ shrink: true }}
              value={sortie}
              onChange={(e) => setSortie(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              type="time"
              label="Début de pause"
              InputLabelProps={{ shrink: true }}
              value={pauseDebut}
              onChange={(e) => setPauseDebut(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              type="time"
              label="Fin de pause"
              InputLabelProps={{ shrink: true }}
              value={pauseFin}
              onChange={(e) => setPauseFin(e.target.value)}
              sx={{ mb: 3 }}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Enregistrer le pointage
            </Button>
          </form>
       <Button
                   onClick={goTableaudebord}
                   variant="contained"
                   fullWidth
                   sx={{
                     mt: 4,
                     py: 1.5,
                     borderRadius: "12px",
                     textTransform: "none",
                     fontSize: "16px"
                   }}
                 >
                                              Tableau de bord
       
                 </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Pointage;
