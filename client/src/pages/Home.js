import React, { useRef, useEffect, useState } from 'react';

import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';
import FilterBox from '../components/FilterBox.js';
import '../static/css/components/ExperiencesPopup.css';
import countryFlags from '../data/countryFlags.js';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState([]);
  const [map, setMap] = useState(null)
  const ourRef = useRef(null);
  const [pointerDown, setPointerDown] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [error, setError] = useState(null);
  const getCountryFlag = (countryName) => {
    const trimmedCountryName = countryName.trim();
    return countryFlags[trimmedCountryName] || ''; 
  };

  

  document.querySelectorAll(".allPaths").forEach(e=>{
  
    var country = document.getElementsByName(e.getAttribute('name'));
    var countryName = e.getAttribute('name')
   
    // function to detect if a user is hovering over a country
    function hovering(){
      // changes country color if hovering
      country.forEach(function(item){
        item.style.fill = "rgb(34, 59, 5)";
        item.style.transition = "0.2s";
        item.style.cursor = "pointer";
      })
    }
    // event listeners for hovering over countries
    e.addEventListener("mouseover", hovering);

    // resets country color after no longer hovering
    function out(){
      country.forEach(function(item){
        item.style.fill = "rgb(56, 78, 29)";
        item.style.stroke = "rgb(34, 59, 5)"
        item.style.strokeWidth = "1";
        item.style.transition = "0.2s";
        item.style.cursor = "grab";
      })
    }

    // event listener when user stops hovering over a country
    e.addEventListener("mouseout", out);

    // for country on-click
    const countrySelected = async (e) =>{
      const myName = countryName;
      e.preventDefault();
      console.log(myName);
      await fetch(`${process.env.REACT_APP_API}/experiences`, {
      method: "post",
      body: JSON.stringify({
          "query": myName,
      }),
      headers: {
          'Content-Type': 'application/json'
      }
      }).then(async (res) => {
          let data = await res.json();
          setExperiences(data);
      }).catch((err) => {
          console.log(err);
          setError(err);
      });
    }

    e.addEventListener("click", countrySelected);

  })
  const handleFilterMenu = () => {
    setFilterOpen(!filterOpen);
  }

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
    fetch(`${process.env.REACT_APP_API}/experiences`).then(async(res) => {
      setExperiences(await res.json());
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
    <div className="body">
      <NavBar />
      <div ref={ourRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
        {map.render()}
      </div>
      <div className="toggle-filter-button" onClick={handleFilterMenu}>
        <FilterBox />
      </div>
      <div className="bottom_container">
        <div className="close_button_container">
          <button className="close_button">Hide Experiences</button>
        </div>
        <div className="experiences_container">
          {experiences.map((post, index) => (
            <div className="box" key={index}>
              <div>
                <p>{post.name} ({post.email})</p>
                <p>{post.location.country}{post.location.city === null ? "" : ", " + post.location.city}</p>
              </div>
              <div className="country-flag-container">
                <img src={getCountryFlag(post.location.country)} alt="Country Flag" className="country-flag" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
