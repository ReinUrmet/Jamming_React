import React from "react";
import Track from "../Track/Track.jsx";
import "./Tracklist.css"; // Import the CSS file

function Tracklist( {tracks} ) {

  return (
    <div>
        {tracks.map(track => (
            <Track key={tracks.id} track= {track} />
        ))}
    </div>
  );
}

export default Tracklist;
