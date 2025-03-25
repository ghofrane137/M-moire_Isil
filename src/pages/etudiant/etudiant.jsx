import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../CompleteProfil/Modal';
import CompleteEtudiantProfile from '../CompleteProfil/CompleteEtudiantProfile';
import Sidebar from "./Sidebar";
import Statistique from "./Statistique";
import Activity from "./Activity";
import Footer from "../../layouts/Footer/Footer";
import Header from "./Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import Title from "./Title";
import { ChevronRight, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar/SearchBar"

const Etudiant = () => {
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
      {/* Contenu de la page étudiant */}
      <Modal isOpen={isProfileModalOpen} onClose={() => {}}>
        <CompleteEtudiantProfile onClose={handleProfileCompleted} />
      </Modal>
      <Header/>
    <div className="d-flex">
    <Sidebar />
    <div className="p-4 flex-grow-1">
      <div className="my-background">
      <Title/>
      <SearchBar/>
      </div>
      {/* Features Section (Statistique) Below the Text */}
      <Statistique />
      <Activity/>
    </div>
  </div>
  <Footer />
    </div>
  );
};

export default Etudiant;