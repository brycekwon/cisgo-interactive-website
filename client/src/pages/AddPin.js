import React from 'react';

import '../static/css/pages/AddPin.css';

const AddPin = () => {
  return (
    <div>
      <header>
        <h1>Add a Pin to the map</h1>
      </header>
      <main>
        <form action="/success" method="get" id="pin-form">
          <div class="form-group">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" name="first-name" required></input>
          </div>
          <div class="form-group">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" name="last-name" required></input>
          </div> 
          <div class="form-group">
            <label for="email">University of Portland Email:</label>
            <input type="text" id="email" name="email" required></input>
          </div>
          <div class="form-group">
            <label for="location">Location:</label>
            <input type="text" id="location" name="location" placeholder="Enter a location" required></input>
          </div>
          <div class="form-group">
            <label for="purpose">What did you travel for?</label>
            <select id="purpose" name="purpose" required>
              <option value="international work">International Work</option>
              <option value="volunteer work">Volunteer Work</option>
              <option value="study abroad">Study Abroad</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group" id="other-purpose">
            <label for="other-purpose-input">Please specify:</label>
            <input type="text" id="other-purpose-input" name="other-purpose-input"></input>
          </div>
          <div class="form-group">
            <label for="experience">Tell us about your experience:</label>
            <textarea id="experience" name="experience" rows="4" required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default AddPin;
