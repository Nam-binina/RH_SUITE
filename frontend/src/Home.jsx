import { Box, Typography, Container } from "@mui/material";
import ButtonShowcase from "./BoutonChoix";
import { useTheme } from "@mui/material";

function Home() {
  const theme = useTheme();
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        background: "transparent",
      }}
    >
      <Container maxWidth="lg">
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
          Choix
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 6,
            textAlign: "center",
            color: theme.palette.text.secondary,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Içi, tu as le choix de choisir si tu es un candidat à la recherche de
          travail ou une entreprise à la recherche d'employé.
        </Typography>

        <ButtonShowcase />
      </Container>
    </Box>
  );
}

export default Home;
