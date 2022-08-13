import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Navigate to="/login" />
          );
        }}
      ></Route>
    </Routes>
  );
};
export default PrivateRoute;
