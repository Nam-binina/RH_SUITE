import { useState } from "react";
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Button } from "@mui/material";
import { Link } from "react-router-dom";

const allTags = ["React", "JavaScript", "Node.js", "Python", "Flutter"];
const allCompanies = ["Tech Solutions", "E-commerce Corp", "Analytics Pro", "Wellness App"];
const statusOptions = ["Ouvert", "Fermé"];

function FiltreAnnonces() {
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState("");

  // Crée une query string pour passer les filtres
  const queryParams = new URLSearchParams();
  if (category) queryParams.append("category", category);
  if (tags.length) queryParams.append("tags", tags.join(","));
  if (locations.length) queryParams.append("locations", locations.join(","));
  if (status) queryParams.append("status", status);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
        Filtrer les annonces
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Catégorie</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value=""><em>Aucune</em></MenuItem>
            {allTags.map((tag) => (
              <MenuItem key={tag} value={tag}>{tag}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {allTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={tags.includes(tag)} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Entreprise</InputLabel>
          <Select
            multiple
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {allCompanies.map((company) => (
              <MenuItem key={company} value={company}>
                <Checkbox checked={locations.includes(company)} />
                <ListItemText primary={company} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value=""><em>Aucun</em></MenuItem>
            {statusOptions.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            component={Link}
            to={`/listAnnonces?${queryParams.toString()}`} // <-- link vers ListeAnnonce avec filtres
          >
            Appliquer les filtres
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default FiltreAnnonces;
