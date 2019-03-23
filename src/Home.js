import React from "react";
import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';
export class Home extends React.Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }
  openGame() {
    let path = `Game.js`;
    this.props.history.push(path);
  }



  render() {
    return (

      <div>
        <h3>Home</h3>
      </div>

    );
  }
}

//export default withRouter(Home);
