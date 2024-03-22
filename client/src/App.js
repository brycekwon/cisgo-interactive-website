import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./static/css/global.css"

const Main = lazy(() => import('./layouts/Main.js'));

const Home = lazy(() => import('./pages/Home.js'));
const AddPin = lazy(() => import("./pages/AddPin.js"));
const Search = lazy(() => import('./pages/Search.js'));

const Contact = lazy(() => import('./pages/Contact.js'));
const About = lazy(() => import('./pages/About.js'));
const Help = lazy(() => import('./pages/Help.js'));

const AdminLogin = lazy(() => import('./pages/AdminLogin.js'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.js'));

const NotFound = lazy(() => import('./pages/NotFound.js'));

const App = () => {
  return(
    <BrowserRouter>
      <Suspense fallback={<Main />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPin />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
