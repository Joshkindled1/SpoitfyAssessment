import React from 'react'
import Tracklist from '../tracklist/Tracklist'
import "./SearchResults.css";

function SearchResults({searchResults, onAdd}) {


  return (
    <>
    <div className='SearchResults'>
    <div>Search Results</div>
    <Tracklist searchResults = {searchResults} 
      onAdd={onAdd}
      onRemoval ={false}
    />
    </div>
    </>
  )
}

export default SearchResults