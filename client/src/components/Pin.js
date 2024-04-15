import React from "react";
import pinImage from "../static/images/pin.png";

const Pin = ({ x, y, count }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <div style={{ position: "relative" }}>
      {/* Use the imported image */}
      <img src={pinImage} alt="Pin" />
      {/* Display count if there are multiple experiences */}
      {count > 1 && <span>{count}</span>}
    </div>
  </div>
);

export default Pin;
