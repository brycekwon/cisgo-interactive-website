import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../static/css/components/NavBar.css';

const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggleNavBar = () => {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <div>
      <div className={`navbar ${navbarOpen ? "expanded" : "collapsed"}`}>
        <ul className="nav">
          <li className="expanded">
            <Link to="/">
              <i className="material-icons">home</i>
              Home
            </Link>
          </li>
          <li className="expanded">
            <Link to="/add">
              <i className="material-icons">location_on</i>
              Add a Pin
            </Link>
          </li>
          <li className="expanded">
            <Link to="/search">
              <i className="material-icons">search</i>
              Search
            </Link>
          </li>
          <li className="expanded">
            <Link to="/contact">
              <i className="material-icons">mail</i>
              Contact Us
            </Link>
          </li>
          <li className="expanded">
            <Link to="/about">
              <i className="material-icons">diversity_3</i>
              About Us
            </Link>
          </li>
          <li className="expanded">
            <Link to="/login">
              <i className="material-icons">lock</i>
              Login
            </Link>
          </li>
        </ul>
      </div>
      <div className={`toggle-button ${navbarOpen ? 'toggle-small' : ''}`} onClick={handleToggleNavBar}>
        <i className="material-icons">{navbarOpen ? 'close' : 'menu'}</i>
      </div>
    </div>
  );
};

export default NavBar;
