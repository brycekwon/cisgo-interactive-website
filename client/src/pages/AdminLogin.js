import React from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar.js';
import '../static/css/pages/AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");

    fetch(`${process.env.REACT_APP_API}/auth/login`, {
      method: "post",   // prevent caching or logs of credentials
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("HTTP Error " + res.status);
        }
        return res.json();
      })
      .then(data => {
        if (data.valid) {
          navigate("/admin");
          // const el = document.createElement("a");
          // el.setAttribute("href", '/admin');
          // el.click(); // go to admin panel lol
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <NavBar />
      <header class="admin_header">
        <h1 class="admin_title">Welcome Back Admin!</h1>
      </header>
      <main class="admin_main">
        <form onSubmit={handleLogin} method="get" class="login-form">
          <input type="email" class="admin-email" name="email" placeholder="Email" required></input>
          <br />
          <input type="password" class="password" name="password" placeholder="Password" required></input>
          <br />
          <button type="submit" class="login-button">Log In</button>
        </form>
      </main>
    </div>
  );
}

export default AdminLogin;

