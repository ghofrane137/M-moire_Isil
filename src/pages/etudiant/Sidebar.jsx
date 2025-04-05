import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LibraryMenu from "./LibraryMenu";
import profil1 from "../../assets/profil1.png";
import profil2 from "../../assets/profil2.png";
import profil3 from "../../assets/profil3.png";
import profil4 from "../../assets/profil4.png";
import profil5 from "../../assets/profil5.png";
import house from "../../assets/house.png";
import exam from "../../assets/exam.png";
import Recomended from "../../assets/Recomended.png";
import Rate_Us from "../../assets/Rate_Us.png";
import Ressource from "../../assets/Ressource.png";
import settings from "../../assets/settings.png";
import libraryIcon from "../../assets/library.png";

const avatarMap = {
  profil1: profil1,
  profil2: profil2,
  profil3: profil3,
  profil4: profil4,
  profil5: profil5,
};

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    avatar: null,
    universite: "Non spécifié",
    filiere: "Non spécifié",
    specialite: "Non spécifié",
    niveau: "Non spécifié",
    filiereId: null,
  });
  const [uploadData, setUploadData] = useState({
    titre: "",
    description: "",
    semestre: "",
    annee: "",
    langue: "",
    typeRessource: "",
    moduleId: "",
    universiteId: "",
    specialiteId: "",
    publicStatus: false,
    corrgDispo: false,
    difficulte: "",
    nbrPages: "",
    niveau: "",
  });
  const [libraryData, setLibraryData] = useState({
    nom: "",
    statut: "PRIVE",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [universites, setUniversites] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [modules, setModules] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 1;

  useEffect(() => {
    const fetchUserDataAndLibraries = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const userResponse = await axios.get("http://localhost:8080/api/v1/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { nom, prenom, avatar, universite, filiere, specialite, niveau, filiereId } = userResponse.data || {};
        setUserData({
          nom: nom || "Utilisateur",
          prenom: prenom || "",
          avatar: avatar || null,
          universite: universite || "Non spécifié",
          filiere: filiere || "Non spécifié",
          specialite: specialite || "Non spécifié",
          niveau: niveau || "Non spécifié",
          filiereId: filiereId || null,
        });

        const universitesResponse = await axios.get("http://localhost:8080/api/etudiant/universitesE", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUniversites(universitesResponse.data || []);

        const librariesResponse = await axios.get("http://localhost:8080/api/bibliotheques/current-user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedLibraries = (librariesResponse.data || []).map((lib) => ({
          id: lib.id,
          name: lib.nom || "Unnamed Library",
          resources: (lib.ressources || []).map((res) => res.titre || "Unnamed Resource"),
          statut: lib.statut || "PRIVE",
        }));
        setLibraries(formattedLibraries);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data: " + (err.response?.data?.message || err.message));
        setLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDataAndLibraries();
  }, []);

  useEffect(() => {
    const fetchSpecialites = async () => {
      if (!uploadData.niveau) {
        setSpecialites([]);
        setModules([]);
        setUploadData((prev) => ({ ...prev, specialiteId: "", moduleId: "" }));
        return;
      }

      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const specialitesResponse = await axios.get(
          `http://localhost:8080/api/etudiant/specialites-by-niveauE?niveau=${uploadData.niveau}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSpecialites(specialitesResponse.data || []);
        setError(null);
      } catch (err) {
        setError("Erreur lors de la récupération des spécialités: " + (err.response?.data?.message || err.message));
        setSpecialites([]);
        setModules([]);
        setUploadData((prev) => ({ ...prev, specialiteId: "", moduleId: "" }));
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpecialites();
  }, [uploadData.niveau]);

  useEffect(() => {
    const fetchModules = async () => {
      if (!uploadData.specialiteId) {
        setModules([]);
        return;
      }

      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const modulesResponse = await axios.get(
          `http://localhost:8080/api/etudiant/modulesE?specialiteId=${uploadData.specialiteId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setModules(modulesResponse.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch modules: " + (err.response?.data?.message || err.message));
        setModules([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModules();
  }, [uploadData.specialiteId]);

  const getAvatarSrc = (avatar) => {
    if (!avatar) return profil1;
    if (avatarMap[avatar]) return avatarMap[avatar];
    if (avatar.startsWith("http")) return avatar;
    return profil1;
  };

  const handleUploadClick = () => setShowUploadModal(true);

  const handleLibraryClick = () => setShowLibraryModal(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "annee" && value) {
      const yearValue = parseInt(value, 10);
      if (yearValue > maxYear) {
        setError(`L'année ne peut pas dépasser ${maxYear}.`);
        return;
      }
    }
    setError(null);
    setUploadData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "universiteId" && { specialiteId: "", moduleId: "" }),
      ...(name === "niveau" && { specialiteId: "", moduleId: "" }),
      ...(name === "specialiteId" && { moduleId: "" }),
    }));
  };

  const handleLibraryInputChange = (e) => {
    const { name, value } = e.target;
    setLibraryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !file) {
      setError("Token ou fichier manquant");
      return;
    }

    if (uploadData.annee && parseInt(uploadData.annee, 10) > maxYear) {
      setError(`L'année ne peut pas dépasser ${maxYear}.`);
      return;
    }

    const filteredUploadData = { ...uploadData, filiereId: userData.filiereId };
    if (uploadData.typeRessource !== "TD") {
      delete filteredUploadData.difficulte;
    }

    const formData = new FormData();
    formData.append("uploadRequest", new Blob([JSON.stringify(filteredUploadData)], { type: "application/json" }));
    formData.append("file", file);

    try {
      setIsLoading(true);
      await axios.post("http://localhost:8080/api/v1/ressources/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setShowUploadModal(false);
      setUploadData({
        titre: "",
        description: "",
        semestre: "",
        annee: "",
        langue: "",
        typeRessource: "",
        moduleId: "",
        universiteId: "",
        specialiteId: "",
        publicStatus: false,
        corrgDispo: false,
        difficulte: "",
        nbrPages: "",
        niveau: "",
      });
      setFile(null);
      setError(null);
    } catch (error) {
      setError("Erreur lors de l'upload: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLibrary = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/bibliotheques/bibliotheques",
        libraryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLibraries((prev) => [
        ...prev,
        {
          id: response.data.id,
          name: response.data.nom || "Unnamed Library",
          resources: (response.data.ressources || []).map((res) => res.titre || "Unnamed Resource"),
          statut: response.data.statut || "PRIVE",
        },
      ]);
      setShowLibraryModal(false);
      setLibraryData({ nom: "", statut: "PRIVE" });
      setError(null);
    } catch (err) {
      setError("Erreur lors de la création de la bibliothèque: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const showCorrgDispo = ["TD", "TP", "EXAMEN"].includes(uploadData.typeRessource);
  const showNbrPages = uploadData.typeRessource === "COURS";
  const showDifficulte = uploadData.typeRessource === "TD";

  return (
    <div
      className={`sidebar d-flex flex-column flex-shrink-0 p-3 ${darkMode ? "dark-mode" : "light-mode"} ${
        isOpen ? "" : "collapsed"
      }`}
      style={{ width: isOpen ? "280px" : "80px", transition: "width 0.3s ease" }}
    >
      {isLoading && <div className="text-center">Chargement...</div>}
      <button className="btn btn-light mb-3" onClick={() => setIsOpen(!isOpen)} style={{ alignSelf: "flex-end" }}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="d-flex flex-column align-items-center text-dark text-center p-4">
        {isOpen && (
          loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : (
            <div className="d-flex align-items-center w-100 position-relative">
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  backgroundColor: "#c2a3ff",
                  borderRadius: "30% 50% 40% 60%",
                  position: "absolute",
                  left: "-10px",
                  top: "-10px",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid white",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <img
                  src={getAvatarSrc(userData.avatar)}
                  alt="Profile"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) => (e.target.src = profil1)}
                />
              </div>
              <div className="text-start ms-4">
                <h5 className="fw-bold mb-1" style={{ fontSize: "17px", color: "#333" }}>
                  {userData.prenom} {userData.nom}
                </h5>
                <p className="text-muted small mb-0" style={{ fontSize: "14px" }}>
                  <i className="bi bi-mortarboard-fill me-1" style={{ color: "#6c5ce7" }} />
                  {userData.universite}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <hr />

      <ul className="nav nav-pills flex-column mb-2">
        {[
          { src: house, label: "Home" },
          { src: exam, label: "Search", onClick: () => navigate("/search-page-etudiant") },
          { src: Recomended, label: "Recommended" },
          { src: Rate_Us, label: "Rate Us" },
          { src: Ressource, label: "Upload Resource", onClick: handleUploadClick },
          { src: libraryIcon, label: "Create Library", onClick: handleLibraryClick },
          { src: settings, label: "Settings" },
        ].map((item, index) => (
          <li key={index} className="nav-item">
            <a
              href="#"
              className="nav-link text-dark d-flex align-items-center sidebar-link"
              onClick={(e) => {
                e.preventDefault();
                if (item.onClick) item.onClick();
              }}
            >
              <img src={item.src} alt={item.label} width="30" height="30" className="me-3" />
              {isOpen && item.label}
            </a>
          </li>
        ))}
        <li className="nav-item">
          <LibraryMenu isOpen={isOpen} libraries={libraries} setLibraries={setLibraries} />
        </li>
      </ul>

      {showLibraryModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 style={{ color: "#6f5de7", fontWeight: "600" }}>Créer une bibliothèque</h3>
              <button
                onClick={() => setShowLibraryModal(false)}
                className="btn-close"
                style={{ fontSize: "1.2rem" }}
              />
            </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleCreateLibrary}>
              <div className="mb-3">
                <label className="form-label">Nom de la bibliothèque *</label>
                <input
                  type="text"
                  name="nom"
                  value={libraryData.nom}
                  onChange={handleLibraryInputChange}
                  className="form-control"
                  style={{ borderRadius: "8px", borderColor: "#ddd" }}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Statut *</label>
                <select
                  name="statut"
                  value={libraryData.statut}
                  onChange={handleLibraryInputChange}
                  className="form-select"
                  style={{ borderRadius: "8px", borderColor: "#ddd" }}
                  required
                >
                  <option value="PRIVE">Privé</option>
                  <option value="PUBLIC">Public</option>
                </select>
              </div>

              <div className="d-flex justify-content-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowLibraryModal(false)}
                  style={{ borderRadius: "8px", padding: "8px 20px", borderColor: "#6f5de7" }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    borderRadius: "8px",
                    padding: "8px 20px",
                    backgroundColor: "#6f5de7",
                    borderColor: "#6f5de7",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Création..." : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              width: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 style={{ color: "#6f5de7", fontWeight: "600" }}>Upload Resource</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="btn-close"
                style={{ fontSize: "1.2rem" }}
              />
            </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Titre *</label>
                    <input
                      type="text"
                      name="titre"
                      value={uploadData.titre}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={uploadData.description}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="3"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Fichier *</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.png,.ppt,.pptx"
                      className="form-control"
                      style={{ borderRadius: "8px", borderColor: "#ddd", padding: "10px" }}
                      required
                    />
                    {file && (
                      <div className="mt-2 text-muted" style={{ fontSize: "0.9rem" }}>
                        Fichier sélectionné: {file.name}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Type de ressource</label>
                    <select
                      name="typeRessource"
                      value={uploadData.typeRessource}
                      onChange={handleInputChange}
                      className="form-select"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="COURS">Cours</option>
                      <option value="TD">TD</option>
                      <option value="TP">TP</option>
                      <option value="EXAMEN">Examen</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Filière</label>
                    <input
                      type="text"
                      value={userData.filiere}
                      className="form-control"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Université *</label>
                    <select
                      name="universiteId"
                      value={uploadData.universiteId}
                      onChange={handleInputChange}
                      className="form-select"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      required
                    >
                      <option value="">Sélectionner...</option>
                      {universites.map((uni) => (
                        <option key={uni.id} value={uni.id}>
                          {uni.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Niveau *</label>
                    <select
                      name="niveau"
                      value={uploadData.niveau}
                      onChange={handleInputChange}
                      className="form-select"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      disabled={!uploadData.universiteId}
                      required
                    >
                      <option value="">Sélectionner...</option>
                      <option value="L1">L1</option>
                      <option value="L2">L2</option>
                      <option value="L3">L3</option>
                      <option value="M1">M1</option>
                      <option value="M2">M2</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Spécialité *</label>
                    <select
                      name="specialiteId"
                      value={uploadData.specialiteId}
                      onChange={handleInputChange}
                      className="form-select"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      disabled={!uploadData.niveau || specialites.length === 0}
                      required
                    >
                      <option value="">Sélectionner...</option>
                      {specialites.map((spec) => (
                        <option key={spec.id} value={spec.id}>
                          {spec.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Module</label>
                    <select
                      name="moduleId"
                      value={uploadData.moduleId}
                      onChange={handleInputChange}
                      className="form-select"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      disabled={!uploadData.specialiteId || modules.length === 0}
                    >
                      <option value="">Sélectionner...</option>
                      {modules.map((mod) => (
                        <option key={mod.id} value={mod.id}>
                          {mod.nomModule || mod.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Semestre</label>
                      <select
                        name="semestre"
                        value={uploadData.semestre}
                        onChange={handleInputChange}
                        className="form-select"
                        style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>

                    <div className="col-6 mb-3">
                      <label className="form-label">Année</label>
                      <input
                        type="number"
                        name="annee"
                        value={uploadData.annee}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{ borderRadius: "8px", borderColor: "#ddd" }}
                        min="2000"
                        max={maxYear}
                        placeholder={`Max ${maxYear}`}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Langue</label>
                    <select
                      name="langue"
                      value={uploadData.langue}
                      onChange={handleInputChange}
                      className="form-select"
                      style={{ borderRadius: "8px", borderColor: "#ddd" }}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="FRENCH">Français</option>
                      <option value="ENGLISH">Anglais</option>
                      <option value="ARABIC">Arabe</option>
                    </select>
                  </div>

                  {showDifficulte && (
                    <div className="mb-3">
                      <label className="form-label">Difficulté</label>
                      <select
                        name="difficulte"
                        value={uploadData.difficulte}
                        onChange={handleInputChange}
                        className="form-select"
                        style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="FACILE">Facile</option>
                        <option value="MOYEN">Moyen</option>
                        <option value="DIFFICILE">Difficile</option>
                      </select>
                    </div>
                  )}

                  {showNbrPages && (
                    <div className="mb-3">
                      <label className="form-label">Nombre de pages</label>
                      <input
                        type="number"
                        name="nbrPages"
                        value={uploadData.nbrPages}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{ borderRadius: "8px", borderColor: "#ddd" }}
                        min="1"
                      />
                    </div>
                  )}

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      name="publicStatus"
                      checked={uploadData.publicStatus}
                      onChange={handleInputChange}
                      className="form-check-input"
                      style={{ cursor: "pointer" }}
                    />
                    <label className="form-check-label" style={{ cursor: "pointer" }}>
                      Rendre public
                    </label>
                  </div>

                  {showCorrgDispo && (
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        name="corrgDispo"
                        checked={uploadData.corrgDispo}
                        onChange={handleInputChange}
                        className="form-check-input"
                        style={{ cursor: "pointer" }}
                      />
                      <label className="form-check-label" style={{ cursor: "pointer" }}>
                        Corrigé disponible
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowUploadModal(false)}
                  style={{ borderRadius: "8px", padding: "8px 20px", borderColor: "#6f5de7" }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    borderRadius: "8px",
                    padding: "8px 20px",
                    backgroundColor: "#6f5de7",
                    borderColor: "#6f5de7",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Upload en cours..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;