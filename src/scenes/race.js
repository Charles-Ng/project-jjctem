import Phaser from "phaser";
import player from "./player";
import { createText } from "./isdown.js";
//import createPlayer from "./createPlayer.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";
import openSocket from "socket.io-client";
import io from "socket.io-client";
import { checkSocketIoConnect } from "./../api";

//var HOST = location.origin.replace(/^http/, 'ws');
var socket = new WebSocket("ws://localhost:8000");
//const s_ip = 'https://forumla0.herokuapp.com/';
// const socket = openSocket("http://localhost:8000");
//const  socket = openSocket('https://forumla0.herokuapp.com/');
// const socket = io("http://localhost:3000");
//const socket = io('https://forumla0.herokuapp.com/');
//const socket = io.connect("http://formula0.julesyan.com", {path:'/socket'});
// const socket = io.connect("http://formula0.julesyan.com:8081", {path: "/", rejectUnauthorized: false, secure: true});
// const socket = io("http://localhost:8081");
let counter = 0;
let countdown = 3;
let startcount = 0;
let otherPlayers = {};
let game;
let won = true;
let started = false;
var id = Math.random()
  .toString(36)
  .substr(2, 5);
//let socketer;
export default class Race extends Phaser.Scene {
  preload() {
    this.load.image("universe", "assets/universe.png");
    this.load.image("finishline", "assets/redline.png");
    this.load.image("car", "assets/dog.png");
    this.load.image("tileset", "assets/Tiles/trackSVG.svg");
    this.load.tilemapTiledJSON("track", "assets/Tiles/Race Track Final.json");
  }

  create() {
    // checkSocketIoConnect().then(function() {
    //     console.log("success");
    // }, function(reason) {
    //     console.log("failure");
    //     console.log(reason);
    // });
    game = this;
    //socket = openSocket(s_ip);
    // Here we set the bounds of our game world
    this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    // creating cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    //making background
    // let groundTiles = [];
    // for (let i = 0; i <= GAME_HEIGHT / 64 + 1; i++) {
    //   for (let j = 0; j <= GAME_WIDTH / 64 + 1; j++) {
    //     const groundSprite = this.add.sprite(i * 64, j * 64, "asphalt");
    //     groundTiles.push(groundSprite);
    //   }
    // }

    let map = this.make.tilemap({ key: "track" });
    let tileset = map.addTilesetImage("bumper", "tileset");
    let tileset2 = map.addTilesetImage("background", "universe");
    let background2 = map.createStaticLayer("Tile Layer 3", tileset2, 0, 0);
    let background = map.createStaticLayer("Tile Layer 2", tileset, 0, 0);
    let bumper = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
    bumper.setCollisionByProperty({ collides: true });

    //this.speed = 0;
    // create local player(car)
    // var slat = {type: "slat", text:"wow"};
    // socket.send(JSON.stringify(slat));

    //console.log(id);
    this.player = player(50, 550, this, socket, id);
    this.player.playerName = createText(this, this.player.sprite.body);
    this.player.speedText = createText(this, this.player.sprite.body);
    //console.log('why empty' + this.player.playerName.text);
    //playa = this.player;
    // this.car = this.physics.add.sprite(50, 800, "car").setScale(0.5);
    //createPlayer(socket, this.player);
    var newplayer = {
      type: "new-player",
      details: {
        x: this.player.sprite.body.x,
        y: this.player.sprite.body.y,
        angle: this.player.sprite.rotation,
        playerName: {
          name: id,
          x: this.player.playerName.x,
          y: this.player.playerName.y
        },
        speed: {
          value: this.player.speed,
          x: this.player.speedText.x,
          y: this.player.speedText.y
        },
        finish: this.player.finish,
        start: this.player.start
      }
    };
    socket.send(JSON.stringify(newplayer));

    socket.onmessage = function(event) {
      var playersData = JSON.parse(event.data);
      //console.log(playersData);
      let playersFound = {};
      // Iterate over all players
      for (let index in playersData) {
        const data = playersData[index];
        //  console.log(index);
        //  console.log(data);

        // In case a player hasn't been created yet
        // We make sure that we won't create a second instance of it
        if (otherPlayers[index] === undefined && data.playerName.name !== id) {
          const newPlayer = player(
            data.x,
            data.y,
            game,
            socket,
            data.playerName.name
          );
          newPlayer.playerName = createText(game, newPlayer);
          newPlayer.speedText = createText(game, newPlayer);
          newPlayer.updatePlayerName(
            data.playerName.name,
            data.playerName.x,
            data.playerName.y
          );
          otherPlayers[index] = newPlayer;
        }

        playersFound[index] = true;

        // Update players data
        if (data.playerName.name !== id) {
          // Update players target but not their real position
          otherPlayers[index].target_x = data.x;
          otherPlayers[index].target_y = data.y;
          otherPlayers[index].target_rotation = data.angle;

          otherPlayers[index].playerName.target_x = data.playerName.x;
          otherPlayers[index].playerName.target_y = data.playerName.y;

          otherPlayers[index].speedText.target_x = data.speed.x;
          otherPlayers[index].speedText.target_y = data.speed.y;

          otherPlayers[index].speed = data.speed.value;
          otherPlayers[index].finish = data.finish;
          otherPlayers[index].start = data.start;
        }
      }

      // Check if there's no missing players, if there is, delete them
      for (let idz in otherPlayers) {
        if (!playersFound[idz]) {
          otherPlayers[idz].sprite.destroy();
          otherPlayers[idz].playerName.destroy();
          otherPlayers[idz].speedText.destroy();
          delete otherPlayers[idz];
        }
      }
      //console.log(data);
    };
    // socket.onclose = function() {
    //   //console.log('wow');
    //   //  socket.send(JSON.stringify(
    //   //    {slat:id}
    //   //  ));
    //   socket.close({code:1000, reason:id});
    // };
    // //this.angle = this.car.rotation;
    // this.car.speed = 0;
    this.player.sprite.setCollideWorldBounds(true);
    this.physics.add.collider(this.player.sprite, bumper);

    this.player.playerName = createText(this, this.player.sprite.body);
    // socket.on("update-players", playersData => {
    //   //console.log(playersData);
    // let playersFound = {};
    // // Iterate over all players
    // for (let index in playersData) {
    //   const data = playersData[index];
    //   // In case a player hasn't been created yet
    //   // We make sure that we won't create a second instance of it
    //   if (otherPlayers[index] === undefined && index !== socket.id) {
    //     const newPlayer = player(data.x, data.y, this);
    //     newPlayer.playerName = createText(this, newPlayer);
    //     newPlayer.speedText = createText(this, newPlayer);
    //     newPlayer.updatePlayerName(
    //       data.playerName.name,
    //       data.playerName.x,
    //       data.playerName.y
    //     );
    //     otherPlayers[index] = newPlayer;
    //   }

    //   playersFound[index] = true;

    //   // Update players data
    //   if (index !== socket.id) {
    //     // Update players target but not their real position
    //     otherPlayers[index].target_x = data.x;
    //     otherPlayers[index].target_y = data.y;
    //     otherPlayers[index].target_rotation = data.angle;

    //     otherPlayers[index].playerName.target_x = data.playerName.x;
    //     otherPlayers[index].playerName.target_y = data.playerName.y;

    //     otherPlayers[index].speedText.target_x = data.speed.x;
    //     otherPlayers[index].speedText.target_y = data.speed.y;

    //     otherPlayers[index].speed = data.speed.value;
    //     otherPlayers[index].finish = data.finish;
    //   }
    // }

    // // Check if there's no missing players, if there is, delete them
    // for (let id in otherPlayers) {
    //   if (!playersFound[id]) {
    //     otherPlayers[id].sprite.destroy();
    //     otherPlayers[id].playerName.destroy();
    //     otherPlayers[id].speedText.destroy();
    //     delete otherPlayers[id];
    //   }
    // }
    // });

    this.finishLine = this.physics.add.sprite(4975, 320, "finishline");
    this.finishLine.scaleY = 0.1;
    this.finishLine.setPosition(4975, 320);
    this.cameras.main.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setZoom(1);

    this.startLine = this.physics.add.sprite(150, 600, "finishline");
    this.startLine.scaleY = 0.1;
    this.startLine.setImmovable();
    this.physics.add.collider(this.player.sprite, this.startLine);

    this.timer = this.add
      .text(32, 32, { colour: "white", fontSize: 100 })
      .setScrollFactor(0);

    this.second = 0;
    this.start_text = this.add
      .text(100, 200, "Press me to Start!", {
        color: "white",
        fontSize: 50
      })
      .setStroke("Blue", 10)
      .setInteractive()
      .on("pointerdown", () =>
        this.setStart(this.start_text, this.player, game)
      );
  }

  setStart(text, player, game) {
    console.log("here");
    var start = { type: "start", details: id };
    console.log(start);
    socket.send(JSON.stringify(start));

    player.playerStarted();
    game.start_timer(text, game);
  }

  start_timer(text, game) {
    game.time.addEvent({
      delay: 1000,
      callback: function() {
        game.displayTimer(text, game);
      },
      repeat: 4
    });
  }
  displayTimer(text, game) {
    if (countdown > 0) {
      text.setText(countdown);
      countdown = countdown - 1;
    } else if (countdown == 0) {
      text.setText("GO");
      countdown = countdown - 1;
    } else {
      text.destroy();
      game.startLine.destroy();

      game.timedEvent = game.time.addEvent({
        delay: 1000,
        callback: function() {
          game.second += 1;
        },
        loop: true
      });
    }
  }

  update() {
    if (this.timedEvent != undefined) {
      this.timer.setText(
        "Time: " +
          this.second +
          this.timedEvent
            .getProgress()
            .toString()
            .substr(1, 3)
      );

      this.time_track =
        this.second +
        this.timedEvent
          .getProgress()
          .toString()
          .substr(1, 3);
    } else this.timer.setText("Time: 0");

    this.player.drive(this);
    socket.onmessage = function(event) {
      var playersData = JSON.parse(event.data);
      //console.log(playersData);
      let playersFound = {};
      // Iterate over all players
      for (let index in playersData) {
        const data = playersData[index];
        //  console.log(index);
        //  console.log(data);

        // In case a player hasn't been created yet
        // We make sure that we won't create a second instance of it
        if (otherPlayers[index] === undefined && data.playerName.name !== id) {
          const newPlayer = player(
            data.x,
            data.y,
            game,
            socket,
            data.playerName.name
          );
          newPlayer.playerName = createText(game, newPlayer);
          newPlayer.speedText = createText(game, newPlayer);
          newPlayer.updatePlayerName(
            data.playerName.name,
            data.playerName.x,
            data.playerName.y
          );
          otherPlayers[index] = newPlayer;
        }

        playersFound[index] = true;

        // Update players data
        if (data.playerName.name !== id) {
          // Update players target but not their real position
          otherPlayers[index].target_x = data.x;
          otherPlayers[index].target_y = data.y;
          otherPlayers[index].target_rotation = data.angle;

          otherPlayers[index].playerName.target_x = data.playerName.x;
          otherPlayers[index].playerName.target_y = data.playerName.y;

          otherPlayers[index].speedText.target_x = data.speed.x;
          otherPlayers[index].speedText.target_y = data.speed.y;

          otherPlayers[index].speed = data.speed.value;
          otherPlayers[index].finish = data.finish;
          otherPlayers[index].start = data.start;
        }
      }

      // Check if there's no missing players, if there is, delete them
      for (let idz in otherPlayers) {
        if (!playersFound[idz]) {
          otherPlayers[idz].sprite.destroy();
          otherPlayers[idz].playerName.destroy();
          otherPlayers[idz].speedText.destroy();
          delete otherPlayers[idz];
        }
      }
      //console.log(data);
    };
    for (let id in otherPlayers) {
      // console.log(otherPlayers);
      let player = otherPlayers[id];
      if (player.target_x !== undefined) {
        // Interpolate the player's position

        player.sprite.x += (player.target_x - player.sprite.body.x) * 0.3;

        player.sprite.y += (player.target_y - player.sprite.body.y) * 0.3;

        let angle = player.target_rotation;

        // let direction =
        //   ((angle - player.sprite.rotation) / (Math.PI * 2)) * 0.3;
        // direction -= Math.round(direction);
        // direction *= Math.PI * 2;
        player.sprite.rotation = angle * 0.016;

        // Interpolate the player's name position
        player.playerName.x +=
          (player.playerName.target_x - player.playerName.x) * 0.3;
        player.playerName.y +=
          (player.playerName.target_y - player.playerName.y) * 0.3;

        // Interpolate the player's speed text position
        player.speedText.x +=
          (player.speedText.target_x - player.speedText.x) * 0.3;
        player.speedText.y +=
          (player.speedText.target_y - player.speedText.y) * 0.3;

        player.updatePlayerStatusText(
          "speed",
          player.speedText.x,
          player.speedText.y,
          player.speedText
        );

        if (player.start == true) {
          started = true;
        }
        if (started == true) {
          if (startcount == 0) {
            this.start_timer(this.start_text, this);
          }
          startcount++;
        }

        if (player.finish == true) {
          if (this.player.finish != true) {
            this.text = this.add.text(4500, 100, "", {
              backgroundColor: "black",
              color: "blue",
              fontSize: 80
            });

            this.text.setText("YOU LOST");
            won = false;
          }
        }
      }
    }

    if (this.player.sprite.x > this.finishLine.x - 10) {
      // add what u wanna do here!!!!!!!!
      if (counter == 0) {
        var finish = { type: "finish", details: id };
        socket.send(JSON.stringify(finish));
        // socket.send("finished", {
        //   finish: true
        // });
        if (won == true) {
          this.text = this.add.text(4500, 100, "", {
            backgroundColor: "black",
            color: "blue",
            fontSize: 80
          });
          this.text.setText("YOU WIN");
        }

        this.player.playerFinished();
        this.timedEvent.paused = true;
        counter++;
      }
    }
    // // drive forward if up is pressed
    // if (this.cursors.up.isDown && this.car.speed <= 400) {
    //   this.car.speed += 20;
    // } else {
    //   if (this.car.speed >= 20) {
    //     this.car.speed -= 20;
    //   }
    // }

    // // Drive backwards if down is pressed down
    // if (this.cursors.down.isDown && this.car.speed >= -200) {
    //   this.car.speed -= 10;
    // } else {
    //   if (this.car.speed <= -10) {
    //     this.car.speed += 10;
    //   }
    // }

    // // Steers the car
    // if (this.cursors.left.isDown) {
    //   this.car.setAngularVelocity(-250 * (this.car.speed / 1000));
    // } else if (this.cursors.right.isDown) {
    //   this.car.setAngularVelocity(250 * (this.car.speed / 1000));
    // } else {
    //   this.car.setAngularVelocity(0);
    // }

    // // movement of the car
    // this.car.setVelocityX(
    //   this.car.speed * Math.cos((this.car.angle - 360) * 0.01745)
    // );
    // this.car.setVelocityY(
    //   this.car.speed * Math.sin((this.car.angle - 360) * 0.01745)
    // );
  }
}
