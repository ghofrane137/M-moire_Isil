import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchPageEtudiant.css";
import Logo from "../../../assets/Logo.png";
import ProfilePic from "../../../assets/profil1.png";
import PDFViewer from "../../PDFViewer"; // Importez votre composant PDFViewer

const SearchPageEtudiant = () => {
  const [query, setQuery] = useState("");
  const [universities, setUniversities] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [modules, setModules] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedSpecialite, setSelectedSpecialite] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [anneeMin, setAnneeMin] = useState("");
  const [anneeMax, setAnneeMax] = useState("");
  const [typeRessource, setTypeRessource] = useState("");
  const [langue, setLangue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ressources");
  const [corrigeDisponible, setCorrigeDisponible] = useState(false);
  const [nombrePages, setNombrePages] = useState("");
  const [niveauDifficulte, setNiveauDifficulte] = useState("");
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState("");
  const navigate = useNavigate();

  // Fonction pour récupérer le token et gérer les erreurs de manière centralisée
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    console.log("Token JWT utilisé :", token);
    if (!token) {
      console.warn("Aucun token JWT trouvé dans localStorage");
    }
    return { Authorization: `Bearer ${token}` };
  };

  // Chargement des universités
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/etudiant/universitesE", {
        headers: getAuthHeaders(),
        withCredentials: true,
      })
      .then((response) => {
        console.log("Universités reçues :", response.data);
        setUniversities(response.data || []);
      })
      .catch((error) => {
        const status = error.response?.status;
        const message = error.response?.data || error.message;
        console.error(`Erreur lors de la récupération des universités (statut ${status}) :`, message);
        setUniversities([]);
      });
  }, []);

  // Chargement des spécialités
  useEffect(() => {
    if (selectedNiveau) {
      console.log("Récupération des spécialités pour le niveau :", selectedNiveau);
      axios
        .get(`http://localhost:8080/api/etudiant/specialites-by-niveauE?niveau=${selectedNiveau}`, {
          headers: getAuthHeaders(),
          withCredentials: true,
        })
        .then((response) => {
          console.log("Spécialités reçues :", response.data);
          setSpecialites(response.data || []);
        })
        .catch((error) => {
          const status = error.response?.status;
          const message = error.response?.data || error.message;
          console.error(`Erreur lors de la récupération des spécialités (statut ${status}) :`, message);
          setSpecialites([]);
        });
    } else {
      console.log("Aucun niveau sélectionné, réinitialisation des spécialités");
      setSpecialites([]);
    }
  }, [selectedNiveau]);

  // Chargement des modules
  useEffect(() => {
    if (selectedSpecialite) {
      console.log("Récupération des modules pour la spécialité :", selectedSpecialite);
      axios
        .get(`http://localhost:8080/api/etudiant/modulesE?specialiteId=${selectedSpecialite}`, {
          headers: getAuthHeaders(),
          withCredentials: true,
        })
        .then((response) => {
          console.log("Modules reçus :", response.data);
          setModules(response.data || []);
        })
        .catch((error) => {
          const status = error.response?.status;
          const message = error.response?.data || error.message;
          console.error(`Erreur lors de la récupération des modules (statut ${status}) :`, message);
          setModules([]);
        });
    } else {
      console.log("Aucune spécialité sélectionnée, réinitialisation des modules");
      setModules([]);
    }
  }, [selectedSpecialite]);

  // Chargement des ressources
  useEffect(() => {
    const params = {
      search: query || undefined,
      anneeMin: anneeMin ? parseInt(anneeMin) : undefined,
      anneeMax: anneeMax ? parseInt(anneeMax) : undefined,
      langue: langue || undefined,
      type: typeRessource || undefined,
      corrgDispo: corrigeDisponible || undefined,
      difficulte: niveauDifficulte || undefined,
      nombrePages: nombrePages ? parseInt(nombrePages) : undefined,
      specialiteNom: selectedSpecialite
        ? specialites.find((s) => s.id === parseInt(selectedSpecialite))?.nom
        : undefined,
      universiteNom: selectedUniversity
        ? universities.find((u) => u.id === parseInt(selectedUniversity))?.nom
        : undefined,
    };
    console.log("Paramètres envoyés pour les ressources :", params);
    axios
      .get("http://localhost:8080/api/etudiant/searchE", {
        params,
        headers: getAuthHeaders(),
        withCredentials: true,
      })
      .then((response) => {
        console.log("Ressources reçues :", response.data);
        setDocuments(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        const status = error.response?.status;
        const message = error.response?.data || error.message;
        console.error(`Erreur lors de la récupération des ressources (statut ${status}) :`, message);
        setDocuments([]);
      });
  }, [
    query,
    anneeMin,
    anneeMax,
    langue,
    typeRessource,
    selectedSpecialite,
    selectedUniversity,
    selectedNiveau,
    corrigeDisponible,
    nombrePages,
    niveauDifficulte,
  ]);

  // Chargement des profils
  useEffect(() => {
    const params = { search: query || undefined };
    console.log("Paramètres envoyés pour les profils :", params);
    axios
      .get("http://localhost:8080/api/v1/searchUser", {
        params,
        headers: getAuthHeaders(),
        withCredentials: true,
      })
      .then((response) => {
        console.log("Profils reçus :", response.data);
        setProfiles(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        const status = error.response?.status;
        const message = error.response?.data || error.message;
        console.error(`Erreur lors de la récupération des profils (statut ${status}) :`, message);
        setProfiles([]);
      });
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-page-etudiant?query=${encodeURIComponent(query)}`);
  };

  const toggleFilters = () => setIsFilterOpen(!isFilterOpen);

  // Fonction pour ouvrir le visualiseur PDF
  const openPdfViewer = (pdfUrl) => {
    if (!pdfUrl) {
      alert("Aucun fichier PDF disponible pour ce document.");
      return;
    }
    setSelectedPdfUrl(pdfUrl);
    setShowPdfViewer(true);
  };

  // Fonction pour fermer le visualiseur PDF
  const closePdfViewer = () => {
    setShowPdfViewer(false);
    setSelectedPdfUrl("");
  };

  // Fonction pour déterminer la couleur du type de ressource
  const getTypeColor = (type) => {
    switch (type) {
      case "COURS":
        return "bg-cours text-white";
      case "TD":
        return "bg-td text-white";
      case "TP":
        return "bg-tp text-white";
      case "EXAMEN":
        return "bg-examen text-white";
      default:
        return "bg-default text-white";
    }
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3">
        <a className="navbar-brand fw-bold" href="#">
          <img className="logo" src={Logo} alt="logo" />
        </a>
        <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-1 rounded-pill"
            placeholder="Rechercher par module, uploader, titre, ou nom d'utilisateur..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <button className="btn btn-outline-secondary rounded-pill" onClick={toggleFilters}>
          ☰ Filtres
        </button>
      </nav>

      <div className={`offcanvas offcanvas-end ${isFilterOpen ? "show" : ""}`} tabIndex="-1" id="filters" style={{ visibility: isFilterOpen ? "visible" : "hidden" }}>
        <div className="offcanvas-header">
          <h5>Filtres</h5>
          <button type="button" className="btn-close" onClick={() => setIsFilterOpen(false)}></button>
        </div>
        <div className="offcanvas-body">
          <h6>Université</h6>
          <select className="form-select mb-3" value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)}>
            <option value="">Toutes</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.nom}
              </option>
            ))}
          </select>

          <h6>Niveau</h6>
          <select className="form-select mb-3" value={selectedNiveau} onChange={(e) => setSelectedNiveau(e.target.value)}>
            <option value="">Tous</option>
            {["L1", "L2", "L3", "M1", "M2", "DOCTORAT"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <h6>Spécialité</h6>
          <select
            className="form-select mb-3"
            value={selectedSpecialite}
            onChange={(e) => setSelectedSpecialite(e.target.value)}
            disabled={!selectedNiveau}
          >
            <option value="">Toutes</option>
            {specialites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nom}
              </option>
            ))}
          </select>

          <h6>Année Min</h6>
          <input
            type="number"
            className="form-control mb-3"
            value={anneeMin}
            onChange={(e) => setAnneeMin(e.target.value)}
            placeholder="Année minimale"
          />

          <h6>Année Max</h6>
          <input
            type="number"
            className="form-control mb-3"
            value={anneeMax}
            onChange={(e) => setAnneeMax(e.target.value)}
            placeholder="Année maximale"
          />

          <h6>Type de Ressource</h6>
          <select className="form-select mb-3" value={typeRessource} onChange={(e) => setTypeRessource(e.target.value)}>
            <option value="">Tous</option>
            <option value="COURS">Cours</option>
            <option value="TD">TD</option>
            <option value="TP">TP</option>
            <option value="EXAMEN">Examen</option>
          </select>

          {(typeRessource === "TD" || typeRessource === "TP" || typeRessource === "EXAMEN") && (
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="corrigeDisponible"
                checked={corrigeDisponible}
                onChange={(e) => setCorrigeDisponible(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="corrigeDisponible">
                Corrigé disponible
              </label>
            </div>
          )}

          {typeRessource === "COURS" && (
            <div className="mb-3">
              <h6>Nombre de pages</h6>
              <input
                type="number"
                className="form-control"
                value={nombrePages}
                onChange={(e) => setNombrePages(e.target.value)}
                placeholder="Nombre de pages"
                min="1"
              />
            </div>
          )}

          {typeRessource === "TD" && (
            <div className="mb-3">
              <h6>Niveau de difficulté</h6>
              <select className="form-select" value={niveauDifficulte} onChange={(e) => setNiveauDifficulte(e.target.value)}>
                <option value="">Tous</option>
                <option value="FACILE">Facile</option>
                <option value="MOYENNE">Moyenne</option>
                <option value="DIFFICILE">Difficile</option>
              </select>
            </div>
          )}

          <h6>Langue</h6>
          <select className="form-select mb-3" value={langue} onChange={(e) => setLangue(e.target.value)}>
            <option value="">Toutes</option>
            <option value="FRENCH">Français</option>
            <option value="ENGLISH">Anglais</option>
            <option value="ARABIC">Arabe</option>
          </select>
        </div>
      </div>
      {isFilterOpen && (
        <div className="offcanvas-backdrop fade show" onClick={() => setIsFilterOpen(false)} style={{ zIndex: 1040 }} />
      )}

      {/* Contenu principal */}
      <div className="container mt-4">
        <div className="tabs mb-3">
          <button
            className={`btn custom-btn ${activeTab === "ressources" ? "active" : ""} me-2`}
            onClick={() => setActiveTab("ressources")}
          >
            Ressources
          </button>
          <button
            className={`btn custom-btn ${activeTab === "profils" ? "active" : ""}`}
            onClick={() => setActiveTab("profils")}
          >
            Profils
          </button>
        </div>

        <div className="row row-cols-2 row-cols-md-4 g-3">
          {activeTab === "ressources" && documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="col">
                <div
                  className="card instagram-card shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => openPdfViewer(doc.url)} // Utiliser doc.url au lieu de doc.fichierUrl
                >
                  <div className="card-body p-2">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="card-title text-truncate mb-0" style={{ fontSize: "1rem" }}>
                        {doc.titre || "Sans titre"}
                      </h6>
                      <div>
                        <span
                          className={`badge ${getTypeColor(doc.type)} me-1`} // Utiliser doc.type au lieu de doc.typeRessource
                          style={{ fontSize: "0.75rem" }}
                        >
                          {doc.type || "Inconnu"}
                        </span>
                        {doc.corrgDispo && ( // Utiliser doc.corrgDispo au lieu de doc.CorrgDispo
                          <span
                            className="badge bg-solution text-white"
                            style={{ fontSize: "0.75rem" }}
                          >
                            Solution disponible
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="card-text small text-muted mb-1">
                      {doc.description || "Aucune description disponible"}
                    </p>
                    <p className="card-text small text-muted">{doc.uploaderNom || "Inconnu"}</p>
                  </div>
                </div>
              </div>
            ))
          ) : activeTab === "ressources" ? (
            <p className="text-center w-100">Aucune ressource trouvée.</p>
          ) : null}

          {activeTab === "profils" && profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <div key={index} className="col">
                <div className="card instagram-card shadow-sm">
                  <img src={ProfilePic} alt="Profile" className="card-img-top" />
                  <div className="card-body p-2">
                    <h6 className="card-title text-truncate">
                      {profile.nom} {profile.prenom}
                    </h6>
                    <p className="card-text small text-muted">{profile.universite || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))
          ) : activeTab === "profils" ? (
            <p className="text-center w-100">Aucun profil trouvé.</p>
          ) : null}
        </div>
      </div>

      {/* Visualiseur PDF avec PDFViewer.jsx */}
      {showPdfViewer && (
        <PDFViewer fileUrl={selectedPdfUrl} onClose={closePdfViewer} />
      )}
    </div>
  );
};

export default SearchPageEtudiant;