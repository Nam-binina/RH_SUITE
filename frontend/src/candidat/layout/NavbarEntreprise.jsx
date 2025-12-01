import React, { useState } from "react";
import {
  Box,
  styled,
  alpha,
  List,
  ListItem,
  Tooltip,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Business, People, Campaign, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(135deg, ${alpha("#1a1525", 0.9)}, ${alpha(
            "#2d2740",
            0.9
          )})`
        : `linear-gradient(135deg, ${alpha("#ffffff", 0.9)}, ${alpha(
            "#f8f9fa",
            0.9
          )})`,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    color: theme.palette.mode === "dark" ? "#ffffff" : "#1a1a1a",
    fontSize: "0.875rem",
    fontWeight: 600,
    padding: "10px 16px",
    borderRadius: "12px",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
        : "0 8px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${alpha(
      theme.palette.mode === "dark" ? "#7e57c2" : "#000000",
      0.2
    )}`,
    position: "relative",
    overflow: "hidden",
    transform: "translateX(8px)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, ${alpha(
        "#7e57c2",
        0.1
      )}, transparent)`,
      borderRadius: "12px",
      pointerEvents: "none",
    },
  },
  "& .MuiTooltip-tooltip[data-popper-placement^='right']": {
    animation: "slideInRight 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "@keyframes slideInRight": {
    "0%": {
      opacity: 0,
      transform: "translateX(-8px) scale(0.9)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(8px) scale(1)",
    },
  },
}));

const ModernSidebar = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: 80,
  height: "100vh",
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(180deg, ${alpha("#0f0b16", 0.95)}, ${alpha(
          "#1a1525",
          0.95
        )})`
      : `linear-gradient(180deg, ${alpha("#ffffff", 0.95)}, ${alpha(
          "#f8f9fa",
          0.95
        )})`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRight: `1px solid ${alpha(
    theme.palette.mode === "dark" ? "#7e57c2" : "#000000",
    0.15
  )}`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "1px 0 8px rgba(126, 87, 194, 0.2), 0 0 0 1px rgba(126, 87, 194, 0.05)"
      : "1px 0 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 24,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${alpha(
      "#7e57c2",
      0.08
    )}, transparent)`,
    pointerEvents: "none",
  },
}));

const ModernIconButton = styled(ListItemButton)(({ theme, isActive }) => ({
  minHeight: 56,
  justifyContent: "center",
  padding: "12px",
  margin: "4px 8px",
  borderRadius: "16px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  background: isActive
    ? `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.25
      )}, ${alpha(theme.palette.primary.main, 0.15)})`
    : "transparent",
  border: isActive
    ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
    : `1px solid transparent`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0.15
    )}, transparent)`,
    opacity: 0,
    transition: "opacity 0.3s ease",
    borderRadius: "16px",
  },
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0.2
    )}, ${alpha(theme.palette.primary.main, 0.1)})`,
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    "&::before": {
      opacity: 1,
    },
  },
  "&:active": {
    transform: "translateY(0px) scale(0.98)",
  },
}));

const LogoutButton = styled(ListItemButton)(({ theme }) => ({
  minHeight: 56,
  justifyContent: "center",
  padding: "12px",
  margin: "4px 8px",
  borderRadius: "16px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  background: "transparent",
  border: `1px solid transparent`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${alpha(
      "#f44336",
      0.15
    )}, transparent)`,
    opacity: 0,
    transition: "opacity 0.3s ease",
    borderRadius: "16px",
  },
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha("#f44336", 0.2)}, ${alpha(
      "#f44336",
      0.1
    )})`,
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: `0 8px 25px ${alpha("#f44336", 0.4)}`,
    border: `1px solid ${alpha("#f44336", 0.2)}`,
    "&::before": {
      opacity: 1,
    },
  },
  "&:active": {
    transform: "translateY(0px) scale(0.98)",
  },
}));

const ModernIcon = styled(ListItemIcon)(({ theme, isActive }) => ({
  minWidth: 0,
  justifyContent: "center",
  color: isActive
    ? theme.palette.primary.light
    : theme.palette.mode === "dark"
    ? alpha("#ffffff", 0.7)
    : theme.palette.text.secondary,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  fontSize: "1.5rem",
  filter: isActive
    ? `drop-shadow(0 0 12px ${alpha(theme.palette.primary.main, 0.6)})`
    : "none",
  "&:hover": {
    color: theme.palette.primary.light,
    transform: "scale(1.1)",
    filter: `drop-shadow(0 0 15px ${alpha(theme.palette.primary.main, 0.8)})`,
  },
}));

const LogoutIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 0,
  justifyContent: "center",
  color:
    theme.palette.mode === "dark"
      ? alpha("#ffffff", 0.7)
      : theme.palette.text.secondary,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  fontSize: "1.5rem",
  "&:hover": {
    color: "#f44336",
    transform: "scale(1.1)",
    filter: `drop-shadow(0 0 15px ${alpha("#f44336", 0.8)})`,
  },
}));

const fadeInUpAnimation = {
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
};

export default function NavbarEntreprise({ onLogout }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("profile");

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const handleLogout = () => {
    onLogout();
    console.log("Déconnexion...");
    navigate("/");
    // Ajoutez ici votre logique de déconnexion
  };

  const menuItems = [
    {
      icon: <Business />,
      label: "Profile",
      id: "profile",
      navigate: "/profilEntreprise",
    },
    {
      icon: <People />,
      label: "List Candidate",
      id: "listCandidate",
      navigate: "/listCandidate",
    },
    {
      icon: <Campaign />,
      label: "Announcement",
      id: "announcement",
      navigate: "/announcement",
    },
  ];

  return (
    <ModernSidebar>
      <List sx={{ width: "100%", p: 0, mt: 2, flex: 1 }}>
        {menuItems.map((item, index) => (
          <Link to={item.navigate}>
            <ListItem
              key={item.id}
              disablePadding
              sx={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              <StyledTooltip
                title={item.label}
                placement="right"
                enterDelay={300}
                leaveDelay={100}
                arrow={true}
              >
                <ModernIconButton
                  onClick={() => handleItemClick(item.id)}
                  isActive={activeItem === item.id}
                  sx={fadeInUpAnimation}
                >
                  <ModernIcon isActive={activeItem === item.id}>
                    {item.icon}
                  </ModernIcon>
                </ModernIconButton>
              </StyledTooltip>
            </ListItem>
          </Link>
        ))}
      </List>

      <Box sx={{ width: "100%", pb: 3 }}>
        <ListItem disablePadding>
          <StyledTooltip
            title="Logout"
            placement="right"
            enterDelay={300}
            leaveDelay={100}
            arrow={true}
          >
            <LogoutButton onClick={handleLogout} sx={fadeInUpAnimation}>
              <LogoutIcon>
                <Logout />
              </LogoutIcon>
            </LogoutButton>
          </StyledTooltip>
        </ListItem>
      </Box>
    </ModernSidebar>
  );
}
