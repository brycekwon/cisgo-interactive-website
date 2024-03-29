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
    const formData = new FormData(event.target);
    setLoading(true);
    await fetch(`${process.env.REACT_APP_API}/experiences`, {
      method: "post",
      body: JSON.stringify({
        "query": formData.get("query"),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      let data = await res.json();
      setExperiences(data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setError(err);
      setLoading(false);
    });
  }

  if (loading) {
    return <div>
      <NavBar />
      <div className="app">
        <h1>Loading...</h1>
      </div>
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <NavBar />

      <div className="app">
        <form onSubmit={handleSearch}>
          <input name="query" placeholder='Search Location...'></input>
          <button type='submit'>Submit</button>
        </form>
        {experiences.map((post, index) => (
          <div className="box" key={index} onClick={() => openPopup(post)}>
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
  )
}

export default Search;
