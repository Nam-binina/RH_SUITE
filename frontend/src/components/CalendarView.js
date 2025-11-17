import React from 'react';
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
  MenuItem
} from '@mui/material';

const CalendarView = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Calendrier des Absences et Congés</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Employé</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="1">Jean Rakoto</MenuItem>
                  <MenuItem value="2">Marie Rasoa</MenuItem>
                  <MenuItem value="3">Hery Andry</MenuItem>
                  <MenuItem value="4">Zo Nirina</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2, 
                p: 3, 
                minHeight: 400,
                background: 'linear-gradient(135deg, rgba(126, 87, 194, 0.05) 0%, rgba(176, 133, 245, 0.05) 100%)'
              }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Novembre 2025</Typography>
                <Grid container spacing={1}>
                  {[...Array(30)].map((_, i) => (
                    <Grid item xs={12/7} key={i}>
                      <Box sx={{ 
                        p: 1, 
                        border: '1px solid', 
                        borderColor: 'divider',
                        borderRadius: 1,
                        textAlign: 'center',
                        '&:hover': { bgcolor: 'primary.dark', cursor: 'pointer' }
                      }}>
                        <Typography variant="body2">{i + 1}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CalendarView;