import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { Close, Edit, Phone, Email, LocationOn } from '@mui/icons-material';

const EmployeeDetailDialog = ({ open, employee, onClose }) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Fiche Personnel</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar sx={{ width: 120, height: 120, bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
            <Typography variant="h3">{employee.prenom[0]}{employee.nom[0]}</Typography>
          </Avatar>
          <Typography variant="h4">{employee.prenom} {employee.nom}</Typography>
          <Chip label={employee.numero} color="primary" sx={{ mt: 1 }} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 1, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Téléphone</Typography>
                    <Typography variant="body1">{employee.phone}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 1, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{employee.email}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Adresse</Typography>
                    <Typography variant="body1">{employee.address}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">Département</Typography>
                  <Typography variant="body1">{employee.departement}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">Manager</Typography>
                  <Typography variant="body1">{employee.manager}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">Date d'embauche</Typography>
                  <Typography variant="body1">{new Date(employee.dateEmbauche).toLocaleDateString('fr-FR')}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Fin de contrat</Typography>
                  <Typography variant="body1">{new Date(employee.dateFinContrat).toLocaleDateString('fr-FR')}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Edit />} variant="contained">Modifier</Button>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDetailDialog;