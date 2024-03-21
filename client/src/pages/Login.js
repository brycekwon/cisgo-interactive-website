import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../static/css/pages/Login.css';

const Login = () => {
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
    <div id="container" class="login-container">
      <h1>Welcome Back!</h1>
      <body>
        <form onSubmit={handleLogin} method="get" id="login-form">
          <input type="email" id="email" name="email" placeholder="Email" required></input>
          <br />
          <input type="password" id="password" name="password" placeholder="Password" required></input>
          <br />
          <button type="submit" id="login-button">Log In</button>
        </form>
      </body>
    </div>
  );
}

export default Login;

