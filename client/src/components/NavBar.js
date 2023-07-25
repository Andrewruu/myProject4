import React,{useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function NavBar() {
  const {user, setUser} = useContext(UserContext)
  const navs = useNavigate()
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navs("/")
      }
    });
  }

  const updateFund = (
    user.fund.split('.')[1].length == 2? user.fund: user.fund.concat("0")
)


  return (
    <nav>
      <h1>UShop</h1>
      <h2>Fund ${updateFund}</h2>
      <Link to={`/`}>Products</Link>
      <Link to={'/my-orders'}>My Orders</Link>
        <button variant="outline" onClick={handleLogoutClick}>Logout </button>
    </nav>
  );
}

export default NavBar;
