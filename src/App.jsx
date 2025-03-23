import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SearchPage from './pages/SearchPage/SearchPage'; // Importez la page de recherche

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
        <Route path="/search" element={<SearchPage />} /> {/* Route pour la page de recherche */}
      </Routes>
    </Router>
  );
};

export default App;