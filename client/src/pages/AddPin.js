import React, { useState } from 'react';
import '../static/css/pages/AddPin.css';

const AddPin = () => {
  const [departments, setDepartments] = useState({
    Administration: false,
    Library: false,
    CSC: false,
    'School of Business': false,
    'School of Engineering': false,
    'School of Education': false,
    'School of Nursing': false,
    'College of Arts and Sciences': false,
  });

  const handleDepartmentChange = (department) => {
    setDepartments({
      ...departments,
      [department]: !departments[department],
    });
  };

  return (
    <div>
      <header>
        <h1>Add a Pin to the map</h1>
      </header>
      <main>
        <form action="/success" method="get" id="pin-form">
          <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input type="text" id="first-name" name="first-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" id="last-name" name="last-name" required />
          </div> 
          <div className="form-group">
            <label htmlFor="email">University of Portland Email:</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Department at University of Portland:</label>
            <div className="filter-box">
              {Object.keys(departments).map((department, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={departments[department]}
                    onChange={() => handleDepartmentChange(department)}
                  /> {department}
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" placeholder="Enter a location" required />
          </div>
          <div className="form-group">
            <label htmlFor="purpose">What did you travel for?</label>
            <select id="purpose" name="purpose" required>
              <option value="international work">International Work</option>
              <option value="volunteer work">Volunteer Work</option>
              <option value="study abroad">Study Abroad</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group" id="other-purpose">
            <label htmlFor="other-purpose-input">Please specify:</label>
            <input type="text" id="other-purpose-input" name="other-purpose-input" />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Tell us about your experience:</label>
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
