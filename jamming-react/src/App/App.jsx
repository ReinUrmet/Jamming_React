// App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import SearchResults from "../SearchResults/SearchResults.jsx";
import SearchBar from "../Searchbar/SearchBar.jsx";
import SpotifyAuth from "../SpotifyAuth";
import Playlist from "../Playlist/Playlist.jsx";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [notification, setNotification] = useState(""); // State for our notification

  useEffect(() => {
    SpotifyAuth.getAccessToken();
  }, []);

  const searchSpotify = async (term) => {
    const results = await SpotifyAuth.search(term);
    setSearchResults(results);
  };

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(
      playlistTracks.filter((savedTrack) => savedTrack.id !== track.id)
    );
  };

  const trackURIs = playlistTracks.map((track) => track.uri);


  const handleSavePlaylist = async () => {
    await SpotifyAuth.savePlaylist(playlistName, trackURIs);
    setNotification("Playlist saved successfully!");
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="App">
      <h1 className="title">Jamming</h1>
      <SearchBar onSearch={searchSpotify} />
      <div className="container">
        <SearchResults
          tracks={searchResults}
          onAdd={addTrackToPlaylist}
          className="column1"
        />
        <Playlist
          tracks={playlistTracks}
          onRemove={removeTrackFromPlaylist}
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          onSave={handleSavePlaylist}
          className="column_playlist"
        />
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default App;
