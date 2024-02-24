import React, { lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";


const Home = lazy(() => import('./pages/Home.js'));

const App = () => {
  return (
    // <div id="root"></div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
