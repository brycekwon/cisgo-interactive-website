import React from 'react';
import pinImage from '../static/images/pin.png'; // Assuming the correct path to the pin image

const Pin = ({ x, y }) => (
  <image
    href={pinImage}
    x={x}
    y={y}
    width={20} // Adjust width as needed
    height={20} // Adjust height as needed
  />
);

export default Pin;