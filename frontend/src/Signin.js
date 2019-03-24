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

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
  }
}
