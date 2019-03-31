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
const config = require('./config.js');


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
    console.log(this.state);
    // this.setState({ username: "", password: "" });
    // this.props.history.push("/Home");
    const { match, location, history } = this.props
    let _this = this;
    fetch(`{config.BACKEND_URL}/api/user/login`, {
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
        console.log(typeof(data));
        _this.setState({
            username: "",
            password: "" ,
            content: data.user.username,
            error: ""
        });
        history.push({
            pathname: "/",
            state: { checkLogin: true },
            user: data.user
        });
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
