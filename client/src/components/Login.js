import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
        navigate("/");
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <div>
      
        <form onSubmit={handleSubmit} className="login-singup">
        <h1>Welcome!</h1>
        <h2>Login to UShop</h2>
          <input type="text" onChange={handleUsernameChange} placeholder="Username" />
          <input type="password" onChange={handlePasswordChange} placeholder="Password"/>
          {errors && <p className="errors">{errors}</p>}
          <br></br>
          <button>Login</button>
        </form>
    
    </div>
  );
};

export default Login;