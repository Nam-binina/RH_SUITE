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
import api from "../api/api";

function RelevePresence() {
  const [dateReleve, setDateReleve] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  
  const goTableaudebord = () => navigate("/tableaudebordEmploye");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const date = new Date(dateReleve);
      const mois = date.getMonth() + 1;
      const annee = date.getFullYear();
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const id = user?.id || 1;

      api.get(`/releves-presence/employe/${id}/pdf-download`, { params: { mois, annee }, responseType: 'blob' })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `releve_${mois}_${annee}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .catch(err => {
          console.error('Erreur génération relevé', err);
          alert('Impossible de générer le relevé depuis le serveur.');
        });
    } catch (err) {
      console.error(err);
      alert('Date invalide');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Relevé de présence
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="date"
              label="Date du relevé"
              InputLabelProps={{ shrink: true }}
              value={dateReleve}
              onChange={(e) => setDateReleve(e.target.value)}
              sx={{ mb: 3 }}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Télécharger le relevé (PDF)
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

export default RelevePresence;
