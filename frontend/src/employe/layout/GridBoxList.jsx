import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  useTheme,
} from "@mui/material";
import { Person2, Star, StarBorder } from "@mui/icons-material";

// Icônes SVG personnalisées
const MoreVertIcon = ({ sx }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={sx}
  >
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const StarIcon = ({ sx }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={sx}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const VisibilityIcon = ({ sx }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={sx}
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const GridBoxList = ({
  items = [],
  onItemClick = () => {},
  onItemEdit = () => {},
  onItemDelete = () => {},
  onItemToggleFavorite = () => {},
  showActions = true,
  showAvatar = true,
  showChips = true,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuOpen = (event, item) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleAction = (action) => {
    if (selectedItem) {
      switch (action) {
        case "edit":
          onItemEdit(selectedItem);
          break;
        case "delete":
          onItemDelete(selectedItem);
          break;
        case "favorite":
          onItemToggleFavorite(selectedItem);
          break;
        default:
          break;
      }
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        {items.map((item, index) => (
          <Fade in={true} key={item.id || index} timeout={300 + index * 50}>
            <Card
              sx={{
                aspectRatio: "1/1", // Force le ratio carré
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                transform: "translateY(0)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: `0 16px 48px rgba(126, 87, 194, 0.25)`,
                  borderColor: theme.palette.primary.main,
                  borderWidth: 2,
                  borderStyle: "solid",
                },
              }}
              onClick={() => onItemClick(item)}
            >
              <CardContent
                sx={{
                  p: 2.5,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                {/* Header avec menu actions */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 2,
                  }}
                >
                  {showActions && (
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, item)}
                      sx={{
                        backgroundColor: `${theme.palette.background.paper}90`,
                        backdropFilter: "blur(8px)",
                        color: theme.palette.text.secondary,
                        width: 32,
                        height: 32,
                        "&:hover": {
                          backgroundColor: `${theme.palette.primary.main}20`,
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </Box>

                {/* Section centrale avec avatar et titre */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    flex: 1,
                    justifyContent: "center",
                    py: 2,
                  }}
                >
                  {showAvatar && (
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        mb: 2,
                        boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                      }}
                      src={item.avatar}
                    >
                      {item.title?.charAt(0).toUpperCase() || "?"}
                    </Avatar>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        lineHeight: 1.2,
                        fontSize: "1.1rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Typography>
                    {item.isFavorite && (
                      <StarIcon
                        sx={{
                          color: theme.palette.warning.main,
                          position: "absolute",
                          top: 12,
                          left: 12,
                        }}
                      />
                    )}
                  </Box>

                  {item.subtitle && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.85rem",
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textAlign: "center",
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                  )}

                  {item.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.8rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.3,
                        textAlign: "center",
                        px: 1,
                      }}
                    >
                      {item.description}
                    </Typography>
                  )}
                </Box>

                {/* Footer avec tags et métadonnées */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    alignItems: "center",
                  }}
                >
                  {/* Tags */}
                  {showChips && item.tags && item.tags.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        maxWidth: "100%",
                      }}
                    >
                      {item.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: `${theme.palette.primary.main}20`,
                            color: theme.palette.primary.light,
                            border: `1px solid ${theme.palette.primary.main}30`,
                            fontSize: "0.65rem",
                            height: 20,
                            "&:hover": {
                              backgroundColor: `${theme.palette.primary.main}30`,
                            },
                          }}
                        />
                      ))}
                      {item.tags.length > 2 && (
                        <Chip
                          label={`+${item.tags.length - 2}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.65rem",
                            height: 20,
                            color: theme.palette.text.secondary,
                            borderColor: theme.palette.text.secondary,
                          }}
                        />
                      )}
                    </Box>
                  )}

                  {/* Métadonnées */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      minHeight: 20,
                    }}
                  >
                    {item.date && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.disabled,
                          fontSize: "0.65rem",
                        }}
                      >
                        {item.date}
                      </Typography>
                    )}

                    <Box sx={{ ml: "auto" }}>
                      {item.status && (
                        <Chip
                          label={item.status}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.6rem",
                            height: 18,
                            color:
                              item.status === "Active"
                                ? theme.palette.success.main
                                : item.status === "En cours"
                                ? theme.palette.warning.main
                                : theme.palette.text.secondary,
                            borderColor:
                              item.status === "Active"
                                ? theme.palette.success.main
                                : item.status === "En cours"
                                ? theme.palette.warning.main
                                : theme.palette.text.secondary,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        ))}
      </Box>

      {/* Menu contextuel */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <MenuItem onClick={() => handleAction("edit")}>
          <Person2 sx={{ mr: 2 }} />
          Voir le profil
        </MenuItem>
        <MenuItem onClick={() => handleAction("favorite")}>
          {selectedItem?.isFavorite ? (
            <StarBorder sx={{ mr: 2 }} />
          ) : (
            <Star sx={{ mr: 2 }} />
          )}
          {selectedItem?.isFavorite
            ? "Retirer des favoris"
            : "Ajouter aux favoris"}
        </MenuItem>
      </Menu>

      {/* État vide */}
      {items.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
          }}
        >
          <VisibilityIcon
            sx={{
              fontSize: "3rem",
              color: theme.palette.text.disabled,
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
            }}
          >
            Aucun élément à afficher
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.disabled,
            }}
          >
            La liste est actuellement vide
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default GridBoxList;
