// TrackList.jsx
import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

function TrackList({ tracks }) {
  return (
    <div>
      {tracks && tracks.length > 0 ? (
        tracks.map((track) => <Track key={track.id} track={track} />)
      ) : (
        <p>No tracks found.</p>
      )}
    </div>
  );
}

export default TrackList;