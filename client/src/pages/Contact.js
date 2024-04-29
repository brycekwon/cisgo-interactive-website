import React from 'react';

import NavBar from '../components/NavBar.js';
import '../static/css/pages/Contact.css';

const Contact = () => {
  return (
    <div class="contact_content">
      <main class="contact_main">
        <NavBar />
        <header class="contact_header">
          <h1 class="contact_title">Contact Us</h1>
        </header>
        <p class="contact_text">See the <a href="https://www.up.edu/cisgo/index.html">CISGO website</a> for information on all the activities of the Collaborative on International Studies 
          and Global Outreach. For more information, contact the site administrator at cisgomap@up.edu.</p>
      </main>
    </div>
  );
}

export default Contact;
