import React, { useState, useEffect } from 'react';
import Popup from '../components/SearchPopup.js';
import EditPopup from '../components/EditPopup.js';
import '../static/css/pages/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [activeSort, setActiveSort] = useState('Country');
  const [fetchDataFlag, setFetchDataFlag] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false); // State variable for edit popup

  useEffect(() => {
    if (fetchDataFlag) {
      fetchData();
      setFetchDataFlag(false);
    }
  }, [fetchDataFlag]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response = await fetch(`${process.env.REACT_APP_API}/experiences/people?tab=${activeTab}&sortBy=${activeSort}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      let data = await response.json();

      setExperiences(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFetchDataFlag(true);
  };

  const handleSortClick = (option) => {
    setActiveSort(option)
    setFetchDataFlag(true);
  }

  const openPopup = (experience) => {
    setSelectedExperience(experience);
  };

  const closePopup = () => {
    setSelectedExperience(null);
  };

  const handleEditClick = (experience) => {
    setSelectedExperience(experience);
    setEditPopupOpen(true);
  };

  const handleEditPopupClose = () => {
    setEditPopupOpen(false); // Update editPopupOpen state to false
    setSelectedExperience(null);
  };
  

  const handleAction = async (action, experience, event) => {
    try {
      switch (action) {
        case 'edit':
          handleEditClick(experience);
          break;
        case 'hide':
          // Show confirmation popup
          const hideConfirmed = window.confirm("Are you sure you want to hide?");
          if (hideConfirmed) {
            event.stopPropagation(); // Stop event propagation to avoid triggering the popup
            const updatedExperienceHide = { ...experience, meta: { ...experience.meta, isVisible: false } };
            await fetch(`${process.env.REACT_APP_API}/experiences/${experience.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedExperienceHide),
            });
            // Update the experience list in the state
            const updatedExperiencesHide = experiences.map(exp => {
              if (exp.id === experience.id) {
                return updatedExperienceHide;
              }
              return exp;
            });
            setExperiences(updatedExperiencesHide); // Update experiences state with the updated experience
          }
          break;
        case 'unhide':
          // Show confirmation popup
          const unhideConfirmed = window.confirm("Are you sure you want to unhide?");
          if (unhideConfirmed) {
            event.stopPropagation(); // Stop event propagation to avoid triggering the popup
            const updatedExperienceUnhide = { ...experience, meta: { ...experience.meta, isVisible: true } };
            await fetch(`${process.env.REACT_APP_API}/experiences/${experience.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedExperienceUnhide),
            });
            // Update the experience list in the state
            const updatedExperiencesUnhide = experiences.map(exp => {
              if (exp.id === experience.id) {
                return updatedExperienceUnhide;
              }
              return exp;
            });
            setExperiences(updatedExperiencesUnhide); // Update experiences state with the updated experience
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error handling action:', error);
      // Handle error if needed
    }
  };

  const handleApprove = (experience) => {
    // Show confirmation popup
    const isConfirmed = window.confirm("Are you sure you want to approve?");
    if (isConfirmed) {
      // Call function to approve
    }
  };

  const handleDecline = (experience) => {
    // Show confirmation popup
    const isConfirmed = window.confirm("Are you sure you want to decline?");
    if (isConfirmed) {
      // Call function to decline
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-options">
          <div className="user-icon dropdown">
            <button className="dropbtn"></button>
            <div className="user-dropdown dropdown-content">
              <a href="/view-map">View Map</a>
              <a href="/change-password">Change Password</a>
              <a href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </div>
  
      <div className="sort-switch">
        <p>Sort By:</p>
        <select>
          <option value="country" onClick={() => handleSortClick('Country')}>Country</option>
          <option value="name" onClick={() => handleSortClick('Name')}>Name</option>
        </select>
      </div>
  
      {/* Tabs */}
      <div className="dashboard-tabs">
        <div className={`tab ${activeTab === 'All' ? 'active active-top' : ''}`} onClick={() => handleTabClick('All')}>All</div>
        <div className={`tab ${activeTab === 'Visible' ? 'active' : ''}`} onClick={() => handleTabClick('Visible')}>Visible</div>
        <div className={`tab ${activeTab === 'Hidden' ? 'active' : ''}`} onClick={() => handleTabClick('Hidden')}>Hidden</div>
        <div className={`tab ${activeTab === 'Unapproved' ? 'active' : ''}`}>
          <div className="unapproved-clickable" onClick={() => handleTabClick('Unapproved')}>Unapproved</div>
        </div>
      </div>
  
      {/* Dashboard content */}
      <div className="dashboard-content-container">
        <div className="dashboard-content">
          {loading && <p>Loading...</p>}
          {!loading && experiences.map((experience, index) => (
            <div className="dashboard-item" key={index} onClick={() => openPopup(experience)}>
              <div className="item-info">
                <p>Name: {experience.name}</p>
                <p>Email: {experience.email}</p>
                <p>Country: {experience.location.country}</p>
              </div>
              <div className="item-options">
                {experience.meta && !experience.meta.isVisible && (
                  <span className="icon icon-eye"></span>
                )}
              </div>
              <div className="options-dots">
                <button className="dropbtn">&#8942;</button>
                <div className="dropdown-content">
                  <button onClick={(event) => { event.stopPropagation(); handleAction('edit', experience); }}>Edit</button>
                  {experience.meta && experience.meta.isVisible && <button onClick={(event) => { event.stopPropagation(); handleAction('hide', experience); }}>Hide</button>}
                  {!experience.meta.isVisible && <button onClick={(event) => { event.stopPropagation(); handleAction('unhide', experience); }}>Unhide</button>}
                </div>
              </div>
              {!experience.meta.isApproved && (
                <div className="approve-decline-options">
                  <button style={{ backgroundColor: 'green' }} onClick={(event) => { event.stopPropagation(); handleApprove(experience); }}>Approve</button>
                  <button style={{ backgroundColor: 'red' }} onClick={(event) => { event.stopPropagation(); handleDecline(experience); }}>Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  
      {selectedExperience && (
      <>
        {editPopupOpen ? (
          <EditPopup isOpen={editPopupOpen} onClose={handleEditPopupClose} experience={selectedExperience} />
        ) : (
          <Popup isOpen={!editPopupOpen && selectedExperience !== null} onClose={closePopup} experience={selectedExperience} />
        )}
      </>
    )}
    </div>
  );
  
};

export default AdminDashboard;
