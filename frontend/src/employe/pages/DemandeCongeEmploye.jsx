import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, MenuItem, Alert } from "@mui/material";

const types = [
  { value: 1, label: "Congé payé" },
  { value: 2, label: "Congé sans solde" },
  { value: 3, label: "Maladie" },
  { value: 4, label: "Autre" },
];

export default function DemandeCongeEmploye() {
  const [typeConge, setTypeConge] = useState(1);
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [motif, setMotif] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submit = async () => {
    setError(null);
    setSuccess(null);
    if (!debut || !fin || !motif) {
      setError("Veuillez remplir toutes les informations.");
      return;
    }
    setLoading(true);
    try {
      const api = (await import("../api/api")).default;
      const params = new URLSearchParams();
      params.append('statut', 'EN_ATTENTE');
      params.append('typeConge', typeConge);
      params.append('debut', debut);
      params.append('fin', fin);
      params.append('motif', motif);

      const res = await api.post(`/demandes-conge/create?${params.toString()}`);
      setSuccess('Demande envoyée avec succès.');
      setTypeConge(1); setDebut(''); setFin(''); setMotif('');
    } catch (e) {
      console.error(e);
      setError('Erreur lors de l\'envoi de la demande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>Nouvelle demande de congé</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            select
            label="Type de congé"
            value={typeConge}
            onChange={(e) => setTypeConge(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          >
            {types.map(t => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
          </TextField>

          <TextField
            label="Date de début"
            type="date"
            value={debut}
            onChange={(e) => setDebut(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2, mr: 2 }}
          />

          <TextField
            label="Date de fin"
            type="date"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            fullWidth
            multiline
            minRows={3}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={submit} disabled={loading}>
            {loading ? 'Envoi...' : 'Envoyer la demande'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
