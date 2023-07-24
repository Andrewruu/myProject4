import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  function handleUsernameChange(e) {
    
    setUsername(e.target.value.toLowerCase());
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        navigate("/home");
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <div className="Login">
      
        
      
        <form onSubmit={handleSubmit} className="login-box">
        <h1>Welcome!</h1>
        {errors && <p>{errors}</p>}
          <input type="text" onChange={handleUsernameChange} placeholder="Username" />
          <input type="password" onChange={handlePasswordChange} placeholder="Password"/>
          <button>Login</button>
        </form>
    
    </div>
  );
};

export default Login;