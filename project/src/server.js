const express = require('express');
const app = express();
app.use(express.static('project'));
var server = require('http').Server(app);

const io = require('socket.io')(server);

var clickCount = 0;

const players = {}
io.on('connection', (client) => {
  // When a player connects
  // socket.on('new-player', state => {
  //   console.log('New player joined with state:', state)
  //   players[socket.id] = state
  //   // Emit the update-players method in the client side
  //   io.emit('update-players', players)
  // })

  // socket.on('disconnect', state => {
  //   delete players[socket.id]
  //   io.emit('update-players', players)
  // })

  // // When a player moves
  // socket.on('move-player', data => {
  //   const { x, y, angle, playerName, speed } = data

  //   // If the player is invalid, return
  //   if (players[socket.id] === undefined) {
  //     return
  //   }

  //   // Update the player's data if he moved
  //   players[socket.id].x = x
  //   players[socket.id].y = y
  //   players[socket.id].angle = angle
  //   players[socket.id].playerName = {
  //     name: playerName.name,
  //     x: playerName.x,
  //     y: playerName.y
  //   }
  //   players[socket.id].speed = {
  //     value: speed.value,
  //     x: speed.x,
  //     y: speed.y
  //   }

  //   // Send the data back to the client
  //   io.emit('update-players', players)
  // })




    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
          }, interval);
      });
      //io.emit("chat", "hello world");
      // client.on('message', function(socket) {
      //   socket.on('chat message', function(msg){
      //       io.emit('chat message', msg);
      //     });
      // });

      client.on('clicked', function(data) {
        clickCount++;
        //send a message to ALL connected clients
        io.emit('buttonUpdate', clickCount);
  });
  });

  const port = 8000;
  io.listen(port, function (err) {
    if (err) throw err;
    console.log('listening on port 8000');
  });
