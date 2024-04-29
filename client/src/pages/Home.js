import React, { useRef, useEffect, useState } from 'react';
import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';
import FilterBox from '../components/FilterBox.js';
import { debounce } from 'lodash';
import '../static/css/components/ExperiencesPopup.css';
import countryFlags from '../data/countryFlags.js';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const ourRef = useRef(null);
  const coords = useRef({ x: 0, y: 0 }); // Define coords here
  const [pointerDown, setPointerDown] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewBoxValues, setViewBoxValues] = useState({ x: 0, y: 0, width: 2000, height: 857 });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/experiences`)
      .then(async (res) => {
        const data = await res.json();
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
      await fetch(`${process.env.REACT_APP_API}/experiences?q=` + myName, {
      method: "get",
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
  // returns a point (the coordinate of the user's click)
  const getPoint = (e) => {
    const point = { x: 0, y: 0 };
    if (e.targetTouches) {
      point.x = e.targetTouches[0].clientX;
      point.y = e.targetTouches[0].clientY;
    } else {
      point.x = e.clientX;
      point.y = e.clientY;
    }
    return point;

  };
  const handleMouseDown = (e) => {
    const point = getPoint(e);
    coords.current = point; // Use coords ref here
    setPointerDown(true);
    document.body.style.cursor = 'grabbing';
  };

  // WITH DEBOUNCE TIME
  const handleMouseMove = debounce((e) => {
    if (!pointerDown || !ourRef.current) return;
    const currentPoint = getPoint(e);
    const dx = currentPoint.x - coords.current.x;
    const dy = currentPoint.y - coords.current.y;
  
    // Calculate new potential view box values based on the drag movement
    let newX = viewBoxValues.x - dx;
    let newY = viewBoxValues.y - dy;
  
    // Define the boundaries for panning
    const minX = -100; // Example minimum x value
    const maxX = 1000; // Example maximum x value (adjust based on your map's size)
    const minY = -100; // Example minimum y value
    const maxY = 500; // Example maximum y value (adjust based on your map's size)
  
    // Apply constraints to the new view box values to ensure they're within boundaries
    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));
  
    // Update state to move the view box within the allowed boundaries
    setViewBoxValues(prevValues => ({
      ...prevValues,
      x: newX,
      y: newY
    }));
  
    // Update the start point for the next move
    coords.current = currentPoint;
  }, 16);
  
  // // WITHOUT DEBOUNCE TIME
  // const handleMouseMove = (e) => {
  //   if (!pointerDown || !ourRef.current) return;
  //   const currentPoint = getPoint(e);
  //   const dx = currentPoint.x - coords.current.x;
  //   const dy = currentPoint.y - coords.current.y;
  
  //   // Calculate new potential view box values based on the drag movement
  //   let newX = viewBoxValues.x - dx;
  //   let newY = viewBoxValues.y - dy;
  
  //   // Define the boundaries for panning
  //   const minX = -100; // Example minimum x value
  //   const maxX = 1000; // Example maximum x value (adjust based on your map's size)
  //   const minY = -100; // Example minimum y value
  //   const maxY = 500; // Example maximum y value (adjust based on your map's size)
  
  //   // Apply constraints to the new view box values to ensure they're within boundaries
  //   newX = Math.max(minX, Math.min(newX, maxX));
  //   newY = Math.max(minY, Math.min(newY, maxY));
  
  //   // Update state to move the view box within the allowed boundaries
  //   setViewBoxValues(prevValues => ({
  //     ...prevValues,
  //     x: newX,
  //     y: newY
  //   }));
  
  //   // Update the start point for the next move
  //   coords.current = currentPoint;
  // };
  

  const handleMouseUpOrLeave = () => {
    setPointerDown(false);
    document.body.style.cursor = 'default';
  };

  useEffect(() => {
    const paths = document.querySelectorAll('.allPaths');

    const handleMouseOver = e => {
      e.target.style.fill = 'rgb(34, 59, 5)';;  
    };

    const handleMouseOut = e => {
      e.target.style.fill = '';  // Reset to default or specific fill color
    };

    paths.forEach(path => {
      path.addEventListener('mouseover', handleMouseOver);
      path.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      paths.forEach(path => {
        path.removeEventListener('mouseover', handleMouseOver);
        path.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);  // Dependency array left empty to run effect only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }


  const showExperiences = () =>{
    let showContainer = document.getElementById('experiences_container');
    let showButton = document.getElementById('show_button');
    let hideButton = document.getElementById('hide_button');
    showButton.style.display = "none";
    hideButton.style.display = "block";
    showContainer.style.display = "flex";
  }

  const hideExperiences = () =>{
    let hideContainer = document.getElementById('experiences_container');
    let showButton = document.getElementById('show_button');
    let hideButton = document.getElementById('hide_button');
    hideButton.style.display = "none";
    showButton.style.display = "block";
    hideContainer.style.display = 'none';
  }

  return (
    <div className="body">
      <NavBar />
      <div 
        ref={ourRef} 
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseUpOrLeave} 
        onMouseUp={handleMouseUpOrLeave}
      >
        {/* Updated to use the correct variable for viewBox */}
        <WorldMap viewBox={`${viewBoxValues.x} ${viewBoxValues.y} ${viewBoxValues.width} ${viewBoxValues.height}`} />
      </div>
      <div className="toggle-filter-button" onClick={handleFilterMenu}>
        <FilterBox />
      </div>
      <div className="bottom_container">
        <div className="button_container">
          <button id="show_button" onClick={showExperiences}></button>
          <button id="hide_button" onClick={hideExperiences}></button>
        </div>
        <div id="experiences_container">
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
};

export default Home;
