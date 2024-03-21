import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../static/css/components/NavBar.css';

const NavBar = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterMenu = () => {
    setFilterOpen(!filterOpen);
  }

  const handleToggleNavBar = () => {
    setFilterOpen(!filterOpen);
  }

  return (
    <div>
      <div className={`navbar ${filterOpen ? "expanded" : "collapsed"}`}>
        <ul className="nav">
          <li className="expanded">
            <Link to="/">
              <i className="material-icons">home</i>
              Home
            </Link>
          </li>
          <li className="expanded">
            <Link to="/login">
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
            <Link to="/help">
              <i className="material-icons">help</i>
              Help
            </Link>
          </li>
          <li className="expanded">
            <Link onClick={handleFilterMenu}>
              Filter
              <i className="material-icons">{filterOpen ? ("expand_less") : ("expand_more")}</i>
            </Link>
            {filterOpen ? (
              <div>
                <button>International Work</button>
                <button>Volunteer Work</button>
                <button>Study Abroad</button>
              </div>
            ) : null}
          </li>
        </ul>
      </div>
      <div className="toggle-button" onClick={handleToggleNavBar}>
             {filterOpen ? (
          <i className="material-icons">close</i>
        ) : (
          <i className="material-icons">menu</i>
        )}
      </div>
    </div>
  );
};

export default NavBar;
