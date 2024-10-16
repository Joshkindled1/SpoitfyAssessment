import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import { Spotify } from '../utils/Spotify.js';

function App() {
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);
  
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState([""]);
  

  // sideEffect hook - called useEffect hook
  useEffect(() => {
    setSearchResults([

    ]);
    setPlayListTracks([


]);

    
  }, []);

  function search(term = ""){
    Spotify.search(term).then((response)=>
       setSearchResults(response)
    ); 
  }

  function addTrack(track){
    const trackExist = playListTracks.find((currentTrack)=>
      currentTrack.id === track.id);
    
    if(!trackExist)
      setPlayListTracks([...playListTracks, track]);

  }

  function removeTrack(track){
    const filteredTrack = playListTracks.filter((currentTrack)=> 
      currentTrack.id !== track.id);

    setPlayListTracks(filteredTrack);
  }

  function updatePlayListName(strName){
    setPlayListName(strName);
  }
  
  function savePlayList(){
    const tracksUri = playListTracks.map((track)=> track.uri);
    Spotify.savePlayList(playListName, tracksUri).then(() => {
      updatePlayListName("My New PlayList");
      setPlayListTracks([]);
    })
  }







  console.log("my searchResults", searchResults );
  console.log("my myPlaylistracks", playListTracks );
  console.log("myplaylistanme", playListName)

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults searchResults = {searchResults}
          onAdd = {addTrack}
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist playListTracks={playListTracks} onRemove = {removeTrack} 
          playListName={playListName}
          updateName = {updatePlayListName}
          onSave = {savePlayList}
           />
        </div>
      </div>
    </div>
  );
}

export default App;
