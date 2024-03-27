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
      <NavBar /> {/* Ensure NavBar is rendered */}
      <div className="app">
        
        <input className = "search" placeholder='Search Location...' onChange={event => setQuery(event.target.value)}></input>
        {experiences.filter(post => {
          
          if (query === '') {
            return post;
          } else if (post.body.location.country.toLowerCase().includes(query.toLowerCase())) {
            return post;
          }
        
        }).map((post, index) => (
          <div className="box" key={index} onClick={() => openPopup(post)}>
            <div>
              <p>{post.name.firstName} {post.name.lastName} ({post.contact.email})</p>
              <p>{post.body.location.country}{post.body.location.region === null ? "" : ", " + post.body.location.region}</p>
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
}

export default Search;
