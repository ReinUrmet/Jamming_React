import React from "react";
import "./Track.css";

function Track({ track, onAdd, onRemove }) {
  const handleAddTrack = () => {
    if (onAdd) {
      onAdd(track);
    }
  };

  const handleRemoveTrack = () => {
    if (onRemove) {
      onRemove(track);
    }
  };

  return (
    <div className="track">
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>{track.artist} ┃ {track.album}</p>
      </div>
      {onAdd && (
        <button className="add-button" onClick={handleAddTrack}>
          +
        </button>
      )}
      {onRemove && (
        <button className="remove-button" onClick={handleRemoveTrack}>
          –
        </button>
      )}
    </div>
  );
}

export default Track;
