/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
  }
  
  return (

    <div className="app-nav">
      <ul>
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li className="right">
              <a role="button" onClick={handleLogout}>Log Out</a> 
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
