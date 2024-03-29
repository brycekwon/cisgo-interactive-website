import React from 'react';

import countryFlags from '../data/countryFlags.js';

import '../static/css/components/SearchPopup.css';

const getCountryFlagUrl = (countryName) => {
  const trimmedCountryName = countryName.trim();
  return countryFlags[trimmedCountryName] || ''; 
};

const SearchPopup = ({ isOpen, onClose, experience }) => {
  if (!isOpen || !experience) return null;

  const { name, email, location, description } = experience;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span className="popup-close" onClick={onClose}>X</span>
        <h2>{name}</h2>
        <div className="popup-details">
          <div className="popup-info">
            <p>Email: {email}</p>
            <p>
              Country: {location.country}
              <img 
                src={getCountryFlagUrl(location.country)} 
                alt="Country Flag" 
                className="popup-flag" 
                style={{ width: '30px', height: 'auto' }}
              />
            </p>
            <p>Region: {location.city}</p>
            <p>Description: {description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
