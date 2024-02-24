import React, { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";


const Home = lazy(() => import('./pages/Home.js'));
const AddPin = lazy(() => import("./pages/AddPin.js"));
const Search = lazy(() => import('./pages/Search.js'));
const Contact = lazy(() => import('./pages/Contact.js'));
const About = lazy(() => import('./pages/About.js'));
const Help = lazy(() => import('./pages/Help.js'));
const Login = lazy(() => import('./pages/Login.js'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPin />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
