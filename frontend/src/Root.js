import React, { Component } from "react";
import { Link, NavLink, withRouter, BrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import logo from "./logo.PNG";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export class Root extends React.Component {
    render() {
        if (this.props.location != undefined) {
            if (cookies.get('user') == undefined) {
                return (
                // if user didnt signin or singup
                <nav className="navbar navbar-default">
                    <NavLink exact to={"/"}>
                        <img src={logo} alt="Logo" />
                    </NavLink>
                    <div className="links">
                        <NavLink exact to={"/"} activeClassName="selected"><span>Home</span></NavLink>
                        <NavLink to={"/leaderboard"} activeClassName="selected"><span>Leaderboard</span></NavLink>
                        <NavLink to={"/signin"} activeClassName="selected"><span>Sign In</span></NavLink>
                        <NavLink to={"/signup"} activeClassName="selected"><span>Sign Up</span></NavLink>
                    </div>
                </nav>
                );
            } else {
                // if user signed up
                return (
                    <nav className="navbar navbar-default">
                        <NavLink exact to={"/"}>
                            <img src='/assets/logo.png' alt="Logo" />
                        </NavLink>
                        <div className="links">
                            <span className="welcome">Welcome {cookies.get('user')}</span>
                            <NavLink exact to={"/"} activeClassName="selected"><span>Home</span></NavLink>
                            <NavLink to={"/leaderboard"} activeClassName="selected"><span>Leaderboard</span></NavLink>
                            <NavLink to={"/game"} activeClassName="selected"><span>Play</span></NavLink>
                            <NavLink to={"/logout"} activeClassName="selected"><span>Logout</span></NavLink>
                        </div>
                    </nav>
                );
            }
        } else {
            return "";
        }
    }
}
