import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../static/css/pages/Home.css';
import WorldMap from '../components/WorldMap.js';
import NavBar from '../components/NavBar.js';

const Home = () => {
  // TODO: uncomment for pin functionality
  // const [experiences, setExperiences] = useState([]);
  // const [loading, setLoading] = useState([]);
  //
  // useEffect(() => {
  //   setLoading(true);
  //   axios.get(`${process.env.REACT_APP_API}/experiences`).then((res) => {
  //     setExperiences(res.data);
  //     setLoading(false);
  //   }).catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }, []);
  //
  // if (loading) {
  //   return <div></div>;
  // }

  return (
    <div className="body">
      <NavBar />
      <WorldMap />
    </div>
  );
}

export default Home;
