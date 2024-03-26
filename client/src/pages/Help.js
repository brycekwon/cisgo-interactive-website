import React from 'react';

import '../static/css/pages/Help.css';

const Help = () => {
  return (
    <div>
      <header className="title-header">
        <h1 className="title">Help Page</h1>
      </header>
      <main>
        <section className="help-section">
          <h2 className="subtitle">Pin Entry</h2>
          <p>
            To add your experience to the map, click on the map or globe at the location where you've
            studied or worked abroad. Then fill out the form fields with your information. Alternatively,
            you can <a href="add_pin.html">click here</a> to go directly to the Add a Pin page.
          </p>
        </section>
        <section className="help-section">
          <h2 className="subtitle">Search Filters</h2>
          <p>Use the filters on the map to refine your search:</p>
          <ul>
            <li>Date Range: Filter by the time period of experiences.</li>
            <li>Type of Work: Filter by international work or study abroad.</li>
            <li>College/Department: Filter by the educational institution or department.</li>
          </ul>
        </section>
        <section className="help-section">
          <h2 className="subtitle">Search Bar</h2>
          <p>
            Use the search bar to find specific experiences or locations. You can also use the advanced
            search feature to refine your search further.
          </p>
        </section>
        <section className="help-section">
          <h2 className="subtitle">Additional Help</h2>
          <p>If you need further assistance, feel free to reach out here:</p>
        </section>
      </main>
      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default Help;
