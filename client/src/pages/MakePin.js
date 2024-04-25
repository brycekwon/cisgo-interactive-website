import React, { useRef } from 'react';

const makePin = (ourRef, latitude, longitude, title, iconPath) => {
    // Create a pin at the specified latitude and longitude
    const pin = document.createElement('div');
    pin.classList.add('pin');
    pin.style.backgroundImage = `url(${iconPath})`;
    pin.style.backgroundSize = 'contain';
    pin.title = title;
    pin.style.width = '100px'; // Set a fixed width
    pin.style.height = '100px'; // Set a fixed height

    pin.style.left = `${latitude}px`;
    pin.style.top = `${longitude}px`;

    // Optionally, you can add an event listener to the pin
    // Example: Open an info window when the pin is clicked
    pin.addEventListener('click', () => {
      // Handle click event
    });

    // Append the pin to the map container
    ourRef.appendChild(pin);

    // Return the pin element if you need to manipulate it later
    return pin;
};

const placePinsOnMap = (ourRef, experiences) => {
    if (!ourRef.current || experiences.length === 0) return;

    // Filter experiences for locations in China
    const chinaExperiences = experiences.filter(experience => experience.location.country === 'China');

    // Calculate the center point of China
    const chinaCenterX = (1602.2 + 1597.9 + 1593 + 1592 + 1594.2 + 1600 + 1603.3 + 1604.9 + 1602.9 + 1602.2) / 10;
    const chinaCenterY = (381.9 + 385 + 383 + 377.5 + 374.6 + 372.8 + 372.9 + 375.4 + 378.2 + 381.9) / 10;

    // Place a pin at the calculated center point of China
    const chinaCenterLatLng = { lat: chinaCenterY, lng: chinaCenterX };
    makePin(ourRef.current, chinaCenterLatLng.lat, chinaCenterLatLng.lng, 'Center of China', '../static/images/pin.png'); // Change here
};


export { makePin, placePinsOnMap };

