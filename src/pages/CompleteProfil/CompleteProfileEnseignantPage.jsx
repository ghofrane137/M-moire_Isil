import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import CompleteEnseignantProfile from './CompleteEnseignantProfile';

const CompleteProfileEnseignantPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/v1/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileCompleted(response.data.profileCompleted);
        setIsModalOpen(!response.data.profileCompleted); // Ouvre la modale si le profil n’est pas complet
      } catch (err) {
        console.error(err);
      }
    };
    checkProfile();
  }, []);

  const handleProfileCompleted = () => {
    setIsModalOpen(false);
    setProfileCompleted(true);
    // Rediriger vers la page d’accueil enseignant après complétion
    window.location.href = '/enseignant';
  };

  return (
    <div>
      <h1>Page d'accueil enseignant</h1>
      {/* Contenu de la page d’accueil enseignant */}
      <Modal isOpen={isModalOpen} onClose={() => {}}>
        <CompleteEnseignantProfile onClose={handleProfileCompleted} />
      </Modal>
    </div>
  );
};

export default CompleteProfileEnseignantPage;