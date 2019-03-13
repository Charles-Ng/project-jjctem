import React, { Component } from "react";
import "./App.css";
import {
  Link,
  NavLink,
  BrowserRouter,
  Route,
  withRouter
} from "react-router-dom";
import { Home } from "./Home";

export class Signin extends Component {
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
    e.preventDefault();
    console.log(this.state);
    this.setState({ username: "", password: "" });
    this.props.history.push("/Home");
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
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
          <form
            id="signin-account-form"
            onSubmit={this.submitForm.bind(this)}
            noValidate
          >
            <div className="username">
              <label htmlFor="username"> username </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={e => this.onChange(e)}
              />
            </div>

            <div className="password">
              <label htmlFor="password"> Password </label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.onChange(e)}
              />
            </div>

            <div className="signin_account">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
