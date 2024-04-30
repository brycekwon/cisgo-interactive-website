
import React, { useState } from 'react';

import NavBar from '../components/NavBar.js';

import '../static/css/pages/AddPin.css';

const AddPin = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    country: '',
    purpose: 'international work',
    otherPurpose: '',
    experience: '',
    ongoing: false,
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    if (name === 'ongoing') {
      // Handle the ongoing checkbox separately
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
        // Remove end date when checking ongoing
        endDate: newValue ? '' : prevFormData.endDate, // Only remove end date if ongoing is checked
      }));
    } else {
      // Handle other form fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      const response = await fetch(`${process.env.REACT_APP_API}/experiences/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name into one field
          email: formData.email,
          affiliation: formData.affiliation,
          program: formData.program,
          location: {
            country: formData.country,
            city: '', // Assuming city is not provided in the form
          },
          external: {
            institutions: formData.institutions,
            partnerships: formData.partnerships,
          },
          description: formData.description,
          meta: {
            isApproved: false, // Set the experience as not approved
          },
          duration: {
            ongoing: formData.ongoing,
            startDate: formData.startDate,
            endDate: formData.endDate,
          },
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add experience');
      }
  
      // Handle success (e.g., redirect user, show success message)
      console.log('Experience added successfully');
    } catch (error) {
      console.error('Error adding experience:', error.message);
    }
  };
  
  
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

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas, The", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin (Dahomey)", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso (Upper Volta)", "Burma", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
    "Cayman Islands, The", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo Free State, The", "Costa Rica",
    "Cote d’Ivoire (Ivory Coast)", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands, The",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North German Confederation", "North German Union", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Panama", "Papal States", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of Genoa",
    "Republic of Korea (South Korea)", "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands, The", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
    "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "Union of Soviet Socialist Republics", "United Arab Emirates, The", "United Kingdom, The", "Uruguay",
    "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
  const handleDepartmentChange = (department) => {
    setDepartments({
      ...departments,
      [department]: !departments[department],
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (country) => {
    setSearchQuery(country);
    setShowSuggestions(false);
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="pin_header">
        <h1 className="pin_title">Add a Pin to the map</h1>
      </header>
      <main className="pin_content">
        <form onSubmit={handleSubmit} action="/success" method="get" id="pin-form">
          <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input type="text" id="first-name" name="firstName" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" id="last-name" name="lastName" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">University of Portland Email:</label>
            <input type="text" id="email" name="email" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Department at University of Portland:</label>
            <div className="filter">
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
            <input type="text" id="country-search" name="country" onChange={handleSearchChange} value={searchQuery} />
            {showSuggestions && (
              <div className="suggestions">
                {filteredCountries.map((country, index) => (
                  <div className="country-box" key={index} onClick={() => handleSuggestionClick(country)}>
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="purpose">What did you travel for?</label>
            <select id="purpose" name="purpose" required onChange={handleChange}>
              <option value="international work">International Work</option>
              <option value="volunteer work">Volunteer Work</option>
              <option value="study abroad">Study Abroad</option>
              <option value="other">Other</option>
            </select>
          </div>
          {formData.purpose === 'other' && (
            <div className="form-group" id="other-purpose">
              <label htmlFor="other-purpose-input">Please specify:</label>
              <input type="text" id="other-purpose-input" name="otherPurpose" onChange={handleChange} />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="affiliation">Affiliation:</label>
            <input type="text" id="affiliation" name="affiliation" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="program">Program:</label>
            <input type="text" id="program" name="program" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ongoing">Is the experience ongoing?</label>
            <input type="checkbox" id="ongoing" name="ongoing" onChange={handleChange} />
          </div>
          <div>
            {!formData.ongoing && (
              <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <input type="text" id="startDate" name="startDate" placeholder="YYYY-MM" required onChange={handleChange} />
              </div>
            )}
            {!formData.ongoing && (
              <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <input type="text" id="endDate" name="endDate" placeholder="YYYY-MM" required onChange={handleChange} />
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="institutions">External Institutions:</label>
            <input type="text" id="institutions" name="institutions" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="partnerships">External Partnerships:</label>
            <input type="text" id="partnerships" name="partnerships" onChange={handleChange} />
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
          <button type="submit">Submit</button>
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