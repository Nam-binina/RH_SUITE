import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  Grid,
  Divider,
  Paper,
  Stack,
  InputAdornment,
} from '@mui/material';
import {
  Settings,
  Save,
  Info,
  TrendingUp,
  AccountBalance,
  LocalHospital,
  Receipt,
  Calculate,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7e57c2",
      light: "#b085f5",
      dark: "#4d2c91",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b085f5",
      light: "#e1d6ff",
      dark: "#7e57c2",
    },
    background: {
      default: "#0f0b16",
      paper: "#1a1525",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(126, 87, 194, 0.3)",
    success: {
      main: "#4caf50",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffa726",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1525",
          backgroundImage: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(126, 87, 194, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(126, 87, 194, 0.5)',
            },
          },
        },
      },
    },
  },
});

const Configuration = () => {
  const [selectedTaux, setSelectedTaux] = useState('cnaps');
  const [tauxValue, setTauxValue] = useState('');
  const [tauxConfig, setTauxConfig] = useState({
    cnaps: 0.01,
    ostie: 0.01,
    irsa: 0.10,
  });
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });

  const tauxOptions = [
    {
      value: 'cnaps',
      label: 'CNAPS',
      fullName: 'Caisse Nationale de Prévoyance Sociale',
      description: 'Cotisation sociale obligatoire',
      icon: <AccountBalance />,
    },
    {
      value: 'ostie',
      label: 'OSTIE',
      fullName: 'Organisme Sanitaire Tananarivien Inter-Entreprises',
      description: 'Cotisation de santé',
      icon: <LocalHospital />,
    },
    {
      value: 'irsa',
      label: 'IRSA',
      fullName: 'Impôt sur les Revenus Salariaux et Assimilés',
      description: 'Impôt sur le revenu',
      icon: <Receipt />,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tauxValue || parseFloat(tauxValue) < 0 || parseFloat(tauxValue) > 100) {
      setNotification({
        open: true,
        message: 'Veuillez entrer un taux valide entre 0 et 100',
        type: 'error',
      });
      return;
    }

    const newTaux = parseFloat(tauxValue) / 100;
    setTauxConfig({
      ...tauxConfig,
      [selectedTaux]: newTaux,
    });

    const optionLabel = tauxOptions.find((t) => t.value === selectedTaux).label;
    setNotification({
      open: true,
      message: `Le taux ${optionLabel} a été mis à jour avec succès à ${tauxValue}%`,
      type: 'success',
    });

    setTauxValue('');

    setTimeout(() => {
      setNotification({ open: false, message: '', type: 'success' });
    }, 4000);
  };

  const getCurrentOption = () => {
    return tauxOptions.find((t) => t.value === selectedTaux);
  };

  // Exemple de calcul
  const salaireBrut = 1000000;
  const cnapsAmount = salaireBrut * tauxConfig.cnaps;
  const ostieAmount = salaireBrut * tauxConfig.ostie;
  const irsaAmount = salaireBrut * tauxConfig.irsa;
  const totalRetenues = cnapsAmount + ostieAmount + irsaAmount;
  const salaireNet = salaireBrut - totalRetenues;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        {notification.open && (
          <Alert
            severity={notification.type}
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setNotification({ open: false, message: '', type: 'success' })}
          >
            {notification.message}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Settings sx={{ fontSize: 40, color: 'primary.main' }} />
            Configuration des Taux
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gérez les taux de cotisation et d'imposition pour le calcul de la paie
          </Typography>
        </Box>

        <Alert
          severity="info"
          icon={<Info />}
          sx={{
            mb: 3,
            bgcolor: 'rgba(126, 87, 194, 0.1)',
            border: '1px solid rgba(126, 87, 194, 0.3)',
            '& .MuiAlert-icon': {
              color: 'primary.main',
            },
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Important
          </Typography>
          <Typography variant="body2">
            Les modifications de taux s'appliqueront aux prochains calculs de paie. Les fiches de paie déjà générées ne seront pas affectées.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp />
                  Modifier les taux
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    select
                    fullWidth
                    label="Type de taux"
                    value={selectedTaux}
                    onChange={(e) => setSelectedTaux(e.target.value)}
                    sx={{ mb: 3 }}
                  >
                    {tauxOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {option.icon}
                          <Box>
                            <Typography variant="body1">{option.fullName}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {option.description}
                            </Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    type="number"
                    label="Nouveau taux"
                    placeholder="Ex: 1.5"
                    value={tauxValue}
                    onChange={(e) => setTauxValue(e.target.value)}
                    inputProps={{
                      step: 0.01,
                      min: 0,
                      max: 100,
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    sx={{ mb: 3 }}
                    required
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<Save />}
                    sx={{ py: 1.5 }}
                  >
                    Enregistrer la modification
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Settings />
                  Taux actuels
                </Typography>

                <Stack spacing={2}>
                  {tauxOptions.map((option) => (
                    <Paper
                      key={option.value}
                      sx={{
                        p: 2,
                        bgcolor: 'rgba(126, 87, 194, 0.1)',
                        border: '1px solid rgba(126, 87, 194, 0.2)',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ color: 'primary.light' }}>{option.icon}</Box>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {option.label}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {option.fullName}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.light' }}>
                          {(tauxConfig[option.value] * 100).toFixed(2)}%
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={2}>
                  {tauxOptions.map((option) => (
                    <Grid item xs={4} key={option.value}>
                      <Paper
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          bgcolor: 'rgba(126, 87, 194, 0.05)',
                          border: '1px solid rgba(126, 87, 194, 0.2)',
                        }}
                      >
                        <Box sx={{ color: 'primary.main', mb: 1 }}>{option.icon}</Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.light', mb: 0.5 }}>
                          {(tauxConfig[option.value] * 100).toFixed(2)}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Calculate />
                  Exemple de calcul
                </Typography>

                <Paper
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(176, 133, 245, 0.05)',
                    border: '1px solid rgba(176, 133, 245, 0.2)',
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                    Salaire brut : {formatCurrency(salaireBrut)}
                  </Typography>

                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Salaire brut
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formatCurrency(salaireBrut)}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        CNAPS ({(tauxConfig.cnaps * 100).toFixed(2)}%)
                      </Typography>
                      <Typography variant="body1" color="error.main" sx={{ fontWeight: 600 }}>
                        - {formatCurrency(cnapsAmount)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        OSTIE ({(tauxConfig.ostie * 100).toFixed(2)}%)
                      </Typography>
                      <Typography variant="body1" color="error.main" sx={{ fontWeight: 600 }}>
                        - {formatCurrency(ostieAmount)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        IRSA ({(tauxConfig.irsa * 100).toFixed(2)}%)
                      </Typography>
                      <Typography variant="body1" color="error.main" sx={{ fontWeight: 600 }}>
                        - {formatCurrency(irsaAmount)}
                      </Typography>
                    </Box>

                    <Divider />

                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: 'rgba(126, 87, 194, 0.2)',
                        border: '1px solid rgba(126, 87, 194, 0.3)',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Salaire net à payer
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                          {formatCurrency(salaireNet)}
                        </Typography>
                      </Box>
                    </Paper>

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                      Total des retenues : {formatCurrency(totalRetenues)}
                    </Typography>
                  </Stack>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Configuration;