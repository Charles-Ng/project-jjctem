import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";
export default class Race extends Phaser.Scene {
  preload() {
    this.load.image("asphalt", "assets/asphalt.png");
    this.load.image("car", "assets/car.png");
    this.load.image("tileset", "assets/Tiles/trackSVG.svg");
    this.load.tilemapTiledJSON("track", "assets/Tiles/Race Track1.json");
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
    let map = this.make.tilemap({ key: "track" });
    let tileset = map.addTilesetImage("trackSVG", "tileset");
    let background = map.createStaticLayer("Tile Layer 2", tileset, 0, 0);
    let bumper = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
    bumper.setCollisionByProperty({ collides: true });
    // testing text
    const text = this.add.text(250, 250, "PLEASE FINSIH THIS BETA", {
      backgroundColor: "white",
      color: "blue",
      fontSize: 48
    });

    // create local player(car)
    this.car = this.physics.add.sprite(50, 800, "car").setScale(0.5);

    this.angle = this.car.rotation;
    this.speed = 0;
    this.car.setCollideWorldBounds(true);
    this.physics.add.collider(this.car, bumper);
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
