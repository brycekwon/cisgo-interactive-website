import React, { useState } from 'react';
import NavBar from '../components/NavBar.js';
import Popup from '../components/SearchPopup.js';
import countryFlags from '../data/countryFlags.js';
import '../static/css/pages/Search.css';

const Search = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);

  const getCountryFlag = (countryName) => {
    const trimmedCountryName = countryName.trim();
    return countryFlags[trimmedCountryName] || ''; 
  };

  const openPopup = (experience) => {
    setSelectedExperience(experience);
  };

  const closePopup = () => {
    setSelectedExperience(null);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    await fetch(`${process.env.REACT_APP_API}/experiences?q=` + query, {
      method: 'get',
    }).then(async (res) => {
      setExperiences(await res.json());
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleInputChange = (option, value) => {
    // Handle input change for each search option
  };

  const addSearchBar = (option) => {
    if (option !== "" && !searchOptions.includes(option)) {
      setSearchOptions([...searchOptions, option]);
    }
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="app">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <NavBar />
      <div className="app">
        <div className="search-options">
          <select className="dropdown" onChange={(e) => addSearchBar(e.target.value)}>
            <option value="">More Search Options</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="description">Description</option>
          </select>
          <div className="search-bars">
            <div className="search-bar">
              <input
                className="search"
                placeholder='Search Location...'
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            {searchOptions.map((option, index) => (
              <div className="search-bar" key={index}>
                <input
                  className="search"
                  placeholder={`Search ${option}...`}
                  onChange={(event) => handleInputChange(option, event.target.value)}
                />
              </div>
            ))}
          </div>
          <form onSubmit={handleSearch}>
            <button type='submit' className="submit-button">Submit</button>
          </form>
        </div>
      </div>
      <div className="expList">
        {experiences.map((post, index) => (
          <div key={index} className="box" onClick={() => openPopup(post)}>
            <div>
              <p>{post.name} ({post.email})</p>
              <p>{post.location.country}{post.location.city === null ? "" : ", " + post.location.city}</p>
            </div>
            <div className="country-flag-container">
              <img src={getCountryFlag(post.location.country)} alt="Country Flag" className="country-flag" />
            </div>
          </div>
        ))}
      </div>
      <Popup isOpen={selectedExperience !== null} onClose={closePopup} experience={selectedExperience} />
    </div>
  );
};

export default Search;
