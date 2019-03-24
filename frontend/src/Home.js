import React from "react";
import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./style/home.css";

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
        <div className="home">
          <div className="banner">Join the Grand Prix...</div>
          <img src='/assets/screenshots/race.png' alt="Race" />
          <div className="banner">Race against your friends...</div>
          <img src='/assets/screenshots/race.png' alt="Race" />
          <div className="banner">Become the World Champion...</div>
          <img src='/assets/screenshots/race.png' alt="Race" />
          <div className="banner">Drive to Survive.</div>
        </div>
    );
  }
}

//export default withRouter(Home);
