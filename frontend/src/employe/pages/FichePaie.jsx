import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from "@mui/material";

import * as XLSX from "xlsx";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function FichePaie() {
  // ---------------------------- FILTRE ----------------------------
  const moisListe = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const theme = useTheme();
  const navigate = useNavigate();
  
  const currentYear = new Date().getFullYear();
  const [mois, setMois] = useState("Janvier");
  const [annee, setAnnee] = useState(currentYear);
  const [filtreValide, setFiltreValide] = useState(false);
  const goTableaudebord = () => navigate("/tableaudebordEmploye");

  // ------------------------- DONNÉES EXEMPLE -----------------------
  const employe = {
    matricule: "EMP-4478",
    nom: "Andriabarimanana Tendry",
    fonction: "Développeur FullStack",
    categorie: "Cadre",
    contrat: "CDI",
    dateEntree: "2022-01-15",
    cnaps: "CNAPS-2025-7788",
    secteur: "non-agricole",
    salaireBase: 850000,
    primes: 200000,
    indemnite: 80000,
    absences: 1,
    heuresSup30: 6,
    heuresSup50: 10
  };

  // ---------------------------- CALCULS ----------------------------
  const anciennete = Math.floor(
    (new Date() - new Date(employe.dateEntree)) / (1000 * 60 * 60 * 24 * 365)
  );

  const salaireBrut = employe.salaireBase + employe.primes + employe.indemnite;

  const cnapsSalarie = salaireBrut * 0.01;
  const ostieSalarie = salaireBrut * 0.01;

  const tauxHoraire = (employe.salaireBase / 30) / 8;

  const HS_30 = employe.heuresSup30 * tauxHoraire * 1.3;
  const HS_50 = employe.heuresSup50 * tauxHoraire * 1.5;

  const retenueAbsence = (employe.salaireBase / 30) * employe.absences;
  const revenuImposable = salaireBrut - cnapsSalarie - ostieSalarie;
  const irsa = Math.max(0, revenuImposable * 0.05);

  const totalRetenues = cnapsSalarie + ostieSalarie + retenueAbsence + irsa;
  const netAPayer = salaireBrut + HS_30 + HS_50 - totalRetenues;

  const chargePatronaleCnaps = salaireBrut * 0.13;
  const chargePatronaleOstie = salaireBrut * 0.05;
  const coutTotalEmployeur =
    salaireBrut + HS_30 + HS_50 + chargePatronaleCnaps + chargePatronaleOstie;

  // ---------------------------- EXPORT XLSX ----------------------------
  const exportXlsx = () => {
    const data = [
      [`Fiche de paie - ${mois} ${annee}`],
      [],
      ["Société", "Entreprise Madagascar SARL"],
      ["Adresse", "Lot II M 35 Ankadindramamy - Antananarivo"],
      ["Matricule", employe.matricule],
      ["Employé", employe.nom],
      ["Fonction", employe.fonction],
      ["Contrat", employe.contrat],
      ["Ancienneté", `${anciennete} ans`],
      [],
      ["Salaire de base", employe.salaireBase],
      ["Primes", employe.primes],
      ["Indemnités", employe.indemnite],
      ["Total brut", salaireBrut],
      [],
      ["HS 30%", HS_30],
      ["HS 50%", HS_50],
      [],
      ["CNAPS 1%", cnapsSalarie],
      ["OSTIE 1%", ostieSalarie],
      ["Absences", retenueAbsence],
      ["IRSA", irsa],
      ["Total retenues", totalRetenues],
      [],
      ["Net à payer", netAPayer],
      [],
      ["Charges patronales CNAPS (13%)", chargePatronaleCnaps],
      ["Charges patronales OSTIE (5%)", chargePatronaleOstie],
      ["Coût total employeur", coutTotalEmployeur]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FichePaie");

    XLSX.writeFile(wb, `fiche_de_paie_${mois}_${annee}.xlsx`);
  };

  // ---------------------------- RENDER ----------------------------
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>

      {/* ---------------------------- FILTRE ---------------------------- */}
      <Card
        sx={{
          mb: 4,
          p: 3,
          borderRadius: "18px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
          Génération de la fiche de paie
        </Typography>

        <Typography sx={{ mb: 3, color: "#666", fontSize: "15px" }}>
          Sélectionnez le mois et l'année.  
          La fiche affichera **les éléments exacts de rémunération** du mois choisi.
        </Typography>

        <Box display="flex" gap={3} alignItems="center">
          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>Mois</InputLabel>
            <Select value={mois} label="Mois" onChange={(e) => setMois(e.target.value)}>
              {moisListe.map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 120 }}>
            <InputLabel>Année</InputLabel>
            <Select value={annee} label="Année" onChange={(e) => setAnnee(e.target.value)}>
              {Array.from({ length: 10 }, (_, i) => currentYear - i).map((an) => (
                <MenuItem key={an} value={an}>{an}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => setFiltreValide(true)}
            sx={{
              height: "40px",
              textTransform: "none",
              borderRadius: "10px",
              px: 3
            }}
          >
            Valider
          </Button>
        </Box>
      </Card>

      {/* ---------------------------- FICHE ---------------------------- */}
      {filtreValide && (
        <Card
          sx={{
            p: 4,
            borderRadius: "18px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.07)"
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            FICHE DE PAIE
          </Typography>

          <Typography sx={{ mb: 3, color: "#555", fontSize: "18px" }}>
            {mois} {annee}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Table>
            <TableBody>

              {/* ---------------- SOCIÉTÉ ---------------- */}
              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 700, fontSize: "18px", py: 2 }}>
                  Entreprise Madagascar SARL
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ color: "#666" }}>Adresse</TableCell>
                <TableCell>Lot II M 35 Ankadindramamy – Antananarivo</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2} sx={{ pt: 3, fontWeight: 700, fontSize: "17px" }}>
                  Informations Employé
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Matricule</TableCell>
                <TableCell>{employe.matricule}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>{employe.nom}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fonction</TableCell>
                <TableCell>{employe.fonction}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Contrat</TableCell>
                <TableCell>{employe.contrat}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ancienneté</TableCell>
                <TableCell>{anciennete} ans</TableCell>
              </TableRow>

              {/* ---------------- GAINS ---------------- */}
              <TableRow>
                <TableCell colSpan={2} sx={{ pt: 3, fontWeight: 700, fontSize: "17px" }}>
                  Gains Mensuels
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Salaire de base</TableCell>
                <TableCell align="right">{employe.salaireBase.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Primes</TableCell>
                <TableCell align="right">{employe.primes.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Indemnités</TableCell>
                <TableCell align="right">{employe.indemnite.toLocaleString()}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Total Brut</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {salaireBrut.toLocaleString()}
                </TableCell>
              </TableRow>

              {/* ---------------- HEURES SUP ---------------- */}
              <TableRow>
                <TableCell colSpan={2} sx={{ pt: 3, fontWeight: 700, fontSize: "17px" }}>
                  Heures Supplémentaires
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>HS 30% ({employe.heuresSup30}h)</TableCell>
                <TableCell align="right">{HS_30.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HS 50% ({employe.heuresSup50}h)</TableCell>
                <TableCell align="right">{HS_50.toLocaleString()}</TableCell>
              </TableRow>

              {/* ---------------- RETENUES ---------------- */}
              <TableRow>
                <TableCell colSpan={2} sx={{ pt: 3, fontWeight: 700, fontSize: "17px" }}>
                  Retenues
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>CNAPS (1%)</TableCell>
                <TableCell align="right">{cnapsSalarie.toLocaleString()}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>OSTIE (1%)</TableCell>
                <TableCell align="right">{ostieSalarie.toLocaleString()}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Absence ({employe.absences}j)</TableCell>
                <TableCell align="right">{retenueAbsence.toLocaleString()}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>IRSA</TableCell>
                <TableCell align="right">{irsa.toLocaleString()}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Total Retenues</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {totalRetenues.toLocaleString()}
                </TableCell>
              </TableRow>

              {/* ---------------- NET ---------------- */}
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 700, color: "green", fontSize: "18px", pt: 2 }}
                >
                  NET À PAYER
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 700, color: "green", fontSize: "18px" }}
                >
                  {netAPayer.toLocaleString()} Ar
                </TableCell>
              </TableRow>

              {/* ---------------- CHARGES ---------------- */}
              <TableRow>
                <TableCell colSpan={2} sx={{ pt: 3, fontWeight: 700, fontSize: "17px" }}>
                  Charges Patronales
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>CNAPS (13%)</TableCell>
                <TableCell align="right">
                  {chargePatronaleCnaps.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>OSTIE (5%)</TableCell>
                <TableCell align="right">
                  {chargePatronaleOstie.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Coût total employeur</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {coutTotalEmployeur.toLocaleString()}
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>

          <Button
            onClick={exportXlsx}
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px"
            }}
          >
            Exporter en XLSX
          </Button>

            <Button
            onClick={goTableaudebord}
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px"
            }}
          >
                                       Tableau de bord

          </Button>
        </Card>
      )}
    </Container>
  );
}

export default FichePaie;
