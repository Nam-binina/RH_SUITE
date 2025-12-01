import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PerformanceEmploye = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const id = user?.id || 1;
    const now = new Date();
    const mois = now.getMonth() + 1;
    const annee = now.getFullYear();

    import("../api/api").then(({ default: api }) => {
      api
        .get(`/performance/employe/${id}?mois=${mois}&annee=${annee}`)
        .then((res) => setData(res.data))
        .catch(() => setData(null))
        .finally(() => setLoading(false));
    });
  }, []);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}><CircularProgress /></Box>
  );

  if (!data) return (
    <Box sx={{ p: 4 }}>
      <Typography>Impossible de récupérer les données de performance.</Typography>
    </Box>
  );

  const stats = data.pointageStatistics || {};
  const hs = data.heuresSupplementaires || {};
  const abs = data.absencesResume || {};
  const fiche = data.fichePaie || null;

  const metric = (label, value, sub) => (
    <Card sx={{ borderRadius: 3, p: 1 }}>
      <CardContent>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>{label}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
        {sub && <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>{sub}</Typography>}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Performance</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>{metric("Jours travaillés", stats.nbJoursTravail || stats.daysWorked || "—")}</Grid>
        <Grid item xs={12} md={3}>{metric("Heures totales", stats.totalHours || stats.hTotal || "—")}</Grid>
        <Grid item xs={12} md={3}>{metric("Heures sup.", hs.totalHeures || hs.total || "—")}</Grid>
        <Grid item xs={12} md={3}>{metric("Retards", stats.nbRetards || stats.delays || 0)}</Grid>

        <Grid item xs={12} md={4}>{metric("Absences", abs.nbAbsences || abs.count || 0)}</Grid>
        <Grid item xs={12} md={4}>{metric("Absences (jours)", abs.totalDays || abs.days || 0)}</Grid>
        <Grid item xs={12} md={4}>{metric("Net à payer (fiche)", fiche ? fiche.netAPayer : "—")}</Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Détails</Typography>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PerformanceEmploye;
