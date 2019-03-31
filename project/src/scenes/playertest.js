this.car = this.physics.add.sprite(50, 800, "car");
this.car.speedtext = null;
this.angle = this.car.rotation;
this.car.playername = createText(this, this.car);

this.car.playername.depth = 0;
// this.car.playername.text = ;
// this.car.playername.x = 50;
// this.car.playername.y = 800;
this.speed = 0;
this.car.speedtext = createText(this, this.car);
this.car.setCollideWorldBounds(true);
  // can seperate this into a fucntion
socket.emit('newPlayer', {
  x: this.car.body.x,
  y: this.car.body.y,
  angle: this.car.rotation,
  playerName: {
    name: this.car.playername,
    x: this.car.body.x - 57,
    y: this.car.body.x - 39
  },
  speed: {
    value: this.speed,
    x: this.speed,
    y: this.speed
  }
});

/*import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";
import player from "./player";
import {createText} from "./isdown.js";
import createPlayer from "./createPlayer.js";
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
let otherPlayers = {};
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
    // this.player = player(0,0, this, socket);
    // socket.emit('newPlayer', {
    //   x: 0,
    //   y: 0,
    //   angle: this.player.sprite.rotation,
    //   playerName: {
    //     name: String(socket.id),
    //     x: this.player.playerName.x,
    //     y: this.player.playerName.y
    //   },
    //   speed: {
    //     value: this.player.speed,
    //     x: this.player.speed.x,
    //     y: this.player.speed.y
    //   }
    // });
    // create local player(car)
    //seperate this into a diff ile 
   this.player = player(100, 100, this, socket);
   //this.player.sprite.body.setCollideWorldBounds(true);
   this.player.playerName = createText(this, this.player.sprite.body);
   this.player.speedText = createText(this, this.player.sprite.body);
    createPlayer(socket, this.player);
  //   socket.on('update-players', playersData => {
  //     //console.log(playersData);
  //     for (let index in playersData) {
  //       const data = playersData[index];
  //       //console.log(data);
  //     }
  //   });
    //   let playersFound = {}
    //   // Iterate over all players
    //   for (let index in playersData) {
    //     const data = playersData[index]
    //     // In case a player hasn't been created yet
    //     // We make sure that we won't create a second instance of it
    //     if (otherPlayers[index] === undefined && index !== socket.id) {
    //       // const newPlayer = player(data.x, data.y, this)
    //       // newPlayer.playerName = createText(this, newPlayer)
    //       // newPlayer.speedText = createText(this, newPlayer)
    //       // newPlayer.updatePlayerName(data.playerName.name, data.playerName.x, data.playerName.y)
    //       // otherPlayers[index] = newPlayer
    //     }
  
    //     playersFound[index] = true
  
    //     // Update players data
    //     if (index !== socket.id) {
    //       // Update players target but not their real position
    //       otherPlayers[index].target_x = data.x
    //       otherPlayers[index].target_y = data.y
    //       otherPlayers[index].target_rotation = data.angle
  
    //       otherPlayers[index].playerName.target_x = data.playerName.x
    //       otherPlayers[index].playerName.target_y = data.playerName.y
  
    //       otherPlayers[index].speedText.target_x = data.speed.x
    //       otherPlayers[index].speedText.target_y = data.speed.y
  
    //       otherPlayers[index].speed = data.speed.value
    //     }
    //   }
  
    //   // Check if there's no missing players, if there is, delete them
    //   for (let id in otherPlayers) {
    //     if (!playersFound[id]) {
    //       otherPlayers[id].sprite.destroy()
    //       otherPlayers[id].playerName.destroy()
    //       otherPlayers[id].speedText.destroy()
    //       delete otherPlayers[id]
    //     }
    //   }
    // });
    //console.log('huh what');
    // socket.emit('newPlayer', {
    //   x: this.car.body.x,
    //   y: this.car.body.y,
    //   angle: this.car.rotation, 
    //   playerName: {
    //     name: String(socket.id),
    //     x: this.car.playerName.x,
    //     y:this.car.playerName.y
    //   },
    //   speed: {
    //     value: this.car.speed,
    //     x :this.car.speed.x,
    //     y: this.car.speed.y
    //   }
    // })
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
      this.player.sprite.body.setAngularVelocity(-250 * (this.speed / 1000));
    } else if (this.cursors.right.isDown) {
      this.player.sprite.body.setAngularVelocity(250 * (this.speed / 1000));
    } else {
      this.player.sprite.body.setAngularVelocity(0);
    }

    // movement of the car
    this.player.sprite.body.setVelocityX(
      this.speed * Math.cos((this.player.sprite.body.angle - 360) * 0.01745)
    );
    this.player.sprite.body.setVelocityY(
      this.speed * Math.sin((this.player.sprite.body.angle - 360) * 0.01745)
    );
    //this.player.drive(this);
  //   if (this.speed !== 0) {
  //     this.emitPlayerData();
  //   }

 

  //   // movement of the car
  //   this.car.setVelocityX(
  //     this.speed * Math.cos((this.car.angle - 360) * 0.01745)
  //   );
  //   this.car.setVelocityY(
  //     this.speed * Math.sin((this.car.angle - 360) * 0.01745)
  //   );
  // }
  // emitPlayerData () {
  //   // Emit the 'move-player' event, updating the player's data on the server
  //   socket.emit('move-player', {
  //     x: this.car.body.x,
  //     y: this.car.body.y,
  //     angle: this.car.rotation,
  //     playerName: {
  //       name: this.car.playername.text,
  //       x: this.car.playername.x,
  //       y: this.car.playername.y
  //     },
  //     speed: {
  //       value: this.speed,
  //       x: this.car.speedtext.x,
  //       y: this.car.speedtext.y
  //     }
  //   });
  //   let newText = '';
  //   this.newText = this.speed;
  //   this.car.speedtext.x = this.car.body.x - 20;
  //   this.car.speedtext.y = this.car.body.y - 20;
  //   this.car.speedtext.text = 'speed:' + parseInt(this.newText);
  //   this.car.playername.x = this.car.body.x-30;
  //   this.car.playername.y = this.car.body.y-30;
  //   this.car.playername.text = String(socket.id);

   }
}
*/ 