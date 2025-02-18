import React, { useState, useEffect } from 'react';

import './App.css';

import SearchResults from "../SearchResults/SearchResults.jsx";
import SearchBar from "../Searchbar/SearchBar.jsx";
import SpotifyAuth from "../SpotifyAuth.js";
import Playlist from '../Playlist/Playlist.jsx';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Spotify access tokeni saamine (Fetching the Spotify Access Token)
    SpotifyAuth.getAccessToken();
  }, []);

  const searchSpotify = async (term) => {
    const results = await SpotifyAuth.search(term);
    setSearchResults(results);
  };

  return (
    <div className="App">
      <h1 className="title">Jamming</h1>
      <SearchBar onSearch={searchSpotify} />
      <div className='container'>
        <SearchResults tracks={searchResults} className="column1"/>
        <Playlist className="column2"/>
      </div>
    </div>
  );
}

export default App;
