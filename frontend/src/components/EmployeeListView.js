import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  InputAdornment
} from '@mui/material';
import { Add, Search, Business, Email } from '@mui/icons-material';
import { employeesData } from '../data/mockData';

const EmployeeListView = ({ onViewEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('Tous');

  const filteredEmployees = employeesData.filter(emp => {
    const matchesSearch = emp.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.numero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'Tous' || emp.departement === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Liste des Employés</Typography>
        <Button variant="contained" startIcon={<Add />}>Ajouter</Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Rechercher par nom, prénom ou numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Département</InputLabel>
                <Select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                  <MenuItem value="Tous">Tous</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="RH">RH</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {filteredEmployees.map((emp) => (
          <Grid item xs={12} md={6} lg={4} key={emp.id}>
            <Card sx={{ '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', mr: 2 }}>
                    {emp.prenom[0]}{emp.nom[0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{emp.prenom} {emp.nom}</Typography>
                    <Typography variant="body2" color="text.secondary">{emp.numero}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Business sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{emp.departement}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{emp.email}</Typography>
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => onViewEmployee(emp)}
                >
                  Voir le profil
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmployeeListView;