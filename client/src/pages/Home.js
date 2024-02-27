import React, { useEffect, useState } from 'react';

import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState([]);
  const [map, setMap] = useState(null)

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/experiences`).then(async (res) => {
      setExperiences(await res.json());
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
    <div className="body">
      <NavBar />
      {map.render()}
    </div>
  );
}

export default Home;
