import React from "react";
import { render } from "react-dom";
import { Route, IndexRoute, BrowserRouter as Router } from "react-router-dom";

import { Root } from "./Root";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Signin } from "./Signin";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Root} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

render(<App />, window.document.getElementById("root"));
