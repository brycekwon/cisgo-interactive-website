import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar.js';
import '../static/css/pages/Search.css';

const Search = () => {
  const [query, setQuery] = useState("");
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
  
  const countryFlagUrls = {
    "Sweden": "https://www.worldometers.info/img/flags/sw-flag.gif",
    "Philippines": "https://www.worldometers.info/img/flags/small/tn_rp-flag.gif",
    "Canada": "https://www.worldometers.info/img/flags/small/tn_ca-flag.gif",
    "China": "https://www.worldometers.info/img/flags/small/tn_ch-flag.gif",
    "Slovenia": "https://www.worldometers.info/img/flags/small/tn_lo-flag.gif",
    "Indonesia": "https://www.worldometers.info/img/flags/small/tn_id-flag.gif",
    "Ukraine": "https://www.worldometers.info/img/flags/small/tn_up-flag.gif",
    "Serbia": "https://www.worldometers.info/img/flags/small/tn_ri-flag.gif",
    "Portugal": "https://www.worldometers.info/img/flags/small/tn_po-flag.gif",
    "France": "https://www.worldometers.info/img/flags/small/tn_fr-flag.gif",
    "Brazil": "https://www.worldometers.info/img/flags/small/tn_br-flag.gif",
    "Macedonia": "https://www.worldometers.info/img/flags/small/tn_mk-flag.gif",
    "Czech Republic": "https://www.worldometers.info/img/flags/small/tn_ez-flag.gif",
    "Malaysia": "https://www.worldometers.info/img/flags/small/tn_my-flag.gif",
    "Mongolia": "https://www.worldometers.info/img/flags/small/tn_mg-flag.gif",
    "Vietnam": "https://www.worldometers.info/img/flags/small/tn_vm-flag.gif",
    "Poland": "https://www.worldometers.info/img/flags/small/tn_pl-flag.gif",
    "Mexico": "https://www.worldometers.info/img/flags/small/tn_mx-flag.gif",
    "Costa Rica": "https://www.worldometers.info/img/flags/small/tn_cs-flag.gif",
    "Cuba": "https://www.worldometers.info/img/flags/small/tn_cu-flag.gif",
    "Russia": "https://www.worldometers.info/img/flags/small/tn_rs-flag.gif",
    "Morocco": "https://www.worldometers.info/img/flags/small/tn_mo-flag.gif",
    "Jamaica": "https://www.worldometers.info/img/flags/small/tn_jm-flag.gif",

    "Mali": "https://www.worldometers.info/img/flags/small/tn_ml-flag.gif",
    "Micronesia": "https://www.worldometers.info/img/flags/small/tn_fm-flag.gif",
    "South Africa": "https://www.worldometers.info/img/flags/small/tn_sf-flag.gif",
    "Albania": "https://www.worldometers.info/img/flags/small/tn_al-flag.gif",
    "Colombia": "https://www.worldometers.info/img/flags/small/tn_co-flag.gif",
    "Argentina": "https://www.worldometers.info/img/flags/small/tn_ar-flag.gif",
    "French Polynesia": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Flag_of_French_Polynesia.svg/800px-Flag_of_French_Polynesia.svg.png",
    "Palestinian Territory": "https://www.worldometers.info/img/flags/small/tn_palestine-flag.gif",
    "Uruguay": "https://www.worldometers.info/img/flags/small/tn_uy-flag.gif",
    "Finland": "https://www.worldometers.info/img/flags/small/tn_fi-flag.gif",
    "Greece": "https://www.worldometers.info/img/flags/small/tn_gr-flag.gif",
    "Syria": "https://www.worldometers.info/img/flags/small/tn_sy-flag.gif",
    "Cambodia": "https://www.worldometers.info/img/flags/small/tn_cb-flag.gif",
    "Kazakhstan": "https://www.worldometers.info/img/flags/small/tn_kz-flag.gif",
    "Pakistan": "https://www.worldometers.info/img/flags/small/tn_pk-flag.gif",
    "Ireland": "https://www.worldometers.info/img/flags/small/tn_ei-flag.gif",
   
    
  };

  const getCountryFlagUrl = (countryName) => {
    return countryFlagUrls[countryName] || ''; // Return empty string if URL not found
  };

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
              <div>
                <p>{post.name.firstName} {post.name.lastName} ({post.contact.email})</p>
                <p>{post.body.location.country}{post.body.location.region === null ? "" : ", " + post.body.location.region}</p>
              </div>
              <div className="country-flag-container">
                <img src={getCountryFlagUrl(post.body.location.country)} alt="Country Flag" className="country-flag" />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Search;
