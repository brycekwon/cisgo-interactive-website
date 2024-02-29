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

  // start of panning code
  const [pointerDown, setPointerDown] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  
  // coordinates of the mouse's position
  const coords = useRef({
        x: 0,
        y: 0,
        scrollLeft: 0,
        scrollTop: 0
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
      console.log(getPoint(e));
      const position = getPoint(e);
      const startX = e.pageX - position.offsetLeft;
      const startY = e.pageY - position.offsetTop;
      const scrollX = position.scrollLeft;
      const scrollY = position.scrollTop;
      coords.current = { startX, startY, scrollX, scrollY }
      setPointerDown(true)
      document.body.style.cursor = "grabbing"
      

  }

  // handles grabbing and scrolling events
  const handleMouseMove = (e) => {
      if (!pointerDown || !ourRef.current) return; // returns if the user isn't holding down on the screen
      e.preventDefault(); // Prevents user from selecting something on the page

      // calculates and saves the new position
      const position = getPoint(e);
      const startX = e.pageX - position.offsetLeft;
      const startY = e.pageY - position.offsetTop;
      const walkX = (startX - coords.current.startX) * 0.8;
      const walkY = (startY - coords.current.startY) * 0.8;
      position.scrollLeft = coords.current.scrollLeft - walkX;
      position.scrollTop = coords.current.scrollTop - walkY;

      // // sets the new box with the new coordinates
      // setNewViewBox({ x: newViewBoxX, y: newViewBoxY });
      // // You should use state setter to update viewBox instead of direct mutation
      // setViewBox({x: newViewBoxX, y: newViewBoxY });
      document.body.style.cursor = "grabbing";
      setScrolling(true)
      console.log(position);
  }

  // resets cursor when the user unclicks
  const handleMouseUp = () => {
      if (!ourRef.current) return
      document.body.style.cursor = "grab";
      setPointerDown(false)
      setScrolling(false)

      // viewBox.x = newViewBox.x;
      // viewBox.y = newViewBox.y;
  }

  // resets cursor when the mouse leaves a country
  const handleMouseLeave = () => {
      if (!ourRef.current) return
      document.body.style.cursor = "grab";

      setPointerDown(false)
      setScrolling(false)
      // viewBox.x = newViewBox.x;
      // viewBox.y = newViewBox.y;
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
      <div ref={ourRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
        {map.render()}
      </div>
    </div>
  );
}

export default Home;
