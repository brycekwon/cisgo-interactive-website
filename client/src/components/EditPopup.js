import React, { useState } from 'react';
import '../static/css/components/EditPopup.css';



const EditPopup = ({ isOpen, onClose, experience }) => {
  const [editedExperience, setEditedExperience] = useState(experience);

  if (!isOpen || !editedExperience) return null;

  const name = editedExperience.name;
  const email = editedExperience.email;
  const location = editedExperience.location;
  const description = editedExperience.description;

  const handleInputChange = (e, field) => {
    setEditedExperience({
      ...editedExperience,
      [field]: e.target.value
    });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span className="popup-close" onClick={onClose}>X</span>
        <h2>Editing Experience Page</h2>
        <div className="popup-details">
          <div className="popup-info">
            <p>
              Name: 
              <input 
                type="text" 
                value={name} 
                onChange={(e) => handleInputChange(e, 'name')} 
              />
            </p>
            <p>
              Email: 
              <input 
                type="email" 
                value={email} 
                onChange={(e) => handleInputChange(e, 'email')} 
              />
            </p>
            <p>
              Country: 
              <input 
                type="text" 
                value={location?.country} 
                onChange={(e) => handleInputChange(e, 'location.country')} 
              />
              
            </p>
            <p>
              Region: 
              <input 
                type="text" 
                value={location?.city} 
                onChange={(e) => handleInputChange(e, 'location.city')} 
              />
            </p>
            <p>
              Description: 
              <textarea 
                value={description} 
                onChange={(e) => handleInputChange(e, 'description')} 
              />
            </p>
            {/* Add Accept button */}
            <button onClick={onClose}>Accept Changes</button>
            <button onClick={onClose}>Revert Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
