import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Fade,
  Chip,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ProfilEmploye = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [employe, setEmploye] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const id = user?.id || 1;
    import("../api/api").then(({ default: api }) => {
      api.get(`/employers/${id}`)
        .then(res => setEmploye(res.data))
        .catch(() => setEmploye(null));
    });
  }, []);

  const goEdit = () => navigate("/Modifier-Profil-Employe");
  const goDocuments = () => navigate("/MesDocuments");
  const goAbsences = () => navigate("/Absences-Employe");
  const goPerformance = () => navigate("/Performance-Employe");
  const goLogout = () => navigate("/logout");
  const goTableaudebord = () => navigate("/tableaudebordEmploye");
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* --- Sidebar --- */}
      <Box
        sx={{
          width: 240,
          bgcolor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          py: 3,
        }}
      >
        <List>
          <ListItem button onClick={goDocuments}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Mes documents" />
          </ListItem>

          <ListItem button onClick={goAbsences}>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Absences & Congés" />
          </ListItem>

          <ListItem button onClick={goPerformance}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Performance" />
          </ListItem>

          <Divider sx={{ my: 2 }} />

          <ListItem button onClick={goLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItem>
        </List>
      </Box>

      {/* --- MAIN CONTENT --- */}
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          display: "flex",
          justifyContent: "center",
          background: theme.palette.background.default,
        }}
      >
        <Fade in timeout={600}>
          <Card
            sx={{
              width: "100%",
              maxWidth: 950,
              p: 3,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
              boxShadow: "0px 8px 25px rgba(0,0,0,0.08)",
              backdropFilter: "blur(18px)",
            }}
          >
            <CardContent sx={{ px: 4, py: 5 }}>
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={employe?.photo || "https://randomuser.me/api/portraits/men/32.jpg"}
                  sx={{
                    width: 140,
                    height: 140,
                    boxShadow: "0px 5px 25px rgba(0,0,0,0.15)",
                    mb: 2,
                  }}
                />

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {employe?.prenom || "-"} {employe?.nom || ""}
                </Typography>

                <Typography sx={{ color: theme.palette.text.secondary }}>
                  {employe?.poste || "-"} — {employe?.departement || "-"}
                </Typography>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Infos personnelles */}
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Informations personnelles
              </Typography>

              <List>
                {[
                  { icon: <EmailIcon />, text: employe?.email || "-" },
                  { icon: <PhoneIcon />, text: employe?.numero || "-" },
                  { icon: <LocationOnIcon />, text: employe?.adresse || "-" },
                  { icon: <CalendarTodayIcon />, text: employe?.date_naissance || "-" },
                ].map((item, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 4 }} />

              {/* Informations RH */}
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Informations RH
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <BadgeIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Matricule : ${employe?.matricule || "-"}`} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Contrat : ${employe?.type_contrat || "-"}`} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CalendarTodayIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Date d'embauche : ${employe?.date_embauche || "-"}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Salaire : ${employe?.salaire || "-"}`} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Manager : ${employe?.manager || "-"}`}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 4 }} />

              {/* Compétences */}
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Compétences
              </Typography>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {(employe?.competences || ["-"]).map((c, i) => (
                  <Chip
                    key={i}
                    label={c}
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Description */}
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                À propos
              </Typography>
                <Typography sx={{ color: theme.palette.text.secondary }}>
                {employe?.description || "-"}
              </Typography>

              <Divider sx={{ my: 4 }} />

              {/* Boutons */}
              <Box
                sx={{
                  textAlign: "center",
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  onClick={goEdit}
                  variant="outlined"
                  sx={{ px: 4, py: 1.2, borderRadius: 2, fontWeight: 600 }}
                >
                  Modifier le profil
                </Button>

                <Button
                  onClick={goDocuments}
                  sx={{
                    px: 4,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: "#fff",
                  }}
                >
                  Voir mes documents
                </Button>

                 <Button
                  onClick={goTableaudebord}
                  sx={{
                    px: 4,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: "#fff",
                  }}
                >
                  Tableau de bord
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </Box>
  );
};

export default ProfilEmploye;
