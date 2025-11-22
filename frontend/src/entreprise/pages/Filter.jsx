import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Radio,
  RadioGroup,
  Divider,
  IconButton,
  Collapse,
  Autocomplete,
  InputAdornment,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icônes SVG personnalisées

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
);

const ClearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Filter = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  // États pour tous les filtres
  const [filters, setFilters] = useState({
    // Recherche textuelle
    search: "",

    // Sélection simple
    category: "",
    status: "",
    priority: "",

    // Sélection multiple
    tags: [],
    locations: [],

    // Cases à cocher
    features: {
      remote: false,
      fullTime: false,
      partTime: false,
      contract: false,
      internship: false,
    },

    // Plage de prix/salaire
    priceRange: [0, 10000],

    // Notation
    minRating: 0,

    // Date
    dateFrom: "",
    dateTo: "",
    datePreset: "",

    // Toggle boutons
    sortBy: "recent",
    viewMode: "grid",

    // Switch
    verified: false,
    premium: false,
    inStock: true,

    // Radio buttons
    experience: "",

    // Autocomplete
    skills: [],
    companies: [],
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Données de filtrage
  const categories = [
    "Développement Web",
    "Design",
    "Marketing",
    "Data Science",
    "DevOps",
    "Mobile",
    "Cloud",
    "Cybersécurité",
  ];

  const availableTags = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "AWS",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "PostgreSQL",
    "Vue.js",
    "Angular",
    "Django",
    "Flask",
    "Next.js",
  ];

  const availableLocations = [
    "Paris",
    "Lyon",
    "Marseille",
    "Toulouse",
    "Bordeaux",
    "Nantes",
    "Lille",
    "Rennes",
    "Strasbourg",
    "Montpellier",
  ];

  const availableSkills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "TypeScript",
    "SQL",
    "GraphQL",
    "REST API",
  ];

  const availableCompanies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Apple",
    "Facebook",
    "Netflix",
    "Tesla",
    "Airbnb",
    "Uber",
    "Twitter",
  ];

  const datePresets = [
    { label: "Aujourd'hui", value: "today" },
    { label: "Cette semaine", value: "week" },
    { label: "Ce mois", value: "month" },
    { label: "Cette année", value: "year" },
    { label: "Personnalisé", value: "custom" },
  ];

  // Gestionnaires de changement
  const handleInputChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleCheckboxChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [field]: event.target.checked,
      },
    }));
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleAutocompleteChange = (field) => (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "",
      status: "",
      priority: "",
      tags: [],
      locations: [],
      features: {
        remote: false,
        fullTime: false,
        partTime: false,
        contract: false,
        internship: false,
      },
      priceRange: [0, 10000],
      minRating: 0,
      dateFrom: "",
      dateTo: "",
      datePreset: "",
      sortBy: "recent",
      viewMode: "grid",
      verified: false,
      premium: false,
      inStock: true,
      experience: "",
      skills: [],
      companies: [],
    });
  };

  const handleCancel = () => {
    navigate("/listCandidate");
  };

  const handleApplyFilters = () => {
    console.log("Filtres appliqués:", filters);
    navigate("/listCandidate");
    // Logique d'application des filtres
  };

  // Compter les filtres actifs
  React.useEffect(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.status) count++;
    if (filters.priority) count++;
    if (filters.tags.length > 0) count++;
    if (filters.locations.length > 0) count++;
    if (Object.values(filters.features).some((v) => v)) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) count++;
    if (filters.minRating > 0) count++;
    if (filters.dateFrom || filters.dateTo) count++;
    if (filters.verified || filters.premium) count++;
    if (filters.experience) count++;
    if (filters.skills.length > 0) count++;
    if (filters.companies.length > 0) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
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
        Filtres des candidats
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FilterIcon />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: theme.palette.text.primary }}
          >
            Filtres
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={`${activeFiltersCount} actif${
                activeFiltersCount > 1 ? "s" : ""
              }`}
              size="small"
              sx={{
                backgroundColor: `${theme.palette.primary.main}30`,
                color: theme.palette.primary.light,
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <Button
          variant="text"
          startIcon={<ClearIcon />}
          onClick={handleClearFilters}
          disabled={activeFiltersCount === 0}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.error.main,
              backgroundColor: `${theme.palette.error.main}10`,
            },
          }}
        >
          Réinitialiser
        </Button>
      </Box>

      {/* Barre de recherche rapide */}

      {/* Filtres principaux */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}
          >
            Filtres principaux
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {/* Catégorie */}
            <FormControl fullWidth>
              <InputLabel>Catégorie</InputLabel>
              <Select
                value={filters.category}
                label="Catégorie"
                onChange={handleInputChange("category")}
              >
                <MenuItem value="">
                  <em>Toutes</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

          {/* Tags multiples */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}
            >
              Technologies
            </Typography>
            <Autocomplete
              multiple
              options={availableTags}
              value={filters.tags}
              onChange={handleAutocompleteChange("tags")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Sélectionner des technologies..."
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}20`,
                      color: theme.palette.primary.light,
                      border: `1px solid ${theme.palette.primary.main}40`,
                    }}
                  />
                ))
              }
            />
          </Box>

          {/* Localisations */}
          <Box>
            <Typography
              variant="body1"
              sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}
            >
              Localisation
            </Typography>
            <Autocomplete
              multiple
              options={availableLocations}
              value={filters.locations}
              onChange={handleAutocompleteChange("locations")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Sélectionner des villes..."
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <LocationIcon />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{
                      backgroundColor: `${theme.palette.secondary.main}20`,
                      color: theme.palette.secondary.light,
                      border: `1px solid ${theme.palette.secondary.main}40`,
                    }}
                  />
                ))
              }
            />
          </Box>
        </CardContent>
      </Card>

      {/* Filtres avancés (collapsible) */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: theme.palette.text.primary }}
            >
              Filtres avancés
            </Typography>
            <IconButton
              sx={{
                transform: showAdvanced ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <ExpandIcon />
            </IconButton>
          </Box>

          <Collapse in={showAdvanced}>
            <Box sx={{ mt: 3 }}>
              {/* Type d'emploi */}
              <Accordion
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Type d'emploi
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.features.remote}
                          onChange={handleCheckboxChange("remote")}
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Télétravail"
                      sx={{ color: theme.palette.text.primary }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.features.fullTime}
                          onChange={handleCheckboxChange("fullTime")}
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Temps plein"
                      sx={{ color: theme.palette.text.primary }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.features.partTime}
                          onChange={handleCheckboxChange("partTime")}
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Temps partiel"
                      sx={{ color: theme.palette.text.primary }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.features.contract}
                          onChange={handleCheckboxChange("contract")}
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Contrat"
                      sx={{ color: theme.palette.text.primary }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.features.internship}
                          onChange={handleCheckboxChange("internship")}
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Stage"
                      sx={{ color: theme.palette.text.primary }}
                    />
                  </FormGroup>
                </AccordionDetails>
              </Accordion>

              {/* Fourchette de salaire */}
              <Accordion
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Fourchette de salaire
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ px: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        {filters.priceRange[0]}€
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        {filters.priceRange[1]}€
                      </Typography>
                    </Box>
                    <Slider
                      value={filters.priceRange}
                      onChange={handleSliderChange("priceRange")}
                      min={0}
                      max={10000}
                      step={100}
                      valueLabelDisplay="auto"
                      sx={{
                        color: theme.palette.primary.main,
                        "& .MuiSlider-thumb": {
                          backgroundColor: theme.palette.primary.main,
                          boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`,
                        },
                        "& .MuiSlider-track": {
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        },
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Note minimale */}
              <Accordion
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Note minimale
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ px: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <StarIcon />
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        {filters.minRating.toFixed(1)} étoiles et plus
                      </Typography>
                    </Box>
                    <Slider
                      value={filters.minRating}
                      onChange={handleSliderChange("minRating")}
                      min={0}
                      max={5}
                      step={0.5}
                      marks
                      valueLabelDisplay="auto"
                      sx={{
                        color: theme.palette.warning.main,
                        "& .MuiSlider-thumb": {
                          backgroundColor: theme.palette.warning.main,
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: theme.palette.warning.main,
                        },
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Dates */}
              <Accordion
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Période
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <FormControl fullWidth>
                      <InputLabel>Présélection</InputLabel>
                      <Select
                        value={filters.datePreset}
                        label="Présélection"
                        onChange={handleInputChange("datePreset")}
                        startAdornment={
                          <InputAdornment position="start">
                            <CalendarIcon />
                          </InputAdornment>
                        }
                      >
                        {datePresets.map((preset) => (
                          <MenuItem key={preset.value} value={preset.value}>
                            {preset.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {filters.datePreset === "custom" && (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 2,
                        }}
                      >
                        <TextField
                          label="Date de début"
                          type="date"
                          value={filters.dateFrom}
                          onChange={handleInputChange("dateFrom")}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          label="Date de fin"
                          type="date"
                          value={filters.dateTo}
                          onChange={handleInputChange("dateTo")}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Box>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Expérience */}
              <Accordion
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Niveau d'expérience
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <RadioGroup
                    value={filters.experience}
                    onChange={handleInputChange("experience")}
                  >
                    <FormControlLabel
                      value="junior"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Junior (0-2 ans)"
                      sx={{ color: theme.palette.text.primary }}
                    />
                    <FormControlLabel
                      value="intermediate"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Intermédiaire (2-5 ans)"
                      sx={{ color: theme.palette.text.primary }}
                    />
                    <FormControlLabel
                      value="senior"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Senior (5+ ans)"
                      sx={{ color: theme.palette.text.primary }}
                    />
                    <FormControlLabel
                      value="expert"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.text.secondary,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Expert (10+ ans)"
                      sx={{ color: theme.palette.text.primary }}
                    />
                  </RadioGroup>
                </AccordionDetails>
              </Accordion>

              {/* Compétences */}
              <Accordion
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Compétences requises
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Autocomplete
                    multiple
                    options={availableSkills}
                    value={filters.skills}
                    onChange={handleAutocompleteChange("skills")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Sélectionner des compétences..."
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          sx={{
                            backgroundColor: `${theme.palette.success.main}20`,
                            color: theme.palette.success.main,
                            border: `1px solid ${theme.palette.success.main}40`,
                          }}
                        />
                      ))
                    }
                  />
                </AccordionDetails>
              </Accordion>

              {/* Entreprises */}
              <Accordion
                sx={{ backgroundColor: "transparent", boxShadow: "none" }}
              >
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Entreprises
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Autocomplete
                    multiple
                    options={availableCompanies}
                    value={filters.companies}
                    onChange={handleAutocompleteChange("companies")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Sélectionner des entreprises..."
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          sx={{
                            backgroundColor: `${theme.palette.info.main}20`,
                            color: theme.palette.info.main,
                            border: `1px solid ${theme.palette.info.main}40`,
                          }}
                        />
                      ))
                    }
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Boutons d'action */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={handleCancel}
          sx={{
            borderColor: theme.palette.text.secondary,
            color: theme.palette.text.secondary,
            minWidth: 160,
            "&:hover": {
              backgroundColor: `${theme.palette.text.secondary}10`,
              borderColor: theme.palette.text.primary,
              color: theme.palette.text.primary,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleApplyFilters}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            minWidth: 160,
            boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              boxShadow: `0 6px 24px ${theme.palette.primary.main}50`,
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          Appliquer les filtres
        </Button>
      </Box>
      <br />
    </Box>
  );
};

export default Filter;
