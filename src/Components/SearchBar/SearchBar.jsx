import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="search-container">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        className="search-bar"
        placeholder="Rechercher une ressource..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
