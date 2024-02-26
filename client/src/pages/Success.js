import React from 'react';

import '../static/css/pages/Success.css';

const Success = () => {
  return (
    <div>
        <div id="thank-you" >
          <h2>Thank you for your submission!</h2>
          <p>Your input will be reviewed and a copy of your response will be sent to your email.</p>
          <a href="#" id="submit-another-pin">Submit Another Pin</a>
          <a href="#" id="home">Home</a>
        </div>
    </div>
  );
}

export default Success;
