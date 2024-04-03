// import React, { useRef, useEffect, useState } from 'react';

// import '../static/css/pages/Home.css';
// import WorldMap from '../components/WorldMap.js';
// import NavBar from '../components/NavBar.js';
// import FilterBox from '../components/FilterBox.js';

// const Home = () => {
//   const [experiences, setExperiences] = useState([]);
//   const [loading, setLoading] = useState([]);
//   const [map, setMap] = useState(null)
//   const ourRef = useRef(null);
//   const [pointerDown, setPointerDown] = useState(false);
//   const [filterOpen, setFilterOpen] = useState(false);
//   document.querySelectorAll(".allPaths").forEach(e=>{
  

//     var country = document.getElementsByName(e.getAttribute('name'));
   
//     // function to detect if a user is hovering over a country
//     function hovering(){
//       // changes country color if hovering
//       country.forEach(function(item){
//         item.style.fill = "rgb(34, 59, 5)";
//         item.style.transition = "0.2s";
//         item.style.cursor = "pointer";
//       })
//     }
//     // event listeners for hovering over countries
//     e.addEventListener("mouseover", hovering);

//     // resets country color after no longer hovering
//     function out(){
//       country.forEach(function(item){
//         item.style.fill = "rgb(56, 78, 29)";
//         item.style.stroke = "rgb(34, 59, 5)"
//         item.style.strokeWidth = "1";
//         item.style.transition = "0.2s";
//         item.style.cursor = "grab";
//       })
//     }

//     // event listener when user stops hovering over a country
//     e.addEventListener("mouseout", out);

//   })
//   const handleFilterMenu = () => {
//     setFilterOpen(!filterOpen);
//   }

//   // coordinates of the mouse's position
//   const coords = useRef({
//     x: 0,
//     y: 0,
//   });

//   // view box position before scrolling
//   const oldViewBox = useRef({
//     x: 0,
//     y: 0,
//   });

//   // view box position after scrolling
//   const newViewBox = useRef({
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0
//   });

//   // returns a point (the coordinate of the user's click)
//   const getPoint = (e) => {
//     const point = { x: 0, y: 0 }; // initial point
//     // checks if user clicks the screen and gets coordinates
//     if (e.targetTouches) {
//       point.x = e.targetTouches[0].clientX;
//       point.y = e.targetTouches[0].clientY;
//     } 
//     else {
//       point.x = e.clientX;
//       point.y = e.clientY;
//     }
//     return point;
//   }

//   // sets the position for when a user clicks the screen
//   const handleMouseDown = (e) => {
//     if (!ourRef.current) return
//     const position = getPoint(e);
//     coords.current = position;
//     setPointerDown(true)
//     document.body.style.cursor = "grabbing"
//   }

//   // handles grabbing and scrolling events
//   const handleMouseMove = (e) => {
//     if (!pointerDown || !ourRef.current) return; // returns if the user isn't holding down on the screen
//     e.preventDefault(); // Prevents user from selecting something on the page

//     // calculates and saves the new position
//     const position = getPoint(e);

//     // newViewBox object updated every mouse move
//     newViewBox.current = {
//       x: oldViewBox.current.x - ((position.x - coords.current.x) * 0.8),
//       y: oldViewBox.current.y - ((position.y - coords.current.y) * 0.8),
//       width: ourRef.current.getBoundingClientRect().width,
//       height: ourRef.current.getBoundingClientRect().height
//     }

//     // sets new viewbox
//     setMap(map.setViewBox(`${newViewBox.current.x} ${newViewBox.current.y} ${newViewBox.current.width} ${newViewBox.current.height}`));
//     document.body.style.cursor = "grabbing";
//   }

//   // resets cursor when the user unclicks
//   const handleMouseUp = () => {
//     if (!ourRef.current) return
//     document.body.style.cursor = "grab";
//     setPointerDown(false)
//     oldViewBox.current.x = newViewBox.current.x;
//     oldViewBox.current.y = newViewBox.current.y;
//   }

//   // resets cursor when the mouse leaves a country
//   const handleMouseLeave = () => {
//     if (!ourRef.current) return
//     document.body.style.cursor = "grab";
//     setPointerDown(false)
//     oldViewBox.current.x = newViewBox.current.x;
//     oldViewBox.current.y = newViewBox.current.y;
//   }

//   useEffect(() => {
//     setLoading(true);
//     fetch(`${process.env.REACT_APP_API}/experiences`).then(async(res) => {
//       setExperiences(await res.json());
//       setLoading(false);
//     }).catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//     setMap(new WorldMap(null));
//   }, []);

//   if (loading) {
//     return <div></div>;
//   }

//   console.log(experiences)

//   return (
//     <div className="body">
//       <NavBar />
//       <div ref={ourRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
//         {map.render()}
//       </div>
//       <div className="toggle-filter-button" onClick={handleFilterMenu}>
//           <FilterBox />
//        </div>
//     </div>
//   );
// }

// export default Home;

import React, { useRef, useEffect, useState } from 'react';
import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';
import FilterBox from '../components/FilterBox.js';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true); // Assume initial state is loading
  const [map, setMap] = useState(null);
  const ourRef = useRef(null);
  const [pointerDown, setPointerDown] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/experiences`)
      .then(async (res) => {
        setExperiences(await res.json());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Assuming WorldMap is a component or class that initializes and returns an SVG map
    setMap(new WorldMap(null)); // Initialize your map here
  }, []);

  useEffect(() => {
    // Ensure your SVG paths correctly have the `.allPaths` class for this to work
    const paths = document.querySelectorAll('.allPaths');
    paths.forEach(path => {
      const hovering = () => {
        path.style.fill = "rgb(34, 59, 5)";
        path.style.transition = "0.2s";
        path.style.cursor = "pointer";
      };

      const out = () => {
        path.style.fill = ""; // Optionally, reset to default or specific color
        path.style.stroke = ""; // Optionally, reset to default or specific settings
        path.style.strokeWidth = "";
        path.style.cursor = "grab";
      };

      path.addEventListener("mouseover", hovering);
      path.addEventListener("mouseout", out);
    });
  }, [map]); // Re-run this effect if `map` changes to re-attach event listeners

  // Functions for handling drag and zoom behavior
  const coords = useRef({ x: 0, y: 0 });
  const oldViewBox = useRef({ x: 0, y: 0 });
  const newViewBox = useRef({ x: 0, y: 0, width: 0, height: 0 });

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
    if (!ourRef.current) return;
    const position = getPoint(e);
    coords.current = position;
    setPointerDown(true);
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!pointerDown || !ourRef.current) return;
    e.preventDefault();

    const position = getPoint(e);
    newViewBox.current = {
      x: oldViewBox.current.x - ((position.x - coords.current.x) * 0.8),
      y: oldViewBox.current.y - ((position.y - coords.current.y) * 0.8),
      width: ourRef.current.getBoundingClientRect().width,
      height: ourRef.current.getBoundingClientRect().height,
    };

    // Assuming setViewBox is a method to update the view of the SVG map
    setMap(map.setViewBox(`${newViewBox.current.x} ${newViewBox.current.y} ${newViewBox.current.width} ${newViewBox.current.height}`));
    document.body.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    if (!ourRef.current) return;
    document.body.style.cursor = "grab";
    setPointerDown(false);
    oldViewBox.current.x = newViewBox.current.x;
    oldViewBox.current.y = newViewBox.current.y;
  };

  const handleMouseLeave = () => {
    if (!ourRef.current) return;
    document.body.style.cursor = "grab";
    setPointerDown(false);
    oldViewBox.current.x = newViewBox.current.x;
    oldViewBox.current.y = newViewBox.current.y;
  };

  const handleFilterMenu = () => {
    setFilterOpen(!filterOpen);
  };

  // Conditional rendering for loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body">
      <NavBar />
      <div ref={ourRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
        {map && map.render()}
      </div>
      <div className="toggle-filter-button" onClick={handleFilterMenu}>
        <FilterBox open={filterOpen} />
      </div>
    </div>
  );
};

export default Home;
