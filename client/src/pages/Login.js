import React from 'react';

const Login = () => {
  return (
    <div classname="login_container">
      <h1 classname="login_header">Login</h1>
      <div classname="login_body">
        <form action="/success" method="get" id="login-form">
          <input type="text" id="email" name="email" placeholder="Enter your email here" required></input>
          <br />
          <input type="text" id="password" name="password" placeholder="Enter your password here" required></input>
          <br />
          <button type="login">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
