import React, { useState, useEffect } from "react";
import axios from "axios";

function Title() {
  const [prenom, setPrenom] = useState("Utilisateur"); // Default value
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Aucun jeton d'authentification trouvé.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const { prenom } = response.data;
        setPrenom(prenom || "Utilisateur"); // Fallback if prenom is null
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des données utilisateur.");
        console.error("Erreur:", err.response || err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="header-container">
      <div className="header-content">
        {loading ? (
          <h1>Chargement...</h1>
        ) : error ? (
          <h1 className="text-danger">{error}</h1>
        ) : (
          <h1>Bienvenue de retour, {prenom} ! 👋</h1>
        )}
        <p>Ne laissez pas ce que vous ne pouvez pas faire entraver ce que vous pouvez accomplir.</p>
      </div>
    </div>
  );
}

export default Title;