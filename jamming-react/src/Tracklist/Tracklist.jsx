// TrackList.jsx
import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

function TrackList({ tracks, onAdd, onRemove }) {
  return (
    <div>
      {tracks && tracks.length > 0 ? (
        tracks.map((track) => (
          <Track 
            key={track.id} 
            track={track} 
            onAdd={onAdd} 
            onRemove={onRemove} 
          />
        ))
      ) : (
        <p>No tracks found.</p>
      )}
    </div>
  );
}

export default TrackList;
