import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"; // Import the CSS file

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input type="text" placeholder="Search..." className="search-bar-input" />
      <FaSearch className="search-bar-icon" />
    </div>
  );
}

export default SearchBar;
