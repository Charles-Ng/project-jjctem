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
        <NavLink to={"/signin"} activeClassName="selected"><span>Signin</span></NavLink>
        <NavLink to={"/signup"} activeClassName="selected"><span>Signup</span></NavLink>
        <NavLink to={"/game"} activeClassName="selected"><span>Game</span></NavLink>
      </div>
    </nav>
  );
};
