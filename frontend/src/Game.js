import React from "react";
import Phaser from "phaser";
// import { subscribeToTimer, buttonClicked, newPlayer, checkSocketIoConnect } from "./api";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";
import Race from "./scenes/race";
export class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-game",
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      scene: [Race],
      physics: {
        default: "arcade",
        arcade: {
          debug: false
        }
      }
    };

    new Phaser.Game(config);
  }

  shouldComponentUpdate() {
    return false;
  }
  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) =>
    //   this.setState({
    //     timestamp
    //   })
    // );
    // connect(message => {
    //   console.log(message);
    // });
    // buttonClicked(clicks => {
    //   this.setState({ clicks });
    // });

    // newPlayer(slat => {
    //   this.setState({slat});
    // })
  }

  // clicked = () => {
  //   buttonClicked(clicks => {
  //     this.setState({clicks});
  //   });
  // };s

  state = {
    timestamp: "no timestamp yet",
    clicks: 0,
    slat:"slat"
  };
  render() {
    return <div id="phaser-game" />;
  }
}
