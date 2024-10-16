import React, { useEffect, useState } from 'react';
import "./SearchBar.css"
function SearchBar({onSearch}) {
  const [term, setTerm] = useState('');

  function handleSearchChange(event){
    setTerm(event.target.value);
  }

  const search = () => {
    onSearch(term);
  };
  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" 
      onChange={handleSearchChange} />
         <button
        className="SearchButton"
        onClick={onSearch}>
        SEARCH
      </button>
    </div>
  )
}

export default SearchBar