import React from 'react';

import '../static/css/pages/AddPin.css';

const AddPin = () => {
  return (
    <div>
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
            <textarea id="experience" name="experience" rows="4" required></textarea>
          </div>
          <button class="pin_submit" type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default AddPin;
