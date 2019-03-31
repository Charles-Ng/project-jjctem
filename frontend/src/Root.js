import React, { Component } from "react";
import { Link, NavLink, withRouter, BrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import logo from "./logo.PNG";

export class Root extends React.Component {
  render() {
    if (this.props.location != undefined) {
      if (this.props.location.state == undefined) {
        return (
          // if user didnt signin or singup
          <nav className="navbar navbar-default">
            <div>
              <NavLink to={"/home"}>Home</NavLink>
              <NavLink to={"/signin"}>Signin</NavLink>
              <NavLink to={"/signup"}>Signup</NavLink>
            </div>
          </nav>
        );
      }
      if (this.props.location.state.checkLogin == true) {
        // if user signed up
        return (
          <nav className="navbar navbar-default">
            <div>
              <NavLink to={"/home"}>Home</NavLink>
              <NavLink to={"/logout"}>Logout</NavLink>
              <NavLink to={"/game"}>Game</NavLink>
            </div>
          </nav>
        );
      }
    }
    return <Home />;
  }
}
