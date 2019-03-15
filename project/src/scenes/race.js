import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";
export default class Race extends Phaser.Scene {
  preload() {
    this.load.image("asphalt", "assets/asphalt.png");
    this.load.image("car", "assets/car.png");
  }
  create() {
    // Here we set the bounds of our game world
    this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    // creating cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    // making background
    let groundTiles = [];
    for (let i = 0; i <= GAME_HEIGHT / 64 + 1; i++) {
      for (let j = 0; j <= GAME_WIDTH / 64 + 1; j++) {
        const groundSprite = this.add.sprite(i * 64, j * 64, "asphalt");
        groundTiles.push(groundSprite);
      }
    }

    // testing text
    const text = this.add.text(250, 250, "PLEASE FINSIH THIS BETA", {
      backgroundColor: "white",
      color: "blue",
      fontSize: 48
    });

    // create local player(car)
    this.car = this.physics.add.sprite(50, 800, "car");
    this.angle = this.car.rotation;
    this.speed = 0;
    this.car.setCollideWorldBounds(true);
  }

  update() {
    // drive forward if up is pressed
    if (this.cursors.up.isDown && this.speed <= 400) {
      this.speed += 20;
    } else {
      if (this.speed >= 20) {
        this.speed -= 20;
      }
    }

    // Drive backwards if down is pressed down
    if (this.cursors.down.isDown && this.speed >= -200) {
      this.speed -= 10;
    } else {
      if (this.speed <= -10) {
        this.speed += 10;
      }
    }

    // Steers the car
    if (this.cursors.left.isDown) {
      this.car.setAngularVelocity(-250 * (this.speed / 1000));
    } else if (this.cursors.right.isDown) {
      this.car.setAngularVelocity(250 * (this.speed / 1000));
    } else {
      this.car.setAngularVelocity(0);
    }

    // movement of the car
    this.car.setVelocityX(
      this.speed * Math.cos((this.car.angle - 360) * 0.01745)
    );
    this.car.setVelocityY(
      this.speed * Math.sin((this.car.angle - 360) * 0.01745)
    );
  }
}
