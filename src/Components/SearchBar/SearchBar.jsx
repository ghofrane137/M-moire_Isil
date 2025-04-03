import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (query.trim()) { // Vérifie que la requête n'est pas vide
      navigate(`/search-page?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-container">
      <form className="d-flex" onSubmit={handleSearch}>
        <input
          className="form-control ms-1"
          type="search"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-info" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;