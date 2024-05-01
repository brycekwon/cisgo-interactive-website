import React from 'react';
import '../static/css/pages/ChangePassword.css';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Password change logic here (e.g., send data to server)
    const currentPassword = event.target.elements.currentPassword.value;
    const newPassword = event.target.elements.newPassword.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    // Reset form
    event.target.reset();
  };

  return (
    <div>
      <div className="cp-return-container">
        <Link to="/admin" className="cp-return-button">&#8592; Return</Link>
      </div>
  
      <div className="cp-container">      
        <form className="cp-form" onSubmit={handleSubmit}>
          <h1>Change Password</h1>
          <div className="cp-form-group">
            <label htmlFor="current-password">Current Password:</label>
            <input type="password" id="current-password" name="currentPassword" />
          </div>
  
          <div className="cp-form-group">
            <label htmlFor="new-password">New Password:</label>
            <input type="password" id="new-password" name="newPassword" />
          </div>
  
          <div className="cp-form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirmPassword" />
          </div>
  
          <button type="submit" className="cp-btn">Change Password</button>
        </form>
      </div>
    </div>
  );
  
};

export default ChangePassword;
