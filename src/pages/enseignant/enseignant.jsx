import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../CompleteProfil/Modal';
import CompleteEnseignantProfile from '../CompleteProfil/CompleteEnseignantProfile';

const Enseignant = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/v1/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileCompleted(response.data.profileCompleted);
        if (!response.data.profileCompleted) {
          setIsProfileModalOpen(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkProfile();
  }, []);

  const handleProfileCompleted = () => {
    setIsProfileModalOpen(false);
    setProfileCompleted(true);
  };

  return (
    <div>
      <h1>Page d'accueil enseignant</h1>
      {/* Contenu de la page enseignant */}
      <Modal isOpen={isProfileModalOpen} onClose={() => {}}>
        <CompleteEnseignantProfile onClose={handleProfileCompleted} />
      </Modal>
    </div>
  );
};

export default Enseignant;