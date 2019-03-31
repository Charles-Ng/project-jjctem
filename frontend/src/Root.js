import React, { Component } from "react";
import { Link, NavLink, withRouter, BrowserRouter } from "react-router-dom";

import { Navbar } from "./navbar";

export class Root extends React.Component {
  render() {
    if (this.props.location.state == undefined) {
      return (
        // if user didnt signin or singup
        <div className="container">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
                <nav className="navbar navbar-default">
                  <div>
                    <NavLink to={"/home"}>Home</NavLink>
                    <NavLink to={"/signin"}>Signin</NavLink>
                    <NavLink to={"/signup"}>Signup</NavLink>
                  </div>
                </nav>
            </div>
          </div>
        </div>
      );
    }
    if (this.props.location.state.checkLogin == true) {
      // if user signed up
      return (
        <div className="container">
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <nav className="navbar navbar-default">
                      <div>
                        <NavLink to={"/home"}>Home</NavLink>
                        <NavLink to={"/logout"}>Logout</NavLink>
                        <NavLink to={"/game"}>Game</NavLink>
                      </div>
                    </nav>
                </div>
            </div>
        </div>
      );
    }
  }
}
