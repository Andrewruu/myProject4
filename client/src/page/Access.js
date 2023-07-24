import { useState, useContext } from "react";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import { UserContext } from "../context/UserContext";


function Access() {
  const [showLogin, setShowLogin] = useState(true);
  const {setUser} = useContext(UserContext)
  return (
    <div>
      
      {showLogin ? (
        <>
          <Login onLogin={setUser} />
          <div />
          <p>
            Don't have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <Signup onLogin={setUser} />
          <div />
          <p>
            Already have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Access;