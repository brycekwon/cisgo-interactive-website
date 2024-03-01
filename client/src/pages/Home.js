import React, { useEffect, useState } from 'react';

import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/experiences`).then(async (res) => {
      setExperiences(await res.json());
      setLoading(false);
    }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div></div>;
  }

  console.log(experiences)

  return (
    <div className="body">
      <NavBar />
      <WorldMap />
    </div>
  );
}

export default Home;
