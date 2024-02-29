import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState([]);
  const [map, setMap] = useState(null)
  const ourRef = useRef(null);
  const [pointerDown, setPointerDown] = useState(false);
  
  // coordinates of the mouse's position
  const coords = useRef({
        x: 0,
        y: 0,
    });

  // view box position before scrolling
  const oldViewBox = useRef({
    x: 0,
    y: 0,
  });

  // view box position after scrolling
  const newViewBox = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  // returns a point (the coordinate of the user's click)
  const getPoint = (e) => {
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
  const handleMouseDown = (e) => {
      if (!ourRef.current) return
      const position = getPoint(e);
      coords.current = position;
      setPointerDown(true)
      document.body.style.cursor = "grabbing"
  }

  // handles grabbing and scrolling events
  const handleMouseMove = (e) => {
      if (!pointerDown || !ourRef.current) return; // returns if the user isn't holding down on the screen
      e.preventDefault(); // Prevents user from selecting something on the page

      // calculates and saves the new position
      const position = getPoint(e);

      // newViewBox object updated every mouse move
      newViewBox.current = {
        x: oldViewBox.current.x - ((position.x - coords.current.x) * 0.8),
        y: oldViewBox.current.y - ((position.y - coords.current.y) * 0.8),
        width: ourRef.current.getBoundingClientRect().width,
        height: ourRef.current.getBoundingClientRect().height
      }
      
      // sets new viewbox
      setMap(map.setViewBox(`${newViewBox.current.x} ${newViewBox.current.y} ${newViewBox.current.width} ${newViewBox.current.height}`));
      document.body.style.cursor = "grabbing";
  }

  // resets cursor when the user unclicks
  const handleMouseUp = () => {
      if (!ourRef.current) return
      document.body.style.cursor = "grab";
      setPointerDown(false)
      oldViewBox.current.x = newViewBox.current.x;
      oldViewBox.current.y = newViewBox.current.y;
  }

  // resets cursor when the mouse leaves a country
  const handleMouseLeave = () => {
      if (!ourRef.current) return
      document.body.style.cursor = "grab";
      setPointerDown(false)
      oldViewBox.current.x = newViewBox.current.x;
      oldViewBox.current.y = newViewBox.current.y;
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
    setMap(new WorldMap(null));
  }, []);

  if (loading) {
    return <div></div>;
  }

  console.log(experiences)

  return (
    <div>
      <NavBar />
      <div ref={ourRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
        {map.render()}
      </div>
    </div>
  );
}

export default Home;
