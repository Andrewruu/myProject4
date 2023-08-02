import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({onLogin}) => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fund, setFund] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  function handleNameChange(e){
    setName(e.target.value.toLowerCase())
  }
  function handleUsernameChange(e){
    setUsername(e.target.value.toLowerCase())
  }
  function handlePasswordChange(e){
    setPassword(e.target.value.toLowerCase())
  }
  function handleFundChange(e){
    setFund(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password, fund }),
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
    <div className="Signup Login">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Register</h1>
        {errors.map((err) => (
              <p>{err}</p>
            ))}
        <input type="text" placeholder="Name" onChange={handleNameChange}/>
        <input type="text" placeholder="Username" onChange={handleUsernameChange}/>
        <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
        <input type="number" step={"0.01"} placeholder="Fund" onChange={handleFundChange}/>
        <button>Signup</button>
      </form>
    </div>
  );
};

export default Signup;