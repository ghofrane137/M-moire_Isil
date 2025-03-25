import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CompleteEtudiantProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    universiteId: "",
    filiereId: "",
    specialiteId: "",
    niveau: "",
  });

  const [universites, setUniversites] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Charger les universités au démarrage
  useEffect(() => {
    const fetchUniversites = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const universitesRes = await axios.get("http://localhost:8080/api/v1/data/universites", config);
        setUniversites(universitesRes.data);
      } catch (err) {
        setError("Erreur lors de la récupération des universités.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversites();
  }, []);

  // Charger les filières quand universiteId change
  useEffect(() => {
    if (formData.universiteId) {
      const fetchFilieres = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const filieresRes = await axios.get(
            `http://localhost:8080/api/v1/data/filieres?universiteId=${formData.universiteId}`,
            config
          );
          setFilieres(filieresRes.data);
          setFormData((prev) => ({ ...prev, filiereId: "", specialiteId: "", niveau: "" }));
          setSpecialites([]);
        } catch (err) {
          setError("Erreur lors de la récupération des filières.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchFilieres();
    } else {
      setFilieres([]);
      setSpecialites([]);
      setFormData((prev) => ({ ...prev, filiereId: "", specialiteId: "", niveau: "" }));
    }
  }, [formData.universiteId]);

  // Charger les spécialités quand filiereId ET niveau changent
  useEffect(() => {
    const fetchSpecialites = async () => {
      if (!formData.filiereId || !formData.niveau) {
        setSpecialites([]);
        setFormData((prev) => ({ ...prev, specialiteId: "" }));
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log(
          `Fetching specialites for filiereId=${formData.filiereId}, niveau=${formData.niveau}`
        );
        const specialitesRes = await axios.get(
          `http://localhost:8080/api/v1/data/specialites-by-niveau?filiereId=${formData.filiereId}&niveau=${formData.niveau}`,
          config
        );
        console.log("Specialites response:", specialitesRes.data);
        setSpecialites(specialitesRes.data);
        setFormData((prev) => ({ ...prev, specialiteId: "" }));
      } catch (err) {
        setError("Erreur lors de la récupération des spécialités.");
        console.error("Error fetching specialites:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialites();
  }, [formData.filiereId, formData.niveau]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/v1/profil/etudiant/complete",
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        // Vérifier si onClose est une fonction avant de l'appeler
        if (typeof onClose === "function") {
          onClose();
        }
        // Rediriger vers /etudiant
        navigate("/etudiant");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={true} onHide={() => {}} centered backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Compléter votre profil étudiant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}

        {!loading && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Université</Form.Label>
              <Form.Select
                name="universiteId"
                value={formData.universiteId}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionner une université</option>
                {universites.map((universite) => (
                  <option key={universite.id} value={universite.id}>
                    {universite.nom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Filière</Form.Label>
              <Form.Select
                name="filiereId"
                value={formData.filiereId}
                onChange={handleInputChange}
                required
                disabled={!formData.universiteId}
              >
                <option value="">Sélectionner une filière</option>
                {filieres.map((filiere) => (
                  <option key={filiere.id} value={filiere.id}>
                    {filiere.nom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Niveau</Form.Label>
              <Form.Select
                name="niveau"
                value={formData.niveau}
                onChange={handleInputChange}
                required
                disabled={!formData.filiereId}
              >
                <option value="">Sélectionner un niveau</option>
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
                <option value="DOCTORAT">Doctorat</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Spécialité</Form.Label>
              <Form.Select
                name="specialiteId"
                value={formData.specialiteId}
                onChange={handleInputChange}
                required
                disabled={!formData.filiereId || !formData.niveau || specialites.length === 0}
              >
                <option value="">Sélectionner une spécialité</option>
                {specialites.map((specialite) => (
                  <option key={specialite.id} value={specialite.id}>
                    {specialite.nom}
                  </option>
                ))}
              </Form.Select>
              {formData.filiereId && formData.niveau && specialites.length === 0 && (
                <Alert variant="warning" className="mt-2">
                  Aucune spécialité disponible pour ce niveau et cette filière.
                </Alert>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" /> : "Compléter le profil"}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CompleteEtudiantProfile;