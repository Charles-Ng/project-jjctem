import React, { Component } from "react";
import "./App.css";
import {
  Link,
  NavLink,
  BrowserRouter,
  Route,
  withRouter
} from "react-router-dom";
import { Game } from "./Game";

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
    e.preventDefault();
    this.setState({ username: "", password: "" });
    console.log(this.state);
    this.props.history.push("/Game");
  };

  render() {
    const redirectState = this.state.redirectState;
    if (redirectState === true) {
      return (
        <BrowserRouter>
          <Route path="/" Component={Game} />
        </BrowserRouter>
      );
    }

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form
            id="create-account-form"
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

            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already have an account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
