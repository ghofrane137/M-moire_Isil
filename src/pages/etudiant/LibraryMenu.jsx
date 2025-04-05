import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Plus, X, Trash2, Edit } from "lucide-react";
import axios from "axios";
import Library from "../../assets/Library.png";
import PDFViewer from "../PDFViewer"; // Importez le composant

const LibraryMenu = ({ isOpen, libraries, setLibraries }) => {
  const [showLibraries, setShowLibraries] = useState(false);
  const [expandedLibraries, setExpandedLibraries] = useState({});
  const [showResourcePopup, setShowResourcePopup] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [availableResources, setAvailableResources] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false); // Nouvel état
  const [pdfUrl, setPdfUrl] = useState(null); // URL du PDF à afficher

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/api/etudiant/searchE", {
          headers: { Authorization: `Bearer ${token}` },
          params: { query: debouncedSearchTerm },
        });
        
        const resources = Array.isArray(response.data)
          ? response.data.map(res => ({
              id: res.id,
              titre: res.titre || "Sans titre",
              document: res.url
            }))
          : [];
        
        setAvailableResources(resources);
        setError(null);
      } catch (err) {
        console.error("Erreur recherche:", err);
        setError("Erreur lors du chargement des ressources: " + 
          (err.response?.data?.message || err.message || "Erreur inconnue"));
      } finally {
        setIsLoading(false);
      }
    };

    if (showResourcePopup) {
      fetchResources();
    }
  }, [debouncedSearchTerm, showResourcePopup]);

  const toggleLibraryList = (e) => {
    e.preventDefault();
    setShowLibraries((prev) => !prev);
  };

  const toggleLibrary = (index) => {
    setExpandedLibraries((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openResourcePopup = (index) => {
    setSelectedLibrary(index);
    setShowResourcePopup(true);
    setSearchTerm("");
    setAvailableResources([]);
  };

  const closeResourcePopup = () => {
    setShowResourcePopup(false);
    setSelectedLibrary(null);
    setSearchTerm("");
    setError(null);
  };

  const deleteLibrary = async (libraryIndex) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette bibliothèque ?")) return;

    const library = libraries[libraryIndex];
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token d'authentification manquant. Veuillez vous reconnecter.");
      return;
    }
    if (!library?.id) {
      setError("ID de la bibliothèque manquant.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:8080/api/bibliotheques/${library.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLibraries((prev) => prev.filter((_, idx) => idx !== libraryIndex));
      setExpandedLibraries((prev) => {
        const newExpanded = { ...prev };
        delete newExpanded[libraryIndex];
        return newExpanded;
      });
      setError(null);
    } catch (err) {
      console.error("Erreur suppression:", err);
      setError("Erreur lors de la suppression: " + 
        (err.response?.data?.message || err.message || "Erreur inconnue"));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResourceFromLibrary = async (libraryIndex, resourceId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")) return;

    const library = libraries[libraryIndex];
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token d'authentification manquant. Veuillez vous reconnecter.");
      return;
    }
    if (!library?.id) {
      setError("ID de la bibliothèque manquant.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.delete(
        `http://localhost:8080/api/bibliotheques/${library.id}/ressources/${resourceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLibraries((prev) =>
        prev.map((lib, idx) =>
          idx === libraryIndex
            ? {
                ...lib,
                resources: lib.resources?.filter((res) => res.id !== resourceId) || [],
              }
            : lib
        )
      );
      setError(null);
    } catch (err) {
      console.error("Erreur suppression ressource:", err);
      setError("Erreur lors de la suppression de la ressource: " + 
        (err.response?.data?.message || err.message || "Erreur inconnue"));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLibraryStatus = async (libraryIndex) => {
    const library = libraries[libraryIndex];
    if (!library) return;

    const newStatus = library.statut === "PUBLIC" ? "PRIVE" : "PUBLIC";
    if (!window.confirm(`Voulez-vous vraiment passer cette bibliothèque en ${newStatus === "PUBLIC" ? "public" : "privé"} ?`)) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token d'authentification manquant. Veuillez vous reconnecter.");
      return;
    }
    if (!library?.id) {
      setError("ID de la bibliothèque manquant.");
      return;
    }

    console.log("Envoi PATCH - Library ID:", library.id, "Nouveau statut:", newStatus);

    try {
      setIsLoading(true);
      const response = await axios.patch(
        `http://localhost:8080/api/bibliotheques/${library.id}/statut?statut=${newStatus}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log("Réponse backend:", response.data);
      const updatedLibrary = response.data;
      setLibraries((prev) =>
        prev.map((lib, idx) =>
          idx === libraryIndex ? { ...lib, statut: updatedLibrary.statut } : lib
        )
      );
      setError(null);
    } catch (err) {
      console.error("Erreur modification statut:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setError("Erreur lors de la modification du statut: " + 
        (err.response?.data?.message || err.message || "Erreur inconnue"));
    } finally {
      setIsLoading(false);
    }
  };

  const addResourceToLibrary = async (resourceId) => {
    if (selectedLibrary === null) return;

    const library = libraries[selectedLibrary];
    const token = localStorage.getItem("token");

    if (!token || !library?.id) {
      setError("Token ou ID de bibliothèque manquant.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:8080/api/bibliotheques/${library.id}/ressources/${resourceId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const updatedLibrary = response.data;
      console.log("Ressources reçues du backend :", updatedLibrary.ressources);
      setLibraries((prev) =>
        prev.map((lib, idx) =>
          idx === selectedLibrary
            ? {
                ...lib,
                resources: updatedLibrary.ressources?.map(res => ({
                  id: res.id,
                  titre: res.titre || "Sans titre",
                  document: res.url
                })) || []
              }
            : lib
        )
      );
      setError(null);
      closeResourcePopup();
    } catch (err) {
      console.error("Erreur ajout ressource:", err);
      setError("Erreur lors de l'ajout de la ressource: " + 
        (err.response?.data?.message || err.message || "Erreur inconnue"));
    } finally {
      setIsLoading(false);
    }
  };

  const openResource = (resource) => {
    console.log("Tentative d'ouverture :", resource);
    if (resource.document) {
      setPdfUrl(resource.document); // Stocke l'URL du PDF
      setShowPDFViewer(true); // Affiche le modal de visualisation
    } else {
      setError("Aucun document disponible pour cette ressource.");
    }
  };

  const closePDFViewer = () => {
    setShowPDFViewer(false);
    setPdfUrl(null);
  };

  return (
    <div>
      <a href="#" className="nav-link text-dark d-flex align-items-center" onClick={toggleLibraryList}>
        <img src={Library} alt="Library Logo" width="30" height="30" className="me-2" />
        {isOpen && "My Library"}
        {isOpen && (showLibraries ? <ChevronDown size={18} className="ms-auto" /> : <ChevronRight size={18} className="ms-auto" />)}
      </a>

      {showLibraries && isOpen && (
        <ul className="ps-3 mt-2" style={{ listStyle: "none" }}>
          {isLoading && <li>Chargement...</li>}
          {!libraries || libraries.length === 0 ? (
            <li className="text-muted">Aucune bibliothèque disponible</li>
          ) : (
            libraries.map((library, index) => (
              <li key={library.id || index}>
                <div className="d-flex align-items-center">
                  <span onClick={() => toggleLibrary(index)} style={{ cursor: "pointer", fontWeight: "bold" }}>
                    {expandedLibraries[index] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    {library.name} ({library.statut})
                  </span>
                  <button
                    className="btn btn-sm btn-primary ms-2"
                    style={{ width: "30px", height: "30px", padding: "0", borderRadius: "50%" }}
                    onClick={() => openResourcePopup(index)}
                    disabled={isLoading}
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-warning ms-2"
                    style={{ width: "30px", height: "30px", padding: "0", borderRadius: "50%" }}
                    onClick={() => toggleLibraryStatus(index)}
                    disabled={isLoading}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    style={{ width: "30px", height: "30px", padding: "0", borderRadius: "50%" }}
                    onClick={() => deleteLibrary(index)}
                    disabled={isLoading}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {expandedLibraries[index] && (
                  <ul className="ps-4">
                    {library.resources?.length > 0 ? (
                      library.resources.map((res, idx) => (
                        <li key={res.id || idx} className="d-flex align-items-center">
                          <span
                            onClick={() => openResource(res)}
                            style={{ 
                              cursor: res.document ? "pointer" : "default", 
                              color: res.document ? "blue" : "inherit",
                              textDecoration: res.document ? "underline" : "none"
                            }}
                          >
                            {res.titre || "Sans titre"}
                          </span>
                          <button
                            className="btn btn-sm btn-danger ms-2"
                            style={{ width: "20px", height: "20px", padding: "0" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteResourceFromLibrary(index, res.id);
                            }}
                            disabled={isLoading}
                          >
                            <X size={12} />
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-muted">Aucune ressource ajoutée</li>
                    )}
                  </ul>
                )}
              </li>
            ))
          )}
        </ul>
      )}

      {showResourcePopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeResourcePopup}>
              <X size={20} />
            </button>

            <h5 className="mb-3">Sélectionner une ressource</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            {isLoading && <div className="text-center">Chargement...</div>}

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Rechercher des ressources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />

            <ul className="list-group" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {availableResources.length > 0 ? (
                availableResources
                  .filter(res => 
                    res.titre?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                    res.document?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                  )
                  .map((res) => (
                    <li key={res.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div><strong>{res.titre || "Sans titre"}</strong></div>
                      </div>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => addResourceToLibrary(res.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Ajout..." : "Ajouter"}
                      </button>
                    </li>
                  ))
              ) : (
                <li className="list-group-item text-muted text-center">
                  {debouncedSearchTerm ? "Aucun résultat trouvé" : "Aucune ressource disponible"}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {showPDFViewer && (
        <div className="modal-overlay">
          <div className="modal-content pdf-viewer-container">
            <PDFViewer url={pdfUrl} onClose={closePDFViewer} />
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 450px;
          max-width: 90%;
          position: relative;
        }
        .pdf-viewer-container {
          width: 80%;
          height: 80%;
          max-width: 1000px;
          max-height: 800px;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }
        .close-btn:hover {
          color: #dc3545;
        }
      `}</style>
    </div>
  );
};

export default LibraryMenu;