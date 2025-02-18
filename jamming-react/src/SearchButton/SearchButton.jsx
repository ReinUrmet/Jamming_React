import React from "react";
import "./SearchButton.css"; // Import the CSS file

function SearchButton({ onSearch }) {
  return (
    <div className="button">
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchButton;
