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

export class Signup extends Component {
  state = {
    username: "",
    password: "",
    content: "",
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
    let _this = this;
    if (_this.state.password.length >= 8 && _this.state.password.length > 0) {
        fetch('http://localhost:3001/user/signup', {
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
            _this.setState({
                username: "",
                password: "" ,
                content: data.user.username
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
            </div>

            <div>
              {this.state.content}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
