import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import { Container } from "react-bootstrap";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Signup from "./components/SignUp";
import { auth } from "./firebase-config";
import { signOut } from "@firebase/auth";
import React, { useState } from "react";
import Login from "./components/Login";
import localforage from "localforage";
import Home from "./pages/Home";
import "./App.css";
import { UserContext } from "./context/UserContext";


const App = () => {
  const [isAuth, setIsAuth] = useState();
  localforage.getItem("isAuth").then((value) => setIsAuth(value));
  const signUserOut = () => {
    localforage.clear();
    setIsAuth(false);
    signOut(auth).then(() => {
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>

      <UserContext.Provider value={{ signUserOut, isAuth, setIsAuth }}>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route
              path="/*"
              element={<PrivateRoute path="/" element={<Home />} />}
            />
            <Route
              path="/profile/*"
              element={<PrivateRoute path="/" element={<Profile />} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </UserContext.Provider>
    </Router>
  );
};
export default App;
