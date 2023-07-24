import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      console.log(r)
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <nav>
      <h1>UShop</h1>
        <button variant="outline" onClick={handleLogoutClick}>Logout </button>
    </nav>
  );
}

export default NavBar;
