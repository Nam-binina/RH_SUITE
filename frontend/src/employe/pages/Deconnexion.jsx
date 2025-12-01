import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Deconnexion = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer session
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Mettre à jour l'état parent
    if (onLogout) onLogout();

    // Redirection
    setTimeout(() => {
      navigate("/loginEmploye", { replace: true });
    }, 500);
  }, [navigate, onLogout]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h2>Déconnexion en cours...</h2>
      <p>Merci d’avoir utilisé la plateforme.</p>
    </div>
  );
};

export default Deconnexion;
