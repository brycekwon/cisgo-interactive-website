import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDropdown = () => {
    setOpen(!open);
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API}/experiences`).then((res) => {
      setExperiences(res.data);
      setLoading(false);
    }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div></div>;
  }

  console.log(experiences)


  return (
    <div>
      <ul>
        <li>
          <a class="active" href="index.html"><i class="material-icons">home</i>Home</a>
        </li>
        <li>
          <a href="add_pin.html"><i class="material-icons">location_on</i>Add a Pin</a>
        </li>
        <li>
          <button class="dropdown-button" href="#filter" onClick={handleDropdown}>Filter <i class="material-icons">expand_more</i></button>
          {open ? (
            <div class="filter-options">
              <a href="#">International Work</a>
              <a href="#">Volunteer Work</a>
              <a href="#">Study Abroad</a>
            </div>
          ) : null}
        </li>
        <li>
          <a href="faqs.html"><i class="material-icons">quiz</i>FAQs</a>
        </li>
        <li>
          <a href="contact_us.html"><i class="material-icons">mail</i>Contact Us</a>
        </li>
        <li>
          <a href="#about"><i class="material-icons">diversity_3</i>About Us</a>
        </li>
        <li>
          <a href="help.html"><i class="material-icons">help</i>Help</a>
        </li>
        <li>
          <a href="user_guide.html"><i class="material-icons">menu_book</i>User Guide</a>
        </li>
        <li>
          <input type="text" placeholder="Search..."></input>
        </li>
        <img alt="info-button" src="images/info.svg" title="information" class="info-button"></img>
      </ul>
      <WorldMap />
    </div>
  );
}

export default Home;
