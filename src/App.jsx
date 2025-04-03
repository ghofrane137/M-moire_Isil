import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EtudiantHome from './pages/etudiant/etudiant';
import EnseignantHome from './pages/enseignant/enseignant';
import CompleteProfileEtudiantPage from './pages/CompleteProfil/CompleteEtudiantProfile';
import CompleteProfileEnseignantPage from './pages/CompleteProfil/CompleteEnseignantProfile';
import VerifyEmail from './pages/CompleteProfil/VerifyEmail';
import SearchPageEtudiant from './pages/etudiant/SearchPageEtudiant/SearchPageEtudiant'
import SearchPage from './pages/SearchPage/SearchPage';
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Import Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etudiant" element={<EtudiantHome />} />
        <Route path="/enseignant" element={<EnseignantHome />} />
        <Route path="/admin" element={<div><h1>Administrateur Home</h1></div>} /> {/* Placeholder */}
        <Route path="/moderateur" element={<div><h1>Modérateur Home</h1></div>} /> {/* Placeholder */}
        <Route path="/complete-profile/etudiant" element={<CompleteProfileEtudiantPage />} />
        <Route path="/complete-profile/enseignant" element={<CompleteProfileEnseignantPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<EtudiantHome />} />
        <Route path="/search-page-etudiant" element={<SearchPageEtudiant />} />
        <Route path="/search-page" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;