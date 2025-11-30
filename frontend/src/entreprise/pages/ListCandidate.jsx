import { useTheme, Typography, Container, Box, CircularProgress, Alert } from "@mui/material";
import GridBoxList from "../layout/GridBoxList";
import { FilterList } from "@mui/icons-material";
import { ModernButton } from "../layout/ModernButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ListCandidate() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [gridItems, setGridItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération dynamique des candidats depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:8181/api/candidats")
      .then((response) => {
        setGridItems(
          response.data.map((candidat) => ({
            id: candidat.id,
            title: `${candidat.nom} ${candidat.prenom}`,
            subtitle: "Candidat",
            description: `Email: ${candidat.email} - Tel: ${candidat.numero}`,
            tags: [], // ajouter des tags dynamiques si besoin
            date: candidat.dateNaissance,
            isFavorite: false,
            image: null,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des candidats.");
        setLoading(false);
      });
  }, []);

  const handleItemClick = (item) => {
    console.log("Item cliqué:", item);
  };

  const handleFilter = () => {
    navigate("/filter");
  };

  const handleItemVoirProfil = (item) => {
    navigate(`/voirprofil/${item.id}`);
  };

  const handleItemToggleFavorite = (item) => {
    console.log("Toggle favorite:", item);
  };

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h2"
        sx={{
          mb: 4,
          textAlign: "center",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Liste des candidats
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, margin: 3 }}>
        <ModernButton
          variant="gradient"
          startIcon={<FilterList />}
          onClick={handleFilter}
        >
          Filter
        </ModernButton>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <GridBoxList
          items={gridItems}
          onItemClick={handleItemClick}
          onItemEdit={handleItemVoirProfil}
          onItemToggleFavorite={handleItemToggleFavorite}
          showActions={true}
          showAvatar={true}
          showChips={true}
          showImage={false}
        />
      )}
    </Container>
  );
}

export default ListCandidate;
