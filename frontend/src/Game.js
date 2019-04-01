import React from "react";
import Phaser from "phaser";
import Race from "./scenes/race";
import "./style/game.css";
import * as config from "./config";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export class Game extends React.Component {
    componentDidMount() {
        if (cookies.get('user') != undefined){
            new Phaser.Game({
                type: Phaser.AUTO,
                parent: "phaser-game",
                width: config.GAME_WIDTH,
                height: config.GAME_HEIGHT,
                scene: [Race],
                physics: {
                    default: "arcade",
                    arcade: {
                        debug: false
                    }
                }
            });
        }
    }

  shouldComponentUpdate() {
    return false;
  }
  constructor(props) {
    super(props);
  }




  render() {
    if (cookies.get('user') == undefined){
        this.props.history.push('/');
        return "";
    } else {
        return <div id="phaser-game" />;
    }
  }
}
