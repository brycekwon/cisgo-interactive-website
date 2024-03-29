import React from 'react';
import '../static/css/components/Filter.css';

const FilterBox = () => {
  return (
    <div className="filter-box">
      <h2>Filter</h2>
      <label>
        <input type="checkbox" /> Administration
      </label>
      <label>
        <input type="checkbox" /> Library
      </label>
      <label>
        <input type="checkbox" /> CSC
      </label>
      <label>
        <input type="checkbox" /> School of Business
      </label>
      <label>
        <input type="checkbox" /> School of Engineering
      </label>
      <label>
        <input type="checkbox" /> School of Education
      </label>
      <label>
        <input type="checkbox" /> School of Nursing
      </label>
      <label>
        <input type="checkbox" /> College of Arts and Sciences
      </label>
    </div>
  );
}

export default FilterBox;
