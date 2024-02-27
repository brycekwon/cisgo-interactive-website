import React, { useEffect, useState } from 'react';

import NavBar from '../components/NavBar.js';
import '../static/css/pages/Search.css';

const Search = () => {
  const [query, setQuery] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/experiences`).then((res) => {
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

  return (
    <div>
      <NavBar />
      <div className="app">
        <input placeholder='Search Location...' onChange={event => setQuery(event.target.value)}></input>
        {
          experiences.filter(post => {
            if (query === '') {
              return post;
            } else if (post.body.location.country.toLowerCase().includes(query.toLowerCase())) {
              return post;
            }
          }).map((post, index) => (
            <div className="box" key={index}>
              <p>{post.name.firstName} {post.name.lastName} ({post.contact.email})</p>
              <p>{post.body.location.country}{post.body.location.region === null ? "" : ", " + post.body.location.region}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Search;
