import React, { Component } from "react";
import { Link, NavLink, withRouter, BrowserRouter } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-default">
        <NavLink exact to={"/"}>
            <img src='/assets/logo.png' alt="Logo" />
        </NavLink>
      <div className="links">
        <NavLink exact to={"/"} activeClassName="selected"><span>Home</span></NavLink>
        <NavLink to={"/signin"} activeClassName="selected"><span>Sign In</span></NavLink>
        <NavLink to={"/signup"} activeClassName="selected"><span>Sign Up</span></NavLink>
        <NavLink to={"/game"} activeClassName="selected"><span>Play</span></NavLink>
      </div>
    </nav>
  );
};
