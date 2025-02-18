// Track.jsx
import React from "react";
import "./Track.css";

function Track({ track }) {
  // When the add button is clicked, log the track's name
  const handleAddTrack = () => {
    console.log(`Added: ${track.name}`);
  };

  return (
    <div className="track">
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>{track.artist} ┃ {track.album}</p>
      </div>
      <button className="add-button" onClick={handleAddTrack}>
        +
      </button>
    </div>
  );
}

export default Track;
