import React from "react";
import { render } from "react-dom";
import { Route, IndexRoute, BrowserRouter as Router } from "react-router-dom";

import { Root } from "./Root";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import {Game} from "./Game";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

import "./style/App.css";

class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
          <Navbar />
          <div className="container">
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/game" component={Game} />
          </div>
          <Footer />
          </div>
        </Router>
    );
  }
}

render(<App />, window.document.getElementById("root"));
