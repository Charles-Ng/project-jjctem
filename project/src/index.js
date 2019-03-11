import React from "react";
import { render } from "react-dom";
import { Route, IndexRoute, BrowserRouter as Router } from "react-router-dom";

import { Root } from "./Root";
import { Game } from "./Game";
import { Signup } from "./Signup";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Root} />
          <Route path="/signup" component={Signup} />
          <Route path="/game" component={Game} />
        </div>
      </Router>
    );
  }
}

render(<App />, window.document.getElementById("root"));
