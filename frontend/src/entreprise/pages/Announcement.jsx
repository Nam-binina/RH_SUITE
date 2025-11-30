import React, { useState } from 'react';
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
  Divider,
  IconButton,
  Paper,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Fade,
  Radio,
  FormControlLabel,
  Switch,
  InputAdornment,
  Autocomplete,
} from '@mui/material';

// Icônes SVG
const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const QuizIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
  </svg>
);

const Announcement = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // État du formulaire
  const [jobData, setJobData] = useState({
    // Informations de base
    title: '',
    company: '',
    location: '',
    type: '',
    experience: '',
    salary: {
      min: '',
      max: '',
      currency: 'EUR',
      period: 'annuel',
    },
    remote: false,
    
    // Description
    description: '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    
    // Compétences
    skills: [],
    languages: [],
    
    // Contact
    contactEmail: '',
    applicationDeadline: '',
  });

  // État des QCM
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: 'multiple', // multiple, single, text
    options: ['', '', '', ''],
    correctAnswer: [], // Pour multiple choice
    required: true,
    points: 1,
  });
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

  // Listes de suggestions
  const jobTypes = ['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance', 'Temps partiel'];
  const experienceLevels = ['Débutant', 'Junior (1-3 ans)', 'Intermédiaire (3-5 ans)', 'Senior (5+ ans)', 'Expert (10+ ans)'];
  const availableSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript',
    'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'MySQL',
    'Vue.js', 'Angular', 'Django', 'Flask', 'Spring Boot', 'GraphQL',
  ];
  const languages = ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 'Chinois', 'Arabe'];

  const steps = ['Informations de base', 'Description du poste', 'Compétences requises', 'Questionnaire (QCM)'];

  // Gestionnaires de changement
  const handleInputChange = (field) => (event) => {
    setJobData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSalaryChange = (field) => (event) => {
    setJobData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: event.target.value
      }
    }));
  };

  const handleSwitchChange = (field) => (event) => {
    setJobData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  // Gestion des listes (responsabilités, exigences, avantages)
  const [newItem, setNewItem] = useState({ responsibilities: '', requirements: '', benefits: '' });

  const addItemToList = (field) => () => {
    if (newItem[field].trim()) {
      setJobData(prev => ({
        ...prev,
        [field]: [...prev[field], newItem[field].trim()]
      }));
      setNewItem(prev => ({ ...prev, [field]: '' }));
    }
  };

  const removeItemFromList = (field, index) => () => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Gestion des QCM
  const handleQuestionChange = (field) => (event) => {
    setCurrentQuestion(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleOptionChange = (index) => (event) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = event.target.value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleCorrectAnswerChange = (value) => {
    if (currentQuestion.type === 'single') {
      setCurrentQuestion(prev => ({
        ...prev,
        correctAnswer: [value]
      }));
    } else {
      setCurrentQuestion(prev => {
        const newAnswers = prev.correctAnswer.includes(value)
          ? prev.correctAnswer.filter(a => a !== value)
          : [...prev.correctAnswer, value];
        return { ...prev, correctAnswer: newAnswers };
      });
    }
  };

  const addOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index) => {
    if (currentQuestion.options.length > 2) {
      setCurrentQuestion(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
        correctAnswer: prev.correctAnswer.filter(a => a !== index)
      }));
    }
  };

  const saveQuestion = () => {
    if (currentQuestion.question.trim() && 
        (currentQuestion.type === 'text' || currentQuestion.options.filter(o => o.trim()).length >= 2)) {
      
      if (editingQuestionIndex !== null) {
        const newQuestions = [...questions];
        newQuestions[editingQuestionIndex] = { ...currentQuestion };
        setQuestions(newQuestions);
        setEditingQuestionIndex(null);
      } else {
        setQuestions([...questions, { ...currentQuestion }]);
      }
      
      // Reset
      setCurrentQuestion({
        question: '',
        type: 'multiple',
        options: ['', '', '', ''],
        correctAnswer: [],
        required: true,
        points: 1,
      });
    }
  };

  const editQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    setEditingQuestionIndex(index);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const cancelEdit = () => {
    setCurrentQuestion({
      question: '',
      type: 'multiple',
      options: ['', '', '', ''],
      correctAnswer: [],
      required: true,
      points: 1,
    });
    setEditingQuestionIndex(null);
  };

  // Navigation
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    console.log('Annonce créée:', jobData);
    console.log('Questions:', questions);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1, textAlign: 'center' }}>
        Créer une Annonce d'Emploi
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4, textAlign: 'center' }}>
        Remplissez les informations pour publier votre offre d'emploi
      </Typography>

      {/* Alert de succès */}
      {showSuccess && (
        <Fade in={showSuccess}>
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              backgroundColor: `${theme.palette.success.main}15`,
              color: theme.palette.success.main,
              border: `1px solid ${theme.palette.success.main}30`,
            }}
          >
            Annonce créée avec succès !
          </Alert>
        </Fade>
      )}

      {/* Stepper */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Contenu des étapes */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          {/* Étape 0: Informations de base */}
          {activeStep === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                Informations de base
              </Typography>

              <TextField
                label="Titre du poste"
                value={jobData.title}
                onChange={handleInputChange('title')}
                required
                fullWidth
                placeholder="Ex: Développeur Full Stack Senior"
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="Entreprise"
                  value={jobData.company}
                  onChange={handleInputChange('company')}
                  required
                />
                <TextField
                  label="Localisation"
                  value={jobData.location}
                  onChange={handleInputChange('location')}
                  required
                  placeholder="Ex: Paris, France"
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Type de contrat</InputLabel>
                  <Select
                    value={jobData.type}
                    label="Type de contrat"
                    onChange={handleInputChange('type')}
                  >
                    {jobTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Niveau d'expérience</InputLabel>
                  <Select
                    value={jobData.experience}
                    label="Niveau d'expérience"
                    onChange={handleInputChange('experience')}
                  >
                    {experienceLevels.map((level) => (
                      <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Salaire
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                <TextField
                  label="Minimum"
                  type="number"
                  value={jobData.salary.min}
                  onChange={handleSalaryChange('min')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                  }}
                />
                <TextField
                  label="Maximum"
                  type="number"
                  value={jobData.salary.max}
                  onChange={handleSalaryChange('max')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel>Devise</InputLabel>
                  <Select
                    value={jobData.salary.currency}
                    label="Devise"
                    onChange={handleSalaryChange('currency')}
                  >
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Période</InputLabel>
                  <Select
                    value={jobData.salary.period}
                    label="Période"
                    onChange={handleSalaryChange('period')}
                  >
                    <MenuItem value="annuel">Annuel</MenuItem>
                    <MenuItem value="mensuel">Mensuel</MenuItem>
                    <MenuItem value="horaire">Horaire</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={jobData.remote}
                    onChange={handleSwitchChange('remote')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label="Télétravail possible"
                sx={{ color: theme.palette.text.primary }}
              />
            </Box>
          )}

          {/* Étape 1: Description du poste */}
          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                Description du poste
              </Typography>

              <TextField
                label="Description générale"
                value={jobData.description}
                onChange={handleInputChange('description')}
                multiline
                rows={6}
                fullWidth
                placeholder="Décrivez le poste, l'environnement de travail, les objectifs..."
              />

              <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

              {/* Responsabilités */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                  Responsabilités principales
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    placeholder="Ajouter une responsabilité"
                    value={newItem.responsibilities}
                    onChange={(e) => setNewItem(prev => ({ ...prev, responsibilities: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addItemToList('responsibilities')()}
                    size="small"
                    fullWidth
                  />
                  <IconButton 
                    onClick={addItemToList('responsibilities')}
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}20`,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {jobData.responsibilities.map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: `${theme.palette.primary.main}05`,
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                        • {item}
                      </Typography>
                      <IconButton size="small" onClick={removeItemFromList('responsibilities', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

              {/* Exigences */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                  Exigences du poste
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    placeholder="Ajouter une exigence"
                    value={newItem.requirements}
                    onChange={(e) => setNewItem(prev => ({ ...prev, requirements: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addItemToList('requirements')()}
                    size="small"
                    fullWidth
                  />
                  <IconButton 
                    onClick={addItemToList('requirements')}
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}20`,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {jobData.requirements.map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: `${theme.palette.warning.main}05`,
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                        • {item}
                      </Typography>
                      <IconButton size="small" onClick={removeItemFromList('requirements', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

              {/* Avantages */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                  Avantages
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    placeholder="Ajouter un avantage"
                    value={newItem.benefits}
                    onChange={(e) => setNewItem(prev => ({ ...prev, benefits: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addItemToList('benefits')()}
                    size="small"
                    fullWidth
                  />
                  <IconButton 
                    onClick={addItemToList('benefits')}
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}20`,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {jobData.benefits.map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: `${theme.palette.success.main}05`,
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                        • {item}
                      </Typography>
                      <IconButton size="small" onClick={removeItemFromList('benefits', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {/* Étape 2: Compétences */}
          {activeStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                Compétences requises
              </Typography>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                  Compétences techniques
                </Typography>
                <Autocomplete
                  multiple
                  options={availableSkills}
                  value={jobData.skills}
                  onChange={(e, newValue) => setJobData(prev => ({ ...prev, skills: newValue }))}
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
                          backgroundColor: `${theme.palette.primary.main}20`,
                          color: theme.palette.primary.light,
                          border: `1px solid ${theme.palette.primary.main}40`,
                        }}
                      />
                    ))
                  }
                />
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                  Langues
                </Typography>
                <Autocomplete
                  multiple
                  options={languages}
                  value={jobData.languages}
                  onChange={(e, newValue) => setJobData(prev => ({ ...prev, languages: newValue }))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Sélectionner des langues..."
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

              <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                Contact et candidature
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="Email de contact"
                  type="email"
                  value={jobData.contactEmail}
                  onChange={handleInputChange('contactEmail')}
                  required
                  placeholder="recrutement@entreprise.com"
                />
                <TextField
                  label="Date limite de candidature"
                  type="date"
                  value={jobData.applicationDeadline}
                  onChange={handleInputChange('applicationDeadline')}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          )}

          {/* Étape 3: Questionnaire QCM */}
          {activeStep === 3 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Questionnaire de présélection
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
                    Créez des questions pour évaluer les candidats
                  </Typography>
                </Box>
                <Chip
                  icon={<QuizIcon />}
                  label={`${questions.length} question${questions.length > 1 ? 's' : ''}`}
                  sx={{
                    backgroundColor: `${theme.palette.primary.main}20`,
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Divider sx={{ borderColor: theme.palette.divider }} />

              {/* Formulaire de création de question */}
              <Card sx={{ backgroundColor: `${theme.palette.primary.main}05`, border: `1px solid ${theme.palette.primary.main}20` }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 3 }}>
                    {editingQuestionIndex !== null ? 'Modifier la question' : 'Nouvelle question'}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      label="Question"
                      value={currentQuestion.question}
                      onChange={handleQuestionChange('question')}
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Ex: Quelle est votre expérience avec React ?"
                    />

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel>Type de question</InputLabel>
                        <Select
                          value={currentQuestion.type}
                          label="Type de question"
                          onChange={handleQuestionChange('type')}
                        >
                          <MenuItem value="single">Choix unique</MenuItem>
                          <MenuItem value="multiple">Choix multiples</MenuItem>
                          <MenuItem value="text">Réponse libre</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        label="Points"
                        type="number"
                        value={currentQuestion.points}
                        onChange={handleQuestionChange('points')}
                        inputProps={{ min: 1, max: 10 }}
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={currentQuestion.required}
                            onChange={(e) => setCurrentQuestion(prev => ({ ...prev, required: e.target.checked }))}
                          />
                        }
                        label="Obligatoire"
                      />
                    </Box>

                    {/* Options pour QCM */}
                    {currentQuestion.type !== 'text' && (
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            Options de réponse
                          </Typography>
                          <Button
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={addOption}
                            sx={{ color: theme.palette.primary.main }}
                          >
                            Ajouter une option
                          </Button>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {currentQuestion.options.map((option, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              {currentQuestion.type === 'single' ? (
                                <Radio
                                  checked={currentQuestion.correctAnswer.includes(index)}
                                  onChange={() => handleCorrectAnswerChange(index)}
                                  sx={{
                                    color: theme.palette.text.secondary,
                                    '&.Mui-checked': {
                                      color: theme.palette.success.main,
                                    },
                                  }}
                                />
                              ) : (
                                <FormControlLabel
                                  control={
                                    <input
                                      type="checkbox"
                                      checked={currentQuestion.correctAnswer.includes(index)}
                                      onChange={() => handleCorrectAnswerChange(index)}
                                      style={{
                                        width: 20,
                                        height: 20,
                                        cursor: 'pointer',
                                        accentColor: theme.palette.success.main,
                                      }}
                                    />
                                  }
                                  label=""
                                  sx={{ m: 0 }}
                                />
                              )}
                              <TextField
                                value={option}
                                onChange={handleOptionChange(index)}
                                placeholder={`Option ${index + 1}`}
                                size="small"
                                fullWidth
                              />
                              {currentQuestion.options.length > 2 && (
                                <IconButton size="small" onClick={() => removeOption(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </Box>
                          ))}
                        </Box>

                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 1, display: 'block' }}>
                          {currentQuestion.type === 'single' 
                            ? '✓ Sélectionnez la bonne réponse' 
                            : '✓ Sélectionnez les bonnes réponses (plusieurs possibles)'}
                        </Typography>
                      </Box>
                    )}

                    {/* Boutons d'action */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      {editingQuestionIndex !== null && (
                        <Button
                          variant="outlined"
                          onClick={cancelEdit}
                          sx={{
                            borderColor: theme.palette.text.secondary,
                            color: theme.palette.text.secondary,
                          }}
                        >
                          Annuler
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        startIcon={editingQuestionIndex !== null ? <CheckIcon /> : <AddIcon />}
                        onClick={saveQuestion}
                        disabled={!currentQuestion.question.trim()}
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        }}
                      >
                        {editingQuestionIndex !== null ? 'Enregistrer' : 'Ajouter la question'}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Liste des questions créées */}
              {questions.length > 0 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                    Questions ajoutées ({questions.length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {questions.map((q, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 3,
                          border: `1px solid ${theme.palette.divider}`,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: `0 4px 20px ${theme.palette.primary.main}20`,
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Chip
                                label={`Q${index + 1}`}
                                size="small"
                                sx={{
                                  backgroundColor: `${theme.palette.primary.main}30`,
                                  color: theme.palette.primary.main,
                                  fontWeight: 700,
                                }}
                              />
                              <Chip
                                label={q.type === 'single' ? 'Choix unique' : q.type === 'multiple' ? 'Choix multiples' : 'Texte libre'}
                                size="small"
                                sx={{
                                  backgroundColor: `${theme.palette.secondary.main}20`,
                                  color: theme.palette.secondary.main,
                                }}
                              />
                              <Chip
                                label={`${q.points} pt${q.points > 1 ? 's' : ''}`}
                                size="small"
                                sx={{
                                  backgroundColor: `${theme.palette.warning.main}20`,
                                  color: theme.palette.warning.main,
                                }}
                              />
                              {q.required && (
                                <Chip
                                  label="Obligatoire"
                                  size="small"
                                  sx={{
                                    backgroundColor: `${theme.palette.error.main}20`,
                                    color: theme.palette.error.main,
                                  }}
                                />
                              )}
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
                              {q.question}
                            </Typography>
                            
                            {q.type !== 'text' && (
                              <Box sx={{ pl: 2 }}>
                                {q.options.filter(o => o.trim()).map((option, optIndex) => (
                                  <Box key={optIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    {q.correctAnswer.includes(optIndex) ? (
                                      <CheckIcon />
                                    ) : (
                                      <Box sx={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${theme.palette.divider}` }} />
                                    )}
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: q.correctAnswer.includes(optIndex) ? theme.palette.success.main : theme.palette.text.secondary,
                                        fontWeight: q.correctAnswer.includes(optIndex) ? 600 : 400,
                                      }}
                                    >
                                      {option}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => editQuestion(index)}
                              sx={{
                                color: theme.palette.primary.main,
                                '&:hover': {
                                  backgroundColor: `${theme.palette.primary.main}10`,
                                },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => deleteQuestion(index)}
                              sx={{
                                color: theme.palette.error.main,
                                '&:hover': {
                                  backgroundColor: `${theme.palette.error.main}10`,
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </Box>
              )}

              {questions.length === 0 && (
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: `${theme.palette.background.paper}`,
                    border: `1px dashed ${theme.palette.divider}`,
                  }}
                >
                  <QuizIcon />
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mt: 2 }}>
                    Aucune question n'a encore été ajoutée
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.disabled, mt: 1 }}>
                    Commencez par créer votre première question ci-dessus
                  </Typography>
                </Paper>
              )}
            </Box>
          )}

          {/* Boutons de navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: `${theme.palette.text.secondary}10`,
                },
              }}
            >
              Précédent
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                    minWidth: 160,
                    boxShadow: `0 4px 20px ${theme.palette.success.main}40`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
                      boxShadow: `0 6px 24px ${theme.palette.success.main}50`,
                    },
                  }}
                >
                  Publier l'annonce
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    minWidth: 120,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  }}
                >
                  Suivant
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Récapitulatif des données (pour debug) */}
      {showSuccess && (
        <Card sx={{ mt: 3, backgroundColor: `${theme.palette.success.main}05`, border: `1px solid ${theme.palette.success.main}30` }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
              Récapitulatif de l'annonce
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Poste</Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                  {jobData.title || 'Non renseigné'}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Entreprise</Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                  {jobData.company || 'Non renseignée'}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Compétences requises</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {jobData.skills.length > 0 ? (
                    jobData.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: `${theme.palette.primary.main}20`,
                          color: theme.palette.primary.light,
                        }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ color: theme.palette.text.disabled }}>
                      Aucune compétence ajoutée
                    </Typography>
                  )}
                </Box>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Questionnaire</Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                  {questions.length} question{questions.length > 1 ? 's' : ''} • Total: {questions.reduce((acc, q) => acc + q.points, 0)} points
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Announcement;