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
  const coords = useRef({ x: 0, y: 0 });
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
    coords.current = point;
    setPointerDown(true);
    document.body.style.cursor = 'grabbing';
  };

  // WITH DEBOUNCE TIME
  const handleMouseMove = debounce((e) => {
    if (!pointerDown || !ourRef.current) return;
    const currentPoint = getPoint(e);
    const dx = currentPoint.x - coords.current.x;
    const dy = currentPoint.y - coords.current.y;

    let newX = viewBoxValues.x - dx;
    let newY = viewBoxValues.y - dy;

    const minX = -100;
    const maxX = 1000;
    const minY = -100;
    const maxY = 500;

    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    setViewBoxValues(prevValues => ({
      ...prevValues,
      x: newX,
      y: newY
    }));

    coords.current = currentPoint;
  }, 16);

  const handleMouseUpOrLeave = () => {
    setPointerDown(false);
    document.body.style.cursor = 'default';
  };

  useEffect(() => {
    const paths = document.querySelectorAll('.allPaths');

    const handleMouseOver = e => {
      e.target.style.fill = 'rgb(34, 59, 5)';
    };

    const handleMouseOut = e => {
      e.target.style.fill = '';
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
  }, []);

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
        <WorldMap viewBox={`${viewBoxValues.x} ${viewBoxValues.y} ${viewBoxValues.width} ${viewBoxValues.height}`} experiences={experiences} />
      </div>
      <div className="toggle-filter-button" onClick={() => setFilterOpen(!filterOpen)}>
        <FilterBox open={filterOpen} />
      </div>
    </div>
  );
};

export default Home;
