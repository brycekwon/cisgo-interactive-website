import React, { useRef, useEffect, useState } from 'react';
import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';
import FilterBox from '../components/FilterBox.js';
import { debounce } from 'lodash';

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
      <div className="toggle-filter-button" onClick={() => setFilterOpen(!filterOpen)}>
        <FilterBox open={filterOpen} />
      </div>
    </div>
  );
  
};

export default Home;