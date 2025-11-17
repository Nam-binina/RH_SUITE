import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Container,
  IconButton,
  Avatar,
  Badge,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  People,
  CalendarToday,
  CheckCircle,
  Settings,
  AccessTime,
  Description
} from '@mui/icons-material';

// Import des composants via l'index
import {
  EmployeeListView,
  CalendarView,
  CongeView,
  ConfigView,
  PointageView,
  ReleveView,
  FichePaieView,
  EmployeeDetailDialog
} from './components';

// Import des données
import { employeesData, congeRequests } from './data/mockData';

// Import du thème
import theme from './theme';

// Configuration du menu
const menuItems = [
  { text: 'Employés', icon: <People />, view: 'employees', role: 'rh' },
  { text: 'Calendrier Absences', icon: <CalendarToday />, view: 'calendar', role: 'rh' },
  { text: 'Demandes Congé', icon: <CheckCircle />, view: 'conge', role: 'rh' },
  { text: 'Configuration', icon: <Settings />, view: 'config', role: 'rh' },
  { text: 'Pointage', icon: <AccessTime />, view: 'pointage', role: 'employee' },
  { text: 'Relevé Présence', icon: <Description />, view: 'releve', role: 'employee' },
  { text: 'Fiche de Paie', icon: <Description />, view: 'fiche_paie', role: 'employee' },
];

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [currentView, setCurrentView] = useState('employees');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [congeList, setCongeList] = useState(congeRequests);

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleValidateConge = (id) => {
    setCongeList(congeList.map(c => c.id === id ? { ...c, statut: 'validé' } : c));
  };

  const renderView = () => {
    const viewProps = {
      employees: { onViewEmployee: handleViewEmployee },
      conge: { congeList, onValidateConge: handleValidateConge },
      config: {},
      pointage: {},
      releve: {},
      fiche_paie: {},
      calendar: {}
    };

    const views = {
      employees: EmployeeListView,
      calendar: CalendarView,
      conge: CongeView,
      config: ConfigView,
      pointage: PointageView,
      releve: ReleveView,
      fiche_paie: FichePaieView,
    };

    const ViewComponent = views[currentView];
    return ViewComponent ? <ViewComponent {...viewProps[currentView]} /> : <EmployeeListView onViewEmployee={handleViewEmployee} />;
  };

  const renderMenuSection = (role, title) => (
    <>
      <Typography variant="overline" sx={{ px: 2, color: 'text.secondary', fontWeight: 600 }}>
        {title}
      </Typography>
      <List>
        {menuItems.filter(item => item.role === role).map((item) => (
          <ListItem key={item.view} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={currentView === item.view}
              onClick={() => setCurrentView(item.view)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: currentView === item.view ? 'primary.contrastText' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* Header */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Système de Gestion RH
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar sx={{ ml: 2, bgcolor: 'primary.main' }}>JR</Avatar>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="persistent"
          open={drawerOpen}
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              mt: '64px',
            },
          }}
        >
          <Box sx={{ overflow: 'auto', p: 2 }}>
            {renderMenuSection('rh', 'Partie RH')}
            <Divider sx={{ my: 2 }} />
            {renderMenuSection('employee', 'Partie Employé')}
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '64px',
            ml: drawerOpen ? 0 : '-280px',
            transition: theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Container maxWidth="xl">
            {renderView()}
          </Container>
        </Box>

        {/* Modals */}
        <EmployeeDetailDialog
          open={dialogOpen}
          employee={selectedEmployee}
          onClose={() => setDialogOpen(false)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;