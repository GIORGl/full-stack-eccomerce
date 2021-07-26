import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/about">About me</Link>
      <Link to="/register">Register</Link>
      <Link to="/upload">Uplaod</Link>
      <Link to="logout">Logout</Link>
    </div>
  );
}

export default Header;
