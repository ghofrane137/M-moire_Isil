import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompleteEnseignantProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    modulesEnseignes: [],
  });
  const [modules, setModules] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/v1/modules', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModules(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des modules.');
        console.error(err);
      }
    };
    fetchModules();
  }, []);

  const handleModuleChange = (e) => {
    const selectedModules = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      modulesEnseignes: selectedModules,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/v1/profil/enseignant/complete',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Une erreur est survenue.';
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Compléter votre profil enseignant</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="modulesEnseignes" className="form-label">Modules enseignés</label>
          <select
            name="modulesEnseignes"
            className="form-control"
            multiple
            value={formData.modulesEnseignes}
            onChange={handleModuleChange}
            required
          >
            {modules.map((module) => (
              <option key={module.id} value={module.nomModule}>
                {module.nomModule}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">
            Maintenez la touche Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs modules.
          </small>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Compléter le profil
        </button>
      </form>
    </div>
  );
};

export default CompleteEnseignantProfile;