// SearchResults.jsx
import React from "react";
import "./SearchResults.css";

import TrackList from "../TrackList/TrackList";

function SearchResults({ tracks }) {
  return (
    <div className="column1">
      <h2>Results</h2>
      <TrackList tracks={tracks} />
    </div>
  );
}

export default SearchResults;
