import { useTheme, Typography, Container, Box } from "@mui/material";
import GridBoxList from "../layout/GridBoxList";
import { FilterList } from "@mui/icons-material";
import { ModernButton } from "../layout/ModernButton";
import { useNavigate } from "react-router-dom";

// Données d'exemple pour la grille
const gridItems = [
  {
    id: 1,
    title: "Tsiry Hasina",
    subtitle: "Developper React",
    description:
      "Je suis developper react qui vient d'avoir la licence ITU Concernant le developpeur web.",
    tags: ["React", "Material-UI", "Laravel", "Springboot", "Java"],
    date: "15 Sept 2024",
    isFavorite: true,
    image: null,
  },
  {
    id: 2,
    title: "Node.js API",
    subtitle: "Backend e-commerce",
    description:
      "API REST complète pour plateforme e-commerce avec authentification JWT, paiements Stripe et notifications push.",
    tags: ["Node.js", "Express", "MongoDB", "Stripe"],
    date: "12 Sept 2024",
    status: "En cours",
    isFavorite: false,
    image: null,
  },
  {
    id: 3,
    title: "Flutter ListCandidate",
    subtitle: "ListCandidate mobile bien-être",
    description:
      "Application de méditation avec suivi habitudes, méditations guidées, stats personnalisées et synchronisation cloud.",
    tags: ["Flutter", "Dart", "Firebase", "SQLite"],
    date: "8 Sept 2024",
    status: "Terminé",
    isFavorite: true,
    image: null,
  },
  {
    id: 4,
    title: "ML Pipeline",
    subtitle: "Analyse prédictive",
    description:
      "Pipeline machine learning pour prédiction tendances vente avec preprocessing automatique et modèles ensemble.",
    tags: ["Python", "TensorFlow", "Docker", "AWS"],
    date: "5 Sept 2024",
    status: "Active",
    isFavorite: false,
    image: null,
  },
  {
    id: 5,
    title: "Design System",
    subtitle: "Bibliothèque composants",
    description:
      "Système design complet avec composants réutilisables, documentation Storybook et thèmes personnalisables.",
    tags: ["Figma", "Storybook", "CSS", "React"],
    date: "1 Sept 2024",
    status: "En cours",
    isFavorite: true,
    image: null,
  },
  {
    id: 6,
    title: "Vue.js SPA",
    subtitle: "Application Single Page",
    description:
      "SPA moderne avec Vue 3, Composition API, gestion d'état Pinia et interface utilisateur intuitive.",
    tags: ["Vue.js", "Pinia", "Vite", "Tailwind"],
    date: "28 Août 2024",
    status: "Active",
    isFavorite: false,
    image: null,
  },
  {
    id: 7,
    title: "DevOps Pipeline",
    subtitle: "CI/CD automatisé",
    description:
      "Pipeline DevOps complet avec tests automatisés, déploiement continu et monitoring application.",
    tags: ["Docker", "Kubernetes", "GitHub Actions"],
    date: "25 Août 2024",
    status: "Terminé",
    isFavorite: true,
    image: null,
  },
  {
    id: 8,
    title: "PWA Weather",
    subtitle: "ListCandidate météo progressive",
    description:
      "Progressive Web ListCandidate météo avec géolocalisation, notifications push et mode hors-ligne complet.",
    tags: ["PWA", "Service Workers", "Weather API"],
    date: "20 Août 2024",
    status: "Active",
    isFavorite: false,
    image: null,
  },
];

function ListCandidate() {
  const theme = useTheme();

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    console.log("Item cliqué:", item);
  };

  const handleFilter = () => {
    navigate("/filter");
    console.log("filtre cliqué");
  };

  const handleItemVoirProfil = (item) => {
    navigate("/voirprofil");
    console.log("Voir Profil item:", item);
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
        Listes des candidats
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
    </Container>
  );
}

export default ListCandidate;
