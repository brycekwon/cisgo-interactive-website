import '../static/css/pages/Pin.css';
// MakePin.js
const makePin = (ourRef, country, numberOfExperiences) => {
  // Create a pin element
  const pin = document.createElement('div');
  pin.classList.add('pin');

  // Set class based on country
  switch (country) {
    case 'China':
      pin.classList.add('china-pin');
      break;
    case 'USA':
      pin.classList.add('usa-pin');
      break;
    default:
      pin.classList.add('default-pin');
      break;
  }

  // Create a pin number element to display the number of experiences
  const pinNumber = document.createElement('div');
  pinNumber.classList.add('pin-number');
  pinNumber.textContent = numberOfExperiences;

  // Append the pin and pin number to the map container
  ourRef.appendChild(pin);
  ourRef.appendChild(pinNumber);

  // Return pin and pin number elements
  return { pin, pinNumber };
};

export { makePin };
