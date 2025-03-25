import React, { useState, useEffect } from "react";
import axios from "axios";
import CompleteEtudiantProfile from "../../components/CompleteEtudiantProfile";

const CompleteProfileEtudiantPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleProfileCompleted = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && <CompleteEtudiantProfile onClose={handleProfileCompleted} />}
    </div>
  );
};

export default CompleteProfileEtudiantPage;