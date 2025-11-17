import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Badge
} from '@mui/material';
import { Notifications } from '@mui/icons-material';

const CongeView = ({ congeList, onValidateConge }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Demandes de Congé</Typography>
        <Badge badgeContent={congeList.filter(c => c.statut === 'en_attente').length} color="error">
          <Notifications />
        </Badge>
      </Box>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employé</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date Début</TableCell>
              <TableCell>Date Fin</TableCell>
              <TableCell>Motif</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {congeList.map((conge) => (
              <TableRow key={conge.id}>
                <TableCell>{conge.nom}</TableCell>
                <TableCell>{conge.type}</TableCell>
                <TableCell>{new Date(conge.dateDebut).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{new Date(conge.dateFin).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{conge.motif}</TableCell>
                <TableCell>
                  <Chip 
                    label={conge.statut === 'en_attente' ? 'En attente' : 'Validé'}
                    color={conge.statut === 'en_attente' ? 'warning' : 'success'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {conge.statut === 'en_attente' && (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => onValidateConge(conge.id)}
                    >
                      Valider
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CongeView;