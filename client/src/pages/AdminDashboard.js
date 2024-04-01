import React, { useState, useEffect } from 'react';
import Popup from '../components/SearchPopup.js';
import countryFlags from '../data/countryFlags.js';
import '../static/css/pages/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [sortByAll, setSortByAll] = useState('recentToLatest');
  const [sortByVisible, setSortByVisible] = useState('recentToLatest');
  const [sortByHidden, setSortByHidden] = useState('recentToLatest');
  const [sortByUnapproved, setSortByUnapproved] = useState('recentToLatest');
  const [searchFiltersAll, setSearchFiltersAll] = useState({
    location: '',
    name: '',
    email: '',
    description: ''
  });
  const [searchFiltersVisible, setSearchFiltersVisible] = useState({
    location: '',
    name: '',
    email: '',
    description: ''
  });
  const [searchFiltersHidden, setSearchFiltersHidden] = useState({
    location: '',
    name: '',
    email: '',
    description: ''
  });
  const [searchFiltersUnapproved, setSearchFiltersUnapproved] = useState({
    location: '',
    name: '',
    email: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab, sortByAll, sortByVisible, sortByHidden, sortByUnapproved]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response;
      let sortByParam;

      switch (activeTab) {
        case 'Visible':
          sortByParam = sortByVisible;
          response = await fetch(`${process.env.REACT_APP_API}/experiences?isVisible=true&isApproved=true&sortBy=${sortByParam}`);
          break;
        case 'Hidden':
          sortByParam = sortByHidden;
          response = await fetch(`${process.env.REACT_APP_API}/experiences?isVisible=false&sortBy=${sortByParam}`);
          break;
        case 'Unapproved':
          sortByParam = sortByUnapproved;
          response = await fetch(`${process.env.REACT_APP_API}/experiences?isApproved=false&sortBy=${sortByParam}`);
          break;
        default:
          // For 'All' tab, fetch all experiences regardless of visibility or approval status
          sortByParam = sortByAll;
          response = await fetch(`${process.env.REACT_APP_API}/experiences?sortBy=${sortByParam}`);
          break;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      let data = await response.json();

      // Sort data based on selected sort option for the current tab
      switch (sortByParam) {
        case 'firstName':
          data.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'country':
          data.sort((a, b) => a.location.country.localeCompare(b.location.country));
          break;
        default:
          // No sorting required for other options
          break;
      }

      // Filter data based on visibility and approval status for specific tabs
      switch (activeTab) {
        case 'Visible':
          data = data.filter(experience => experience.meta.isVisible && experience.meta.isApproved);
          break;
        case 'Hidden':
          data = data.filter(experience => !experience.meta.isVisible);
          break;
        case 'Unapproved':
          data = data.filter(experience => !experience.meta.isApproved);
          break;
        default:
          break;
      }

      setExperiences(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const openPopup = (experience) => {
    setSelectedExperience(experience);
  };



  const closePopup = () => {
    setSelectedExperience(null);
  };

  const handleAction = async (action, experience, event) => {
    try {
      switch (action) {
        case 'edit':
          // Handle edit action
          break;
        case 'hide':
          // Show confirmation popup
          const hideConfirmed = window.confirm("Are you sure you want to hide?");
          if (hideConfirmed) {
            event.stopPropagation(); // Stop event propagation to avoid triggering the popup
            const updatedExperienceHide = { ...experience, meta: { ...experience.meta, isVisible: false } };
            await fetch(`${process.env.REACT_APP_API}/experiences/${experience.id}`, {
              method: 'PUT',
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
              method: 'PUT',
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
  




  const handleInputChangeAll = (e, filterName) => {
    setSearchFiltersAll({
      ...searchFiltersAll,
      [filterName]: e.target.value
    });
  };

  const handleInputChangeVisible = (e, filterName) => {
    setSearchFiltersVisible({
      ...searchFiltersVisible,
      [filterName]: e.target.value
    });
  };

  const handleInputChangeHidden = (e, filterName) => {
    setSearchFiltersHidden({
      ...searchFiltersHidden,
      [filterName]: e.target.value
    });
  };

  const handleInputChangeUnapproved = (e, filterName) => {
    setSearchFiltersUnapproved({
      ...searchFiltersUnapproved,
      [filterName]: e.target.value
    });
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


  const handleSubmit = () => {
    switch (activeTab) {
      case 'All':
        // Handle submit for All tab
        console.log('Search filters for All tab:', searchFiltersAll);
        fetchData(); // Fetch data with new filters and sort for All tab
        break;
      case 'Visible':
        // Handle submit for Visible tab
        console.log('Search filters for Visible tab:', searchFiltersVisible);
        fetchData(); // Fetch data with new filters and sort for Visible tab
        break;
      case 'Hidden':
        // Handle submit for Hidden tab
        console.log('Search filters for Hidden tab:', searchFiltersHidden);
        fetchData(); // Fetch data with new filters and sort for Hidden tab
        break;
      case 'Unapproved':
        // Handle submit for Unapproved tab
        console.log('Search filters for Unapproved tab:', searchFiltersUnapproved);
        fetchData(); // Fetch data with new filters and sort for Unapproved tab
        break;
      default:
        break;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="sort-switch">
        <p>Sort By:</p>
        <select value={activeTab === 'All' ? sortByAll : activeTab === 'Visible' ? sortByVisible : activeTab === 'Hidden' ? sortByHidden : sortByUnapproved} onChange={e => activeTab === 'All' ? setSortByAll(e.target.value) : activeTab === 'Visible' ? setSortByVisible(e.target.value) : activeTab === 'Hidden' ? setSortByHidden(e.target.value) : setSortByUnapproved(e.target.value)}>
          <option value="firstName">First Name</option>
          <option value="country">Country</option>
          <option value="recentToLatest">Recent to Latest</option>
          <option value="latestToRecent">Latest to Recent</option>
        </select>
      </div>

      {/* Search containers for different tabs */}
      {activeTab === 'All' && (
        <div className="search-container-all">
          <div className="advanced-search-title">Advanced Search </div>
          <div className="search-boxes">
            <div className="search-box">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={searchFiltersAll.location}
                onChange={(e) => handleInputChangeAll(e, 'location')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={searchFiltersAll.name}
                onChange={(e) => handleInputChangeAll(e, 'name')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={searchFiltersAll.email}
                onChange={(e) => handleInputChangeAll(e, 'email')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={searchFiltersAll.description}
                onChange={(e) => handleInputChangeAll(e, 'description')}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Visible' && (
        <div className="search-container-visible">
          <div className="advanced-search-title">Advanced Search </div>
          <div className="search-boxes">
            <div className="search-box">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={searchFiltersVisible.location}
                onChange={(e) => handleInputChangeVisible(e, 'location')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={searchFiltersVisible.name}
                onChange={(e) => handleInputChangeVisible(e, 'name')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={searchFiltersVisible.email}
                onChange={(e) => handleInputChangeVisible(e, 'email')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={searchFiltersVisible.description}
                onChange={(e) => handleInputChangeVisible(e, 'description')}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Hidden' && (
        <div className="search-container-hidden">
          <div className="advanced-search-title">Advanced Search </div>
          <div className="search-boxes">
            <div className="search-box">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={searchFiltersHidden.location}
                onChange={(e) => handleInputChangeHidden(e, 'location')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={searchFiltersHidden.name}
                onChange={(e) => handleInputChangeHidden(e, 'name')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={searchFiltersHidden.email}
                onChange={(e) => handleInputChangeHidden(e, 'email')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={searchFiltersHidden.description}
                onChange={(e) => handleInputChangeHidden(e, 'description')}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Unapproved' && (
        <div className="search-container-unapproved">
          <div className="advanced-search-title">Advanced Search </div>
          <div className="search-boxes">
            <div className="search-box">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={searchFiltersUnapproved.location}
                onChange={(e) => handleInputChangeUnapproved(e, 'location')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={searchFiltersUnapproved.name}
                onChange={(e) => handleInputChangeUnapproved(e, 'name')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={searchFiltersUnapproved.email}
                onChange={(e) => handleInputChangeUnapproved(e, 'email')}
              />
            </div>
            <div className="search-box">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={searchFiltersUnapproved.description}
                onChange={(e) => handleInputChangeUnapproved(e, 'description')}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit button based on active tab */}
      {activeTab === 'All' && (
        <button className="submit-button submit-button-all" onClick={handleSubmit}>Submit</button>
      )}

      {activeTab === 'Visible' && (
        <button className="submit-button submit-button-visible" onClick={handleSubmit}>Submit</button>
      )}

      {activeTab === 'Hidden' && (
        <button className="submit-button submit-button-hidden" onClick={handleSubmit}>Submit</button>
      )}

      {activeTab === 'Unapproved' && (
        <button className="submit-button submit-button-unapproved" onClick={handleSubmit}>Submit</button>
      )}

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
          {error && <p>{error}</p>}
          {!loading && !error && experiences.map((experience, index) => (
            <div className="dashboard-item" key={index} onClick={() => openPopup(experience)}>
              <div className="item-info">
                <p>Name: {experience.name}</p>
                <p>Email: {experience.email}</p>
                <p>Country: {experience.location.country}</p>
              </div>
              <div className="item-options">
                {experience.meta && !experience.meta.isApproved && (
                  <span className="icon icon-exclamation">&#9888;</span>
                )}
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



      <Popup isOpen={selectedExperience !== null} onClose={closePopup} experience={selectedExperience} />
    </div>
  );
};

export default AdminDashboard;
