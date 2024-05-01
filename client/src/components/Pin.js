import React from 'react';
import pinImage from '../static/images/pin.png'; // Assuming the correct path to the pin image

const Pin = ({ country, x, y }) => {
  
  
  return(<image
    href={pinImage}
    x={x}
    y={y}
    country={country}
    width={20} // Adjust width as needed
    height={20} // Adjust height as needed
  />)
};

export default Pin;