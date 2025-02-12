import React, {useState} from "react";
import "./SearchResults.css"; // Import the CSS file
import TrackList from "../Tracklist/Tracklist.jsx";

function SearchResults() {
    
    const [tracks, setTracks] = useState([
        { id: 1, name: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
        { id: 2, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
        { id: 3, name: "Save Your Tears", artist: "The Weeknd", album: "After Hours" }
      ]);

  return (
    <div className="column1">
        <h2>Results</h2>
        <TrackList tracks={tracks} />
    </div>
  );
}

export default SearchResults;
