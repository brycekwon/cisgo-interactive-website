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
    setSearchQuery(country); // Set the search query to the clicked suggestion
    setShowSuggestions(false); // Close the suggestions
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

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
            <input type="text" id="country-search" name="country-search" onChange={handleSearchChange} value={searchQuery} />
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