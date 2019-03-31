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

  }




  render() {
    return <div id="phaser-game" />;
  }
}
