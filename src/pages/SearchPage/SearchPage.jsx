import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import Logo from "../../assets/Logo.png";
import ProfilePic from "../../assets/profil1.png";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [universities, setUniversities] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [niveaux] = useState(["L1", "L2", "M1", "M2", "DOCTORAT"]);
    const [specialites, setSpecialites] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [selectedFiliere, setSelectedFiliere] = useState("");
    const [selectedNiveau, setSelectedNiveau] = useState("");
    const [selectedSpecialite, setSelectedSpecialite] = useState("");
    const [minYear, setMinYear] = useState(2000);
    const [maxYear, setMaxYear] = useState(2030);
    const [documentType, setDocumentType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [withSolution, setWithSolution] = useState("");
    const [languages, setLanguages] = useState({ english: false, french: false, arabic: false });

    const location = useLocation(); // Pour lire les paramètres d'URL
    const navigate = useNavigate(); // Pour mettre à jour l'URL si nécessaire

    // Récupérer la requête initiale depuis l'URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryFromUrl = searchParams.get("query") || "";
        setQuery(decodeURIComponent(queryFromUrl)); // Mettre à jour l'état avec la requête de l'URL
    }, [location.search]);

    // Récupérer les universités
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/data/universites")
            .then(response => setUniversities(response.data))
            .catch(error => console.error("Erreur lors de la récupération des universités :", error));
    }, []);

    // Récupérer les filières
    useEffect(() => {
        if (selectedUniversity) {
            axios.get(`http://localhost:8080/api/v1/data/filieres?universiteId=${selectedUniversity}`)
                .then(response => {
                    setFilieres(response.data);
                    setSelectedFiliere("");
                    setSelectedNiveau("");
                    setSelectedSpecialite("");
                    setSpecialites([]);
                })
                .catch(error => console.error("Erreur lors de la récupération des filières :", error));
        } else {
            setFilieres([]);
            setSpecialites([]);
        }
    }, [selectedUniversity]);

    // Récupérer les spécialités
    useEffect(() => {
        if (selectedFiliere && selectedNiveau) {
            axios.get(`http://localhost:8080/api/v1/data/specialites-by-niveau?filiereId=${selectedFiliere}&niveau=${selectedNiveau}`)
                .then(response => {
                    setSpecialites(response.data);
                    setSelectedSpecialite("");
                })
                .catch(error => console.error("Erreur lors de la récupération des spécialités :", error));
        } else {
            setSpecialites([]);
        }
    }, [selectedFiliere, selectedNiveau]);

    // Récupérer les documents filtrés
    useEffect(() => {
        let selectedLangue = null;
        if (languages.english && !languages.french && !languages.arabic) selectedLangue = "ENGLISH";
        else if (languages.french && !languages.english && !languages.arabic) selectedLangue = "FRENCH";
        else if (languages.arabic && !languages.english && !languages.french) selectedLangue = "ARABIC";

        const typeMap = { "cours": "COUR", "td": "TD", "tp": "TP", "examen": "EXAMEN" };
        const mappedType = typeMap[documentType] || "";
        const difficultyMap = { "facile": "FACILE", "moyen": "MOYEN", "difficile": "DIFFICILE" };
        const mappedDifficulty = difficultyMap[difficulty] || "";

        axios.get(`http://localhost:8080/api/v1/visiteur/search`, {
            params: {
                search: query || undefined,
                universiteNom: selectedUniversity ? universities.find(u => u.id === parseInt(selectedUniversity))?.nom : undefined,
                filiereNom: selectedFiliere ? filieres.find(f => f.id === parseInt(selectedFiliere))?.nom : undefined,
                specialiteNom: selectedSpecialite ? specialites.find(s => s.id === parseInt(selectedSpecialite))?.nom : undefined,
                niveau: selectedNiveau || undefined,
                anneeMin: minYear || undefined,
                anneeMax: maxYear || undefined,
                type: mappedType || undefined,
                difficulte: mappedDifficulty || undefined,
                corrgDispo: withSolution ? withSolution === "true" : undefined,
                langue: selectedLangue || undefined
            }
        })
        .then(response => {
            console.log("Documents récupérés :", response.data);
            setDocuments(response.data || []);
        })
        .catch(error => console.error("Erreur lors de la récupération des documents :", error));
    }, [query, selectedUniversity, selectedFiliere, selectedNiveau, selectedSpecialite, minYear, maxYear, documentType, difficulty, withSolution, languages, universities, filieres, specialites]);

    const handleLanguageChange = (lang) => {
        setLanguages(prev => ({ ...prev, [lang]: !prev[lang] }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${encodeURIComponent(query)}`); // Mettre à jour l'URL avec la nouvelle recherche
    };
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="#"><img className="logo" src={Logo} alt="logo..." /></a>
                    <form className="d-flex mx-auto w-50">
                        <input
                            type="text"
                            className="form-control me-1 rounded-pill"
                            placeholder="Rechercher..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                    <button 
                        className="btn btn-outline-secondary rounded-pill"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#rightSidebar"
                    >
                        ☰ Filtres
                    </button>
                </div>
            </nav>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="rightSidebar" data-bs-backdrop="static">
                <div className="offcanvas-header">
                    <h5>Filtres</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                    <h6>Université</h6>
                    <select className="form-select mb-3" value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)}>
                        <option value="">Toutes les universités</option>
                        {universities.map((uni) => (
                            <option key={uni.id} value={uni.id}>{uni.nom}</option>
                        ))}
                    </select>

                    <h6>Filière</h6>
                    <select className="form-select mb-3" value={selectedFiliere} onChange={(e) => setSelectedFiliere(e.target.value)} disabled={!selectedUniversity}>
                        <option value="">Toutes les filières</option>
                        {filieres.map((filiere) => (
                            <option key={filiere.id} value={filiere.id}>{filiere.nom}</option>
                        ))}
                    </select>

                    <h6>Niveau</h6>
                    <select className="form-select mb-3" value={selectedNiveau} onChange={(e) => setSelectedNiveau(e.target.value)} disabled={!selectedFiliere}>
                        <option value="">Tous les niveaux</option>
                        {niveaux.map((niveau) => (
                            <option key={niveau} value={niveau}>{niveau}</option>
                        ))}
                    </select>

                    <h6>Spécialité</h6>
                    <select className="form-select mb-3" value={selectedSpecialite} onChange={(e) => setSelectedSpecialite(e.target.value)} disabled={!selectedNiveau}>
                        <option value="">Toutes les spécialités</option>
                        {specialites.map((specialite) => (
                            <option key={specialite.id} value={specialite.id}>{specialite.nom} ({specialite.niveau})</option>
                        ))}
                    </select>

                    <h6>Année</h6>
                    <div className="d-flex mb-3">
                        <input type="number" className="form-control me-2" value={minYear} onChange={(e) => setMinYear(e.target.value)} min="2000" max="2030" />
                        <input type="number" className="form-control" value={maxYear} onChange={(e) => setMaxYear(e.target.value)} min="2000" max="2030" />
                    </div>

                    <h6>Type de Document</h6>
                    <select className="form-select mb-3" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                        <option value="">Tous</option>
                        <option value="cours">Cours</option>
                        <option value="td">TD</option>
                        <option value="tp">TP</option>
                        <option value="examen">Examen</option>
                    </select>

                    {documentType === "td" && (
                        <>
                            <h6>Niveau de Difficulté</h6>
                            <select className="form-select mb-3" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                <option value="">Tous</option>
                                <option value="facile">Facile</option>
                                <option value="moyen">Moyen</option>
                                <option value="difficile">Difficile</option>
                            </select>
                        </>
                    )}

                    {(documentType === "td" || documentType === "examen") && (
                        <>
                            <h6>Solution</h6>
                            <select className="form-select mb-3" value={withSolution} onChange={(e) => setWithSolution(e.target.value)}>
                                <option value="">Tous</option>
                                <option value="true">Avec Solution</option>
                                <option value="false">Sans Solution</option>
                            </select>
                        </>
                    )}

                    <h6>Langue</h6>
                    <div>
                        <input type="checkbox" id="englishCanvas" className="me-2" checked={languages.english} onChange={() => handleLanguageChange("english")} />
                        <label htmlFor="englishCanvas">English</label>
                    </div>
                    <div>
                        <input type="checkbox" id="frenchCanvas" className="me-2" checked={languages.french} onChange={() => handleLanguageChange("french")} />
                        <label htmlFor="frenchCanvas">French</label>
                    </div>
                    <div>
                        <input type="checkbox" id="arabicCanvas" className="me-2" checked={languages.arabic} onChange={() => handleLanguageChange("arabic")} />
                        <label htmlFor="arabicCanvas">Arabic</label>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row">
                    {documents.length > 0 ? (
                        documents.map((doc, index) => {
                            // Hypothèse sur l'ordre des champs dans Object[] basé sur votre besoin
                            const [titre, niveau, uploaderNom, fichierUrl] = doc; // Ajustez cet ordre selon le repository
                            return (
                                <div key={index} className="col-md-4 mb-3">
                                    <div className="card shadow-sm">
                                        <div className="card-body d-flex align-items-center">
                                            <img
                                                src={ProfilePic} // Si profilePic n'est pas dans les données
                                                alt="Profile"
                                                className="rounded-circle me-3"
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                            <div>
                                                <h5 className="card-title mb-1">{titre || "Sans titre"}</h5>
                                                <p className="card-text mb-1">
                                                    <strong>Niveau :</strong> {niveau || "N/A"} <br />
                                                    <strong>Uploader :</strong> {uploaderNom || "Inconnu"}
                                                </p>
                                                <a href={fichierUrl || "#"} className="btn btn-primary btn-sm" download>
                                                    📥 Télécharger
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center">Aucun document trouvé.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;