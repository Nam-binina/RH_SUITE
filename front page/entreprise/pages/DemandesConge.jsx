import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  EventAvailable,
  Person,
  CalendarMonth,
  AccessTime
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7e57c2", light: "#b085f5", dark: "#4d2c91", contrastText: "#ffffff" },
    secondary: { main: "#b085f5", light: "#e1d6ff", dark: "#7e57c2" },
    background: { default: "#0f0b16", paper: "#1a1525" },
    text: { primary: "#ffffff", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)" },
    divider: "rgba(126, 87, 194, 0.3)",
    success: { main: "#4caf50", contrastText: "#ffffff" },
    warning: { main: "#ffa726" },
    error: { main: "#f44336" },
  },
  typography: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', h1: { fontWeight: 700 }, h2: { fontWeight: 600 }, h3: { fontWeight: 600 }, button: { textTransform: "none", fontWeight: 600 } },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { backgroundColor: "#1a1525", backgroundImage: "none", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)" } } },
    MuiButton: { styleOverrides: { root: { borderRadius: "12px", textTransform: "none", fontWeight: 600 } } },
  },
});

const DemandeConge = () => {
  const [demandes, setDemandes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [commentaire, setCommentaire] = useState('');
  const [actionType, setActionType] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', type: '' });

  // Fetch des demandes depuis le backend
  const fetchDemandes = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/demandes-conge', { params: { statut: 'EN_ATTENTE' } });
      setDemandes(response.data);
    } catch (error) {
      console.error('Erreur fetch demandes:', error);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const handleOpenDialog = (demande, action) => {
    setSelectedDemande(demande);
    setActionType(action);
    setCommentaire('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDemande(null);
    setCommentaire('');
    setActionType('');
  };

  const handleValidation = async () => {
    if (!selectedDemande) return;
    const newStatut = actionType === 'valider' ? 'VALIDE' : 'REJETE';
    try {
      // Appel backend pour valider/rejeter la demande
      const response = await axios.get('http://localhost:8181/api/demandes-conge/validate', { 
        params: { demande: selectedDemande.id }
      });
      const updatedDemande = response.data;

      setDemandes(demandes.map(d => d.id === updatedDemande.id ? updatedDemande : d));

      setNotification({
        open: true,
        message: `Demande ${actionType === 'valider' ? 'validée' : 'rejetée'} avec succès`,
        type: actionType === 'valider' ? 'success' : 'info'
      });

      handleCloseDialog();
      setTimeout(() => setNotification({ open: false, message: '', type: '' }), 3000);
    } catch (error) {
      console.error('Erreur validation:', error);
      setNotification({ open: true, message: 'Erreur lors de la validation', type: 'error' });
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Congé annuel': return 'primary';
      case 'Congé maladie': return 'warning';
      case 'Congé exceptionnel': return 'secondary';
      default: return 'default';
    }
  };

  const demandesEnAttente = demandes.filter(d => d.statut === 'EN_ATTENTE');

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        {notification.open && (
          <Alert severity={notification.type} sx={{ mb: 3, borderRadius: 2 }} onClose={() => setNotification({ open: false, message: '', type: '' })}>
            {notification.message}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventAvailable sx={{ fontSize: 40, color: 'primary.main' }} />
            Gestion des Demandes de Congé
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Validez ou rejetez les demandes de congé en attente
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime sx={{ color: 'warning.main' }} />
                Demandes en attente
                <Chip label={demandesEnAttente.length} color="warning" size="small" sx={{ ml: 1 }} />
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {demandesEnAttente.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Aucune demande en attente
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Employé</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Période</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Durée</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Motif</TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {demandesEnAttente.map((demande) => (
                      <TableRow key={demande.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}><Person /></Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {demande.employe.prenom} {demande.employe.nom}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Demandé le {new Date(demande.date_demande).toLocaleDateString('fr-FR')}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell><Chip label={demande.type_conge} color={getTypeColor(demande.type_conge)} size="small" /></TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarMonth sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Box>
                              <Typography variant="body2">{new Date(demande.date_debut).toLocaleDateString('fr-FR')}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                au {new Date(demande.date_fin).toLocaleDateString('fr-FR')}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {demande.nombre_jours} jour{demande.nombre_jours > 1 ? 's' : ''}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 200 }}>{demande.motif}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button variant="contained" color="success" size="small" onClick={() => handleOpenDialog(demande, 'valider')}>Valider</Button>
                            <Button variant="outlined" color="error" size="small" onClick={() => handleOpenDialog(demande, 'rejeter')}>Rejeter</Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: 'background.paper', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {actionType === 'valider' ? <CheckCircle sx={{ color: 'success.main' }} /> : <Cancel sx={{ color: 'error.main' }} />}
              {actionType === 'valider' ? 'Valider' : 'Rejeter'} la demande
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            {selectedDemande && (
              <Box>
                <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(126, 87, 194, 0.1)', borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Employé</Typography>
                  <Typography variant="h6" sx={{ mb: 2 }}>{selectedDemande.employe.prenom} {selectedDemande.employe.nom}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Type de congé</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{selectedDemande.type_conge}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Période</Typography>
                  <Typography variant="body1">
                    Du {new Date(selectedDemande.date_debut).toLocaleDateString('fr-FR')} au {new Date(selectedDemande.date_fin).toLocaleDateString('fr-FR')} ({selectedDemande.nombre_jours} jours)
                  </Typography>
                </Box>
                <TextField fullWidth multiline rows={4} label="Commentaire (optionnel)" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} placeholder={`Ajoutez un commentaire pour ${actionType === 'valider' ? 'la validation' : 'le rejet'}...`} sx={{ mt: 2 }} />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
            <Button onClick={handleCloseDialog} variant="outlined">Annuler</Button>
            <Button onClick={handleValidation} variant="contained" color={actionType === 'valider' ? 'success' : 'error'} startIcon={actionType === 'valider' ? <CheckCircle /> : <Cancel />}>Confirmer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default DemandeConge;
