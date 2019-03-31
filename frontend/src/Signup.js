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

export class Signup extends Component {
  state = {
    username: "",
    password: "",
    redirectState: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    // e.preventDefault();
    // console.log(this.state);
    // if (this.state.password.length >= 8 && this.state.password.length > 0) {
    //   this.setState({ username: "", password: "" });
    //   this.props.history.push({
    //     pathname: "/Root",
    //     state: { checkLogin: true }
    //   });
    // } else {
    //   this.setState({ password: "" });
    //   alert("Password has to be at least 8 characters!");
    // }
    e.preventDefault();
    console.log(this.state);
    let _this = this;
    if (_this.state.password.length >= 8 && _this.state.password.length > 0) {
        fetch('https://formula0.julesyan.com/api/user/signup', {
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
            console.log(data);
            _this.setState({
                username: "",
                password: "" ,
                content: data.user.username
            });
            _this.props.history.push({
                pathname: "/",
                state: { checkLogin: true }
            });
        });
    } else {
        _this.setState({ password: "" });
        // **** Need to NOT use alerts ****************************************************************************
        alert("Password has to be at least 8 characters!");
    }
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
            <h1>Sign Up</h1>

            <form
              id="create-account-form"
              onSubmit={this.submitForm.bind(this)}
              noValidate
            >
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                           placeholder="Username"
                           name="username"
                           value={this.state.username}
                           onChange={e => this.onChange(e)}
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input placeholder="Password"
                           type="password"
                           name="password"
                           value={this.state.password}
                           onChange={e => this.onChange(e)}
                    />
                </div>

                <div className="createAccount">
                  <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    );
  }
}
