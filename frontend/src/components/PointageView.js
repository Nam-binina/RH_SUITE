import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const PointageView = () => {
  const [pointageData, setPointageData] = useState({
    date: '',
    heureEntree: '',
    heureSortie: '',
    debutPause: '',
    finPause: ''
  });

  const handlePointageSubmit = () => {
    alert('Pointage enregistré avec succès !');
    setPointageData({ date: '', heureEntree: '', heureSortie: '', debutPause: '', finPause: '' });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Pointage de Présence</Typography>
      <Card sx={{ maxWidth: 700, mx: 'auto' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date du Pointage"
                value={pointageData.date}
                onChange={(e) => setPointageData({...pointageData, date: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Heure d'Entrée"
                value={pointageData.heureEntree}
                onChange={(e) => setPointageData({...pointageData, heureEntree: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Heure de Sortie"
                value={pointageData.heureSortie}
                onChange={(e) => setPointageData({...pointageData, heureSortie: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Début Pause"
                value={pointageData.debutPause}
                onChange={(e) => setPointageData({...pointageData, debutPause: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Fin Pause"
                value={pointageData.finPause}
                onChange={(e) => setPointageData({...pointageData, finPause: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                startIcon={<CheckCircle />}
                onClick={handlePointageSubmit}
              >
                Enregistrer le Pointage
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PointageView;