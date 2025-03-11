import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="search-container">
      <form className="d-flex">
        <input
          className="form-control ms-1"
          type="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-info" type="submit">
          <FontAwesomeIcon icon={faSearch} /> {/* Icône de recherche */}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;