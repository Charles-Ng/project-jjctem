const express = require("express");
const app = express();
app.use(express.static("project"));
var server = require("http").Server(app);

const io = require("socket.io")(server);

var clickCount = 0;

const players = {};
io.on("connection", client => {
  // When a player connects
  client.on("newPlayer", state => {
    console.log("New player joined with state:", state);
    players[client.id] = state;
    // Emit the update-players method in the client side
    client.emit("update-players", players);
    //client.emit('slat', client.id);;
  });
  client.on("disconnect", state => {
    delete players[client.id];
    client.emit("update-players", players);
  });

  client.on("finished", data => {
    //console.log(players);
    const { finished } = data;
    if (players[client.id] === undefined) {
      return;
    }
    players[client.id].finish = true;
    //console.log(players);

    client.emit("update-players", players);
  });

  client.on("move-player", data => {
    //console.log(data);
    const { x, y, angle, playerName, speed, finished } = data;

    // If the player is invalid, return
    if (players[client.id] === undefined) {
      return;
    }
    //console.log('slat');
    // Update the player's data if he moved
    players[client.id].x = x;
    players[client.id].y = y;
    players[client.id].angle = angle;
    players[client.id].playerName = {
      name: playerName.name,
      x: playerName.x,
      y: playerName.y
    };
    players[client.id].speed = {
      value: speed.value,
      x: speed.x,
      y: speed.y
    };
    players[client.id].finish = finished;


    // Send the data back to the client
    client.emit("update-players", players);
  });

  client.on("subscribeToTimer", interval => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
  //io.emit("chat", "hello world");
  // client.on('message', function(socket) {
  //   socket.on('chat message', function(msg){
  //       io.emit('chat message', msg);
  //     });
  // });

  //     client.on('clicked', function(data) {
  //       clickCount++;
  //       //send a message to ALL connected clients
  //       io.emit('buttonUpdate', clickCount);
  // });
});

const port = 8081;
//const port = 'https://forumla0.herokuapp.com/game';
// server.listen(port, function(err) {
//   if (err) throw err;
//   console.log("listening on port 8000");
// });
server.listen(port, "127.0.0.1");
// socket.on('disconnect', state => {
//   delete players[socket.id]
//   io.emit('update-players', players)
// })

// // When a player moves
