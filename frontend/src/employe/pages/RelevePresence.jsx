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

function RelevePresence() {
  const [dateReleve, setDateReleve] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  
  const goTableaudebord = () => navigate("/tableaudebordEmploye");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Relevé demandé pour la date :", dateReleve);

    // Simulation du téléchargement PDF
    const fakePDF =
      "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MK..."; // fichier fictif
    const link = document.createElement("a");
    link.href = fakePDF;
    link.download = `releve_presence_${dateReleve}.pdf`;
    link.click();

    alert("Relevé PDF généré (simulation front)");
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
