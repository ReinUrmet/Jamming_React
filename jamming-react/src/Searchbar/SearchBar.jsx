import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"; 
import SearchButton from "../SearchButton/SearchButton.jsx"; // Keep SearchButton separate

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    if (term.trim() !== "") {
      onSearch(term);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Calls search when Enter is pressed
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar-input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Calls search when Enter is pressed
        />
        <FaSearch className="search-bar-icon" onClick={handleSearch} /> {/* Keep FaSearch inside the search bar */}
      </div>
      <SearchButton onSearch={handleSearch} /> {/* Keep Search Button separate */}
    </div>
  );
}

export default SearchBar;
