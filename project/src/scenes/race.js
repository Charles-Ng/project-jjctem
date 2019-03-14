import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";
export default class Race extends Phaser.Scene {
  preload() {
    // this.load.image('asphalt', './project/src/assets/asphalt.png');
    // this.load.image('car', './project/src/assets/car.png');
    this.load.image("sky", "assets/sky.png");
  }
  create() {
    this.add.image(400, 300, "sky");
    const text = this.add.text(250, 250, "slat man", {
      backgroundColor: "white",
      color: "blue",
      fontSize: 48
    });

    text.setInteractive({ useHandCursor: true });

    //   let groundTiles = []d
    //   for (let i = 0; i <= GAME_HEIGHT / 64 + 1; i++) {
    //     for (let j = 0; j <= GAME_WIDTH / 64 + 1; j++) {
    //       const groundSprite = this.add.sprite(i * 64, j * 64, 'asphalt')
    //       groundTiles.push(groundSprite)
    //     }
    //   }
  }
}
