import Phaser from "phaser";
//import {isDown} from "./isdown";


export default function (x, y, game, socket) {
    const player = {
      socket,
      sprite:  game.physics.add.sprite(x, y, "car"),
      playerName: null,
      speed: 0,
      
      speedText: null,
      drive (game) {
        //this.
        //game.angle = this.sprite.body.rotation;
        /*
        Most of the driving logic was written by Daniel Wuggenig
        https://www.anexia-it.com/blog/en/introduction-to-the-phaser-framework/
        I decided to use it since this is supposed to be an introduction to multiplayer
        online car game, his driving solution is simple and clean and fits perfectly
        */
  
        // const KEYS = {
        //   W: Phaser.Input.Keyboard.W,
        //   S: Phaser.Input.Keyboard.S,
        //   A: Phaser.Input.Keyboard.A,
        //   D: Phaser.Input.Keyboard.D
        // }
  
        // Only emit if the player is moving
        if (this.speed !== 0) {
          this.emitPlayerData();
        }
     // drive forward if up is pressed
        if (game.cursors.up.isDown && this.speed <= 400) {
          this.speed += 20;
        } else {
          if (this.speed >= 20) {
            this.speed -= 20;
          }
        }

        // Drive backwards if down is pressed down
        if (game.cursors.down.isDown && this.speed >= -200) {
          this.speed -= 10;
        } else {
          if (this.speed <= -10) {
            this.speed += 10;
          }
        }

        // Steers the car
        if (game.cursors.left.isDown) {
          this.sprite.body.setAngularVelocity(-250 * (this.speed / 1000));
        } else if (game.cursors.right.isDown) {
          this.sprite.body.setAngularVelocity(250 * (this.speed / 1000));
        } else {
          this.sprite.body.setAngularVelocity(0);
        }
       
  
       
        // this.sprite.body.velocity.x = this.speed * Math.cos((this.sprite.body.angle - 360) * 0.01745)
        // this.sprite.body.velocity.y = this.speed * Math.sin((this.sprite.body.angle - 360) * 0.01745)
          this.sprite.body.setVelocityX(
            this.speed * Math.cos((this.sprite.body.angle - 360) * 0.01745)
          );
          this.sprite.body.setVelocityY(
            this.speed * Math.sin((this.sprite.body.angle - 360) * 0.01745)
          );
        
        // Brings the player's sprite to top
        //game.world.bringToTop(this.sprite)
  
        this.updatePlayerName()
        this.updatePlayerStatusText('speed', this.sprite.body.x - 57, this.sprite.body.y - 39, this.speedText)
      },
      emitPlayerData () {
        // Emit the 'move-player' event, updating the player's data on the server
        socket.emit('movePlayer', {
          x: this.sprite.body.x,
          y: this.sprite.body.y,
          angle: this.sprite.body.rotation,
          playerName: {
            name: this.playerName.text,
            x: this.playerName.x,
            y: this.playerName.y
          },
          speed: {
            value: this.speed,
            x: this.speedText.x,
            y: this.speedText.y
          }
        })
      },
      updatePlayerName (name = this.socket.id, x = this.sprite.body.x - 57, y = this.sprite.body.y - 59) {
        // Updates the player's name text and position
        this.playerName.text = String(name)
        this.playerName.x = x
        this.playerName.y = y
        // Bring the player's name to top
        //game.world.bringToTop(this.playerName)
      },
      updatePlayerStatusText (status, x, y, text) {
        // Capitalize the status text
        const capitalizedStatus = status[0].toUpperCase() + status.substring(1)
        let newText = ''
        // Set the speed text to either 0 or the current speed
        this[status] < 0 ? this.newText = 0 : this.newText = this[status]
        // Updates the text position and string
        text.x = x
        text.y = y
        text.text = `${capitalizedStatus}: ${parseInt(this.newText)}`
        //game.world.bringToTop(text)
      }
    }
    return player
  }

