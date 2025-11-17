import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import { Download } from '@mui/icons-material';

const FichePaieView = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Fiche de Paie Mensuelle</Typography>
        <Button variant="contained" startIcon={<Download />}>
          Exporter XLSX
        </Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Novembre 2025</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Base</TableCell>
                  <TableCell align="right">Taux</TableCell>
                  <TableCell align="right">Montant</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Salaire de Base</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">1 500 000 Ar</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Prime de Transport</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">50 000 Ar</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Salaire Brut</strong></TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right"><strong>1 550 000 Ar</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CNAPS</TableCell>
                  <TableCell align="right">1 550 000 Ar</TableCell>
                  <TableCell align="right">1%</TableCell>
                  <TableCell align="right" sx={{ color: 'error.main' }}>-15 500 Ar</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>OSTIE</TableCell>
                  <TableCell align="right">1 550 000 Ar</TableCell>
                  <TableCell align="right">0.5%</TableCell>
                  <TableCell align="right" sx={{ color: 'error.main' }}>-7 750 Ar</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IRSA</TableCell>
                  <TableCell align="right">1 526 750 Ar</TableCell>
                  <TableCell align="right">20%</TableCell>
                  <TableCell align="right" sx={{ color: 'error.main' }}>-305 350 Ar</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Salaire Net</strong></TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right"><strong style={{ color: '#4caf50' }}>1 221 400 Ar</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FichePaieView;