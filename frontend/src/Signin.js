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


export class Signin extends Component {
  state = {
    username: "",
    password: "",
    redirectState: false,
    error: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { match, location, history } = this.props
    let _this = this;
    fetch(config.BACKEND_URL + '/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: _this.state.username,
            password: _this.state.password,
        })
    })
    .then(response => response.json())
    .then(function(data){
        if (data.msg == "success") {
            _this.setState({
                username: "",
                password: "" ,
                content: data.user.username,
                error: ""
            });
            cookies.set('user', data.user.username);
            history.push({
                pathname: "/",
                state: { checkLogin: true },
            });
        } else {
            _this.setState({error: data.msg});
        }
    });
  };

  render() {
    // const redirectState = this.state.redirectState;
    // if (redirectState === true) {
    //   return (
    //     <BrowserRouter>
    //       <Route path="/" Component={Home} />
    //     </BrowserRouter>
    //   );
    // }

    return (
        <div className="user-form">
            <h1>Sign In</h1>

            <form id="signin-account-form"
                  onSubmit={this.submitForm.bind(this)}
                  noValidate>
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                           placeholder="Username"
                           name="username"
                           value={this.state.username}
                           onChange={e=>this.onChange(e)}
                    />
                </div>

                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           placeholder="Password"
                           name="password"
                           value={this.state.password}
                           onChange={e=>this.onChange(e)}
                    />
                </div>

                <div className="error_msg">
                    {this.state.error}
                </div>

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
  }
}
