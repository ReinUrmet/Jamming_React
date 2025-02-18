import React from "react";
import "./Playlist.css";
import Track from "../Track/Track.jsx";

function Playlist({ 
  tracks, 
  onRemove, 
  playlistName, 
  setPlaylistName, 
  onSave // This is our save function passed from App.jsx
}) {
  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  return (
    <div className="column_playlist">
      <input 
        type="text" 
        placeholder="Name your Playlist..." 
        className="naming_playlist"
        value={playlistName}
        onChange={handleNameChange}
      />
      {tracks.map((track) => (
        <Track key={track.id} track={track} onRemove={onRemove} />
      ))}
      <button onClick={onSave}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
