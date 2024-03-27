import React from 'react';
 import '../static/css/components/Filter.css';

 const FilterBox = () => {
   return (
     <div className="filter-box">
       <h2>Filter</h2>
       <label>
         <input type="checkbox" /> International Work
       </label>
       <label>
         <input type="checkbox" /> Volunteer Work
       </label>
       <label>
         <input type="checkbox" /> Study Abroad
       </label>
     </div>
   );
 }

 export default FilterBox;