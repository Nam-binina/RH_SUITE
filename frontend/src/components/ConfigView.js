import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment
} from '@mui/material';

const ConfigView = () => {
  const [configData, setConfigData] = useState({
    type: 'cnaps',
    taux: ''
  });

  const handleConfigSubmit = () => {
    alert(`Taux ${configData.type.toUpperCase()} modifié à ${configData.taux}%`);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Configuration des Taux</Typography>
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type de Cotisation</InputLabel>
                <Select 
                  value={configData.type} 
                  onChange={(e) => setConfigData({...configData, type: e.target.value})}
                >
                  <MenuItem value="cnaps">CNAPS</MenuItem>
                  <MenuItem value="ostie">OSTIE</MenuItem>
                  <MenuItem value="irsa">IRSA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Taux (%)"
                type="number"
                value={configData.taux}
                onChange={(e) => setConfigData({...configData, taux: e.target.value})}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                onClick={handleConfigSubmit}
              >
                Enregistrer les modifications
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConfigView;