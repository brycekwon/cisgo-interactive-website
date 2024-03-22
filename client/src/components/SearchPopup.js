import React from 'react';

import countryFlags from '../data/countryFlags.js';

import '../static/css/components/SearchPopup.css';

const getCountryFlagUrl = (countryName) => {
  const trimmedCountryName = countryName.trim();
  return countryFlags[trimmedCountryName] || ''; 
};

const SearchPopup = ({ isOpen, onClose, experience }) => {
  if (!isOpen || !experience) return null;

  const { name, contact, body } = experience;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span className="popup-close" onClick={onClose}>X</span>
        <h2>{name.firstName} {name.lastName}</h2>
        <div className="popup-details">
          <div className="popup-info">
            <p>Email: {contact.email}</p>
            <p>
              Country: {body.location.country}
              <img 
                src={getCountryFlagUrl(body.location.country)} 
                alt="Country Flag" 
                className="popup-flag" 
                style={{ width: '30px', height: 'auto' }}
              />
            </p>
            <p>Region: {body.location.region}</p>
            <p>Description: {body.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
