import React from 'react';

import '../static/css/pages/Login.css';

const Login = () => {
  return (
    <div classname="login_container">
      <h1 classname="login_header">Welcome Back!</h1>
      <body classname="login_body">
        <form action="/success" method="get" id="login-form">
          <input type="text" id="email" name="email" placeholder="Email" required></input>
          <br />
          <input type="text" id="password" name="password" placeholder="Password" required></input>
          <br />
          <button type="login">Log In</button>
        </form>
      </body>
    </div>
  );
}

export default Login;
