import React, { Component } from "react";
import { Link, NavLink, withRouter, BrowserRouter } from "react-router-dom";

import { Navbar } from "./navbar";
import logo from './logo.PNG';

export class Root extends React.Component {
  render() {
    if (this.props.location == undefined || this.props.location.state == undefined) {
      return (
        // if user didnt signin or singup
        <nav className="navbar navbar-default">
            <NavLink exact to={"/"}>
                <img src={logo} alt="Logo" />
            </NavLink>
            <div className="links">
                <NavLink exact to={"/"} activeClassName="selected"><span>Home</span></NavLink>
                <NavLink to={"/signin"} activeClassName="selected"><span>Sign In</span></NavLink>
                <NavLink to={"/signup"} activeClassName="selected"><span>Sign Up</span></NavLink>
            </div>
        </nav>
      );
    } else if (this.props.location.state.checkLogin == true) {
      // if user signed up
      return (
        <nav className="navbar navbar-default">
            <NavLink exact to={"/"}>
                <img src='/assets/logo.png' alt="Logo" />
            </NavLink>
            <div className="links">
                <NavLink exact to={"/"} activeClassName="selected"><span>Home</span></NavLink>
                <NavLink to={"/game"} activeClassName="selected"><span>Play</span></NavLink>
                <NavLink to={"/logout"} activeClassName="selected"><span>Logout</span></NavLink>
            </div>
        </nav>
      );
    }
  }
}
