import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState([]);
  const [map, setMap] = useState(null)

  // start of panning code
  const [pointerDown, setPointerDown] = useState(false);
  const [pointerOrigin, setPointerOrigin] = useState({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useState({
        x: 0,
        y: 0,
        width: 2000, // You may replace this with the appropriate initial width
        height: 857 // You may replace this with the appropriate initial height
    });

  const [newViewBox, setNewViewBox] = useState({ x: 0, y: 0 });

  // returns a point (the coordinate of the user's click)
  function getPoint(e) {
    const point = { x: 0, y: 0 }; // initial point
      // checks if user clicks the screen and gets coordinates
      if (e.targetTouches) {
          point.x = e.targetTouches[0].clientX;
          point.y = e.targetTouches[0].clientY;
      } 
      else {
          point.x = e.clientX;
          point.y = e.clientY;
      }
      return point;
  }

  // sets the position for when a user clicks the screen
  function handleMouseDown(e) {
      const position = getPoint(e);
      setPointerDown(true);
      setPointerOrigin({ x: position.x, y: position.y });
      document.body.style.cursor = "grabbing";
  }

  // handles grabbing and scrolling events
  function handleMouseMove(e) {
      if (!pointerDown) return; // returns if the user isn't holding down on the screen
      e.preventDefault(); // Prevents user from selecting something on the page

      // calculates and saves the new position
      const position = getPoint(e);
      const newViewBoxX = viewBox.x - ((position.x - pointerOrigin.x) * 0.8);
      const newViewBoxY = viewBox.y - ((position.y - pointerOrigin.y) * 0.8);

      // sets the new box with the new coordinates
      setNewViewBox({ x: newViewBoxX, y: newViewBoxY });
      // You should use state setter to update viewBox instead of direct mutation
      setViewBox({x: newViewBoxX, y: newViewBoxY });
  }

  // resets cursor when the user unclicks
  function handleMouseUp() {
      setPointerDown(false);
      document.body.style.cursor = "grab";

      viewBox.x = newViewBox.x;
      viewBox.y = newViewBox.y;
  }

  // resets cursor when the mouse leaves a country
  function handleMouseLeave() {
      setPointerDown(false);
      document.body.style.cursor = "grab";

      viewBox.x = newViewBox.x;
      viewBox.y = newViewBox.y;
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API}/experiences`).then((res) => {
      setExperiences(res.data);
      setLoading(false);
    }).catch((err) => {
        console.log(err);
        setLoading(false);
    });
    setMap(new WorldMap());
  }, []);

  if (loading) {
    return <div></div>;
  }

  console.log(experiences)

  return (
    <div>
      <NavBar />
      <svg id="world_map" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave}>
          {map.render()}
      </svg>
      {map.render()}
    </div>
  );
}

export default Home;
