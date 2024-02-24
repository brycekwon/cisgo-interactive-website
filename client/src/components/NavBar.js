import React, { useState } from "react";
import { Link } from 'react-router-dom';

import '../static/css/components/NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleNavMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleFilterMenu = () => {
    setFilterOpen(!filterOpen);
  }

  return (
    <ul className="opened">
      <li className="expanded">
        <Link onClick={handleNavMenu}>
          <i class="material-icons">menu</i>
          Menu
        </Link>
      </li>
      <li className="expanded">
        <Link to="/add">
          <i class="material-icons">location_on</i>
          Add a Pin
        </Link>
      </li>
      <li className="expanded">
        <Link to="/search">
          <i class="material-icons">search</i>
          Search
        </Link>
      </li>
      <li className="expanded">
        <Link to="/contact">
          <i class="material-icons">mail</i>
          Contact Us
        </Link>
      </li>
      <li className="expanded">
        <Link to="/about">
          <i class="material-icons">diversity_3</i>
          About Us
        </Link>
      </li>
      <li className="expanded">
        <Link to="/help">
          <i class="material-icons">help</i>
          Help
        </Link>
      </li>
      <li className="expanded">
        <Link onClick={handleFilterMenu}>
          Filter
          <i class="material-icons">{filterOpen ? ("expand_less") : ("expand_more")}</i>
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
  );

};

export default NavBar;
