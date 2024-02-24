import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API}/experiences`).then((res) => {
      setExperiences(res.data);
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
    <div>
    </div>
  );
}

export default Home;
