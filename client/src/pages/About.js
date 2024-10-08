import React from 'react';

import NavBar from '../components/NavBar.js';
import '../static/css/pages/About.css';

const About = () => {
  return (
    <div class='about_container'>
      <main class='about_main'>
        <NavBar />
        <header class='about_header'>
          <h1 class='about_title'>About Us</h1>
        </header>
        <p class='about_text'>
          This mapping project was conceived as a way to share the good work that UP faculty, staff, and alumni have 
          engaged in around the world. The map stores information about different projects, research, work and other 
          activities that our community has completed or is currently engaged in. We hope that this map serves as a 
          resource for our UP community to connect with one another, share expertise, and brainstorm future projects. 
          See the CISGO website for information on all the activities of the Collaborative on International Studies and 
          Global Outreach.
        </p>
        <div class='about_footer'>
          <p>For more information, contact the site administrator at cisgomap@up.edu.</p>
        </div>
      </main>
    </div>
  );
}

export default About;
