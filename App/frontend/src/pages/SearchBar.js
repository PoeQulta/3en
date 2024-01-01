// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css'; // Import the SearchBar styles

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Enter car details..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
