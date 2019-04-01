import React from "react";
import { render } from "react-dom";
import { Route, IndexRoute, BrowserRouter as Router } from "react-router-dom";

import { Root } from "./Root";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import { Game } from "./Game";
import { Logout } from "./Logout";
import { Footer } from "./footer";

import "./style/App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <Route path="/" component={Root} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/" exact component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/logout" component={Logout} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

render(<App />, window.document.getElementById("root"));
