import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { signUserOut, isAuth } = useContext(UserContext);

  return (
    <div className="tweet-nav">
      <ul>
        {!isAuth ? (
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li className="right">
              <a onClick={signUserOut}>Log Out</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
