import Phaser from "phaser";
import player from "./player";
import { createText } from "./isdown.js";
//import createPlayer from "./createPlayer.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";
import openSocket from "socket.io-client";
import io from "socket.io-client";
//const s_ip = 'https://forumla0.herokuapp.com/';
// const socket = openSocket("http://localhost:8000");
//const  socket = openSocket('https://forumla0.herokuapp.com/');
// const socket = io("http://localhost:3000");
//const socket = io('https://forumla0.herokuapp.com/');
// const socket = io("https://formula0.julesyan.com", {path:'/socket', secure: true, reconnect: true, rejectUnauthorized: false});
// const socket = io.connect("https://formula0.julesyan.com:8081", { secure: true, reconnect: true, rejectUnauthorized: false });
// const socket = io("http://localhost:8081");
let counter = 0;
let otherPlayers = {};

// function checkSocketIoConnect() {
//     return new Promise(function(resolve, reject) {
//         var errAlready = false;
//         var timeout = timeout || 5000;
//
//         // success
//         socket.on("connect", function() {
//             clearTimeout(timer);
//             resolve();
//             socket.close();
//         });
//
//         // set our own timeout in case the socket ends some other way than what we are listening for
//         var timer = setTimeout(function() {
//             timer = null;
//             error("local timeout");
//         }, timeout);
//
//         // common error handler
//         function error(data) {
//             if (timer) {
//                 clearTimeout(timer);
//                 timer = null;
//             }
//             if (!errAlready) {
//                 errAlready = true;
//                 reject(data);
//                 socket.disconnect();
//             }
//         }
//
//         // errors
//         socket.on("connect_error", error);
//         socket.on("connect_timeout", error);
//         socket.on("error", error);
//         socket.on("disconnect", error);
//
//     });
// }

export default class Race extends Phaser.Scene {
  // preload() {
  //   this.load.image("universe", "assets/universe.png");
  //   this.load.image("finishline", "assets/redline.png");
  //   this.load.image("car", "assets/dog.png");
  //   this.load.image("tileset", "assets/Tiles/trackSVG.svg");
  //   this.load.tilemapTiledJSON("track", "assets/Tiles/Race Track 3.json");
  // }
  // create() {
  //     checkSocketIoConnect().then(function() {
  //         console.log("success");
  //     }, function(reason) {
  //         console.log("failure");
  //         console.log(reason);
  //     });
  //   let finished = false;
  //   //socket = openSocket(s_ip);
  //   // Here we set the bounds of our game world
  //   this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
  //   // creating cursors
  //   this.cursors = this.input.keyboard.createCursorKeys();
  //   //making background
  //   // let groundTiles = [];
  //   // for (let i = 0; i <= GAME_HEIGHT / 64 + 1; i++) {
  //   //   for (let j = 0; j <= GAME_WIDTH / 64 + 1; j++) {
  //   //     const groundSprite = this.add.sprite(i * 64, j * 64, "asphalt");
  //   //     groundTiles.push(groundSprite);
  //   //   }
  //   // }
  //   let background_image = this.add.sprite(
  //     GAME_WIDTH / 2,
  //     GAME_HEIGHT / 2,
  //     "universe"
  //   );
  //   background_image.height = this.GAME_HEIGHT;
  //   background_image.width = this.GAME_WIDTH;
  //   let map = this.make.tilemap({ key: "track" });
  //   let tileset = map.addTilesetImage("trackSVG", "tileset");
  //   let background = map.createStaticLayer("Tile Layer 2", tileset, 0, 0);
  //   let bumper = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
  //   bumper.setCollisionByProperty({ collides: true });
  //   // testing text
  //   this.text = this.add.text(250, 250, "Doggo race", {
  //     backgroundColor: "black",
  //     color: "blue",
  //     fontSize: 48
  //   });
  //   //this.speed = 0;
  //   // create local player(car)
  //
  //   this.player = player(50, 550, this, socket);
  //   this.player.playerName = createText(this, this.player.sprite.body);
  //   this.player.speedText = createText(this, this.player.sprite.body);
  //
  //   // this.car = this.physics.add.sprite(50, 800, "car").setScale(0.5);
  //   //createPlayer(socket, this.player);
  //
  //   socket.emit("newPlayer", {
  //     x: this.player.sprite.body.x,
  //     y: this.player.sprite.body.y,
  //     angle: this.player.sprite.rotation,
  //     playerName: {
  //       name: String(socket.id),
  //       x: this.player.playerName.x,
  //       y: this.player.playerName.y
  //     },
  //     speed: {
  //       value: this.player.speed,
  //       x: this.player.speedText.x,
  //       y: this.player.speedText.y
  //     },
  //     finish:false
  //
  //   });
  //   // //this.angle = this.car.rotation;
  //   // this.car.speed = 0;
  //   this.player.sprite.setCollideWorldBounds(true);
  //   this.physics.add.collider(this.player.sprite, bumper);
  //
  //   socket.on("update-players", playersData => {
  //     //console.log(playersData);
  //     let playersFound = {};
  //     // Iterate over all players
  //     for (let index in playersData) {
  //       const data = playersData[index];
  //       // In case a player hasn't been created yet
  //       // We make sure that we won't create a second instance of it
  //       if (otherPlayers[index] === undefined && index !== socket.id) {
  //         const newPlayer = player(data.x, data.y, this);
  //         newPlayer.playerName = createText(this, newPlayer);
  //         newPlayer.speedText = createText(this, newPlayer);
  //         newPlayer.updatePlayerName(
  //           data.playerName.name,
  //           data.playerName.x,
  //           data.playerName.y
  //         );
  //         otherPlayers[index] = newPlayer;
  //       }
  //
  //       playersFound[index] = true;
  //
  //       // Update players data
  //       if (index !== socket.id) {
  //         // Update players target but not their real position
  //         otherPlayers[index].target_x = data.x;
  //         otherPlayers[index].target_y = data.y;
  //         otherPlayers[index].target_rotation = data.angle;
  //
  //         otherPlayers[index].playerName.target_x = data.playerName.x;
  //         otherPlayers[index].playerName.target_y = data.playerName.y;
  //
  //         otherPlayers[index].speedText.target_x = data.speed.x;
  //         otherPlayers[index].speedText.target_y = data.speed.y;
  //
  //         otherPlayers[index].speed = data.speed.value;
  //         otherPlayers[index].finish = data.finish;
  //       }
  //     }
  //
  //     // Check if there's no missing players, if there is, delete them
  //     for (let id in otherPlayers) {
  //       if (!playersFound[id]) {
  //         otherPlayers[id].sprite.destroy();
  //         otherPlayers[id].playerName.destroy();
  //         otherPlayers[id].speedText.destroy();
  //         delete otherPlayers[id];
  //       }
  //     }
  //   });
  //
  //
  //
  //   this.finishLine = this.physics.add.sprite(775, 510, "finishline");
  //   this.finishLine.scaleY = 0.1;
  //   this.finishLine.setPosition(770, 510);
  // }
  //
  // update() {
  //   this.player.drive(this);
  //   for (let id in otherPlayers) {
  //     // console.log(otherPlayers);
  //     let player = otherPlayers[id];
  //     if (player.target_x !== undefined) {
  //       // Interpolate the player's position
  //
  //       player.sprite.x += (player.target_x - player.sprite.body.x) * 0.3;
  //
  //       player.sprite.y += (player.target_y - player.sprite.body.y) * 0.3;
  //
  //       let angle = player.target_rotation;
  //
  //       // let direction =
  //       //   ((angle - player.sprite.rotation) / (Math.PI * 2)) * 0.3;
  //       // direction -= Math.round(direction);
  //       // direction *= Math.PI * 2;
  //       player.sprite.rotation = angle * 0.016;
  //
  //       // Interpolate the player's name position
  //       player.playerName.x +=
  //         (player.playerName.target_x - player.playerName.x) * 0.3;
  //       player.playerName.y +=
  //         (player.playerName.target_y - player.playerName.y) * 0.3;
  //
  //       // Interpolate the player's speed text position
  //       player.speedText.x +=
  //         (player.speedText.target_x - player.speedText.x) * 0.3;
  //       player.speedText.y +=
  //         (player.speedText.target_y - player.speedText.y) * 0.3;
  //
  //       player.updatePlayerStatusText(
  //         "speed",
  //         player.speedText.x,
  //         player.speedText.y,
  //         player.speedText
  //       );
  //
  //       if (player.finish === true) {
  //         //console.log('what');
  //         this.text.setText('YOU LOSE');
  //       }
  //     }
  //   }
  //
  //   if (this.player.sprite.x == this.finishLine.x ) {
  //     // add what u wanna do here!!!!!!!!
  //     if (counter == 0) {
  //       socket.emit("finished", {
  //         finish: true
  //       });
  //       this.text.setText("YOU WIN");
  //       this.player.playerFinished();
  //       counter++;
  //     }
  //
  //
  //
  //   }
  //   // // drive forward if up is pressed
  //   // if (this.cursors.up.isDown && this.car.speed <= 400) {
  //   //   this.car.speed += 20;
  //   // } else {
  //   //   if (this.car.speed >= 20) {
  //   //     this.car.speed -= 20;
  //   //   }
  //   // }
  //
  //   // // Drive backwards if down is pressed down
  //   // if (this.cursors.down.isDown && this.car.speed >= -200) {
  //   //   this.car.speed -= 10;
  //   // } else {
  //   //   if (this.car.speed <= -10) {
  //   //     this.car.speed += 10;
  //   //   }
  //   // }
  //
  //   // // Steers the car
  //   // if (this.cursors.left.isDown) {
  //   //   this.car.setAngularVelocity(-250 * (this.car.speed / 1000));
  //   // } else if (this.cursors.right.isDown) {
  //   //   this.car.setAngularVelocity(250 * (this.car.speed / 1000));
  //   // } else {
  //   //   this.car.setAngularVelocity(0);
  //   // }
  //
  //   // // movement of the car
  //   // this.car.setVelocityX(
  //   //   this.car.speed * Math.cos((this.car.angle - 360) * 0.01745)
  //   // );
  //   // this.car.setVelocityY(
  //   //   this.car.speed * Math.sin((this.car.angle - 360) * 0.01745)
  //   // );
  // }
}
