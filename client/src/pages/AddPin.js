import React from 'react';

import NavBar from '../components/NavBar.js';
import '../static/css/pages/AddPin.css';

const AddPin = () => {
  return (
    <div>
      <NavBar />
      <header class="pin_header">
        <h1 class="pin_title">Add a Pin to the map</h1>
      </header>
      <main class="pin_content">
        <form action="/success" method="get" id="pin-form">
          <div class="form-group">
            <label class="pin_labels" for="first-name">First Name:</label>
            <input type="text" id="first-name" name="first-name" required></input>
          </div>
          <div class="form-group">
            <label class="pin_labels" for="last-name">Last Name:</label>
            <input type="text" id="last-name" name="last-name" required></input>
          </div> 
          <div class="form-group">
            <label class="pin_labels" for="email">University of Portland Email:</label>
            <input type="text" id="email" name="email" required></input>
          </div>
          <div class="form-group">
            <label class="pin_labels" for="location">Location:</label>
            <input type="text" id="location" name="location" placeholder="Enter a location" required></input>
          </div>
          <div class="form-group">
            <label class="pin_labels" for="purpose">What did you travel for?</label>
            <select id="purpose" name="purpose" required>
              <option value="international work">International Work</option>
              <option value="volunteer work">Volunteer Work</option>
              <option value="study abroad">Study Abroad</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group" id="other-purpose">
            <label class="pin_labels" for="other-purpose-input">Please specify:</label>
            <input type="text" id="other-purpose-input" name="other-purpose-input"></input>
          </div>
          <div class="form-group">
            <label class="pin_labels" for="experience">Tell us about your experience:</label>
            <p class="exp_desc">Please give a short summary of the experience or project you were involved in. 
            Think about including what you did, why you did it, and briefly explaining outcomes? You might also 
            include whether you were you working alone or with others, as well as with or for a particular government 
            agency, NGO, university, religious organization, or corporation. Finally, our mapping precision may not 
            include small towns or rural villages in all countries. Be sure to specify the place you were during your 
            experience abroad.</p>
            <textarea id="experience" name="experience" rows="4" required></textarea>
          </div>
          <button class="pin_submit" type="submit">Submit</button>
        </form>
      </main>
      <footer class="pin_footer">
        This information is on a secure server, and you can choose to share your email or keep it private. 
        Only the administrator has access to the database. If you have additional questions about the form, 
        please contact our administrator at cisgomap@up.edu.
      </footer>
    </div>
  );
}

export default AddPin;
