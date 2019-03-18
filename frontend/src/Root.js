import React from "react";

import { Navbar } from "./navbar";

export class Root extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <Navbar />
          </div>
        </div>
      </div>
    );
  }
}
