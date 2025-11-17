import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button
} from '@mui/material';
import { Download } from '@mui/icons-material';

const ReleveView = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Relevé de Présence</Typography>
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date du Relevé"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                startIcon={<Download />}
              >
                Télécharger le PDF
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReleveView;