import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

const moisListe = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function FiltreMoisAnnee({ onFilterChange }) {
  const currentYear = new Date().getFullYear();

  const [mois, setMois] = useState("Janvier");
  const [annee, setAnnee] = useState(currentYear);

  const handleSubmit = () => {
    onFilterChange({ mois, annee });
  };

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, width: "fit-content" }}
    >
      {/* Sélection mois */}
      <FormControl size="small">
        <InputLabel>Mois</InputLabel>
        <Select
          value={mois}
          label="Mois"
          onChange={(e) => setMois(e.target.value)}
          sx={{ width: 150 }}
        >
          {moisListe.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sélection année */}
      <FormControl size="small">
        <InputLabel>Année</InputLabel>
        <Select
          value={annee}
          label="Année"
          onChange={(e) => setAnnee(e.target.value)}
          sx={{ width: 120 }}
        >
          {Array.from({ length: 10 }, (_, i) => currentYear - i).map((an) => (
            <MenuItem key={an} value={an}>
              {an}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Bouton valider */}
      <Button variant="contained" onClick={handleSubmit}>
        Filtrer
      </Button>
    </Box>
  );
}

export default FiltreMoisAnnee;
