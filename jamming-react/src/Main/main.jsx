import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../App/App.jsx'
import SearchBar from '../Searchbar/SearchBar.jsx';
import SearchButton from '../SearchButton/SearchButton.jsx'
import SearchResults from '../SearchResults/SearchResults.jsx';
import Playlist from '../Playlist/Playlist.jsx';


createRoot(document.getElementById('root')).render(
  <>
    <App />
    <SearchBar />
    <SearchButton />
    
    <div className='container'>
    <SearchResults className="column1"/>
    <Playlist className="column2" />
    </div>
  </>
)
