import React, { Component } from "react";
import "./style/user.css";
import {
  Link,
  NavLink,
  BrowserRouter,
  Route,
  withRouter
} from "react-router-dom";
import { Home } from "./Home";
import Cookies from 'universal-cookie';
const config = require('./config.js');
const cookies = new Cookies();


export class Logout extends Component {
    state = {
        username: "",
        password: "",
        redirectState: false,
        error: ""
    };

    componentWillMount(){
        // Call the logout on the user
        fetch(config.BACKEND_URL + '/user/logout', {
            method: 'GET',
        });
        // Remove all user data
        cookies.remove('user');
        this.props.history.push('/');
    }

    render() {
        return ("");
    }
}
