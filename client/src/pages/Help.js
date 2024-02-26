import React from 'react';

import '../static/css/pages/Help.css';

const Help = () => {
  return (
    <div>
      <header>
        <h1>Help Page</h1>
    </header>
    <main>
        <section id="adding-pin">
            <h2>Adding a Pin</h2>
            <p>To add your experience to the map, click on the map or globe at the location where you've studied or worked abroad. Then fill out the form fields with your information. Alternatively, you can <a href="add_pin.html">click here</a> to go directly to the Add a Pin page.</p>
        </section>
        <section id="filter-options">
            <h2>Filter Options</h2>
            <p>Use the filters on the map to refine your search:</p>
            <ul>
                <li>Date Range: Filter by the time period of experiences.</li>
                <li>Type of Work: Filter by international work or study abroad.</li>
                <li>College/Department: Filter by the educational institution or department.</li>
            </ul>
        </section>
        <section id="search-bar">
            <h2>Search Bar</h2>
            <p>Use the search bar to find specific experiences or locations. You can also use the advanced search feature to refine your search further.</p>
        </section>
        <section id="additional-help">
            <h2>Additional Help</h2>
            <p>If you need further assistance, here are some additional resources:</p>
            {/* <ul>
                <li><strong><a href="faqs.html">FAQs</a>:</strong> Check out our Frequently Asked Questions section for common queries and their answers.</li>
                <li><strong><a href="contact_us.html">Contact Us</a>:</strong> If you still have questions or need personalized assistance, feel free to contact us directly.</li>
                <li><strong><a href="user_guide.html">User Guide</a>:</strong> Explore our comprehensive user guide for detailed instructions on using all features of the website.</li>
            </ul> */}
        </section>
    </main>
    <footer>
        <p></p>
    </footer>
    </div>
  );
}

export default Help;
