import React, { Component } from "react";
import { Link, NavLink, withRouter, BrowserRouter } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-default">
      <div>
        <NavLink to={"/game"}>Game</NavLink>
        <NavLink to={"/signup"}>Signup</NavLink>
      </div>
    </nav>
  );
};
