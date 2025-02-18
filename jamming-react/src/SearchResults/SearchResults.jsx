// SearchResults.jsx
import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults({ tracks, onAdd }) {
  return (
    <div className="column1">
      <h2>Results</h2>
      {/* Pass onAdd to TrackList */}
      <TrackList tracks={tracks} onAdd={onAdd} />
    </div>
  );
}

export default SearchResults;
