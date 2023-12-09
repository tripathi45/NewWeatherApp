import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("Delhi");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Call the onSearch callback with the searchQuery
    onSearch(searchQuery);
  };

  return (
    <div className="search-container">
      <i className="fa fa-search" />
      <input
        type="text"
        className="form-control"
        placeholder="Have a question? Ask Now"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
