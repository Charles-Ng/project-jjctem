const express = require("express");
const app = express();
app.use(express.static("project"));
var server = require("http").Server(app);
const port = 8000;
server.listen(port, function(err) {
  if (err) throw err;
  console.log(`listening on port ${port}`);
});
const SocketServer = require('ws').Server;
const io = new SocketServer({ server });
//const io = require("socket.io")(server);

var playerCount = 0;

const players = {};
io.on("connection", client => {
  var id = playerCount++;
  console.log('Client connected');
  client.on('close', function() {
    delete players[id];
    //console.log( players);
    if (client.readyState !== undefined &&client.readyState === 1) {
      client.send( JSON.stringify(players));
    }
    
  } );
  client.on("message", function(data) { 
    var current;
    if (typeof data === 'string') {
        current = JSON.parse(data);
      // note: a real-world app would want to sanity check the data
    }
    switch(current.type) {
      case "new-player":
        //current.details.playerName.name = "player " + playerCount;
        players[id] = current.details;
        // console.log("player " + playerCount + " joined");
        // console.log(players);
        //playerCount++;
        //client.send(JSON.stringify({type: 'id', id:playerCount}));
        client.send( JSON.stringify(players));
        break;
      case "move":
        const { x, y, angle, playerName, speed, finished } = current.details;
        players[id].x = x;
        players[id].y = y;
        players[id].angle = angle;
        players[id].playerName = {
          name: playerName.name,
          x: playerName.x,
          y: playerName.y
        };
        players[id].speed = {
          value: speed.value,
          x: speed.x,
          y: speed.y
        };
        players[id].finish = finished;
        client.send( JSON.stringify(players));
        break;
      case "finish":
      //console.log(current.details);

        for (let i in players) {
          console.log(i);
          if (players[i].playerName.name === current.details) {
            players[i].finish =true;
          }
        }
        //players[current.details].finish = true;
        client.send( JSON.stringify(players));
        break;
    }
  });
  // // When a player connects
  // client.on("newPlayer", state => {
  //   console.log("New player joined with state:", state);
  //   players[client.id] = state;
  //   // send the update-players method in the client side
  //   client.send("update-players", players);
  //   //client.send('slat', client.id);;
  // });
  // client.on("disconnect", state => {
  //   delete players[client.id];
  //   client.send("update-players", players);
  // });

  // client.on("finished", data => {
  //   //console.log(players);
  //   const { finished } = data;
  //   if (players[client.id] === undefined) {
  //     return;
  //   }
  //   players[client.id].finish = true;
  //   //console.log(players);

  //   client.send("update-players", players);
  // });

  // client.on("move-player", data => {
  //   //console.log(data);
  //   const { x, y, angle, playerName, speed, finished } = data;

  //   // If the player is invalid, return
  //   if (players[client.id] === undefined) {
  //     return;
  //   }
  //   //console.log('slat');
  //   // Update the player's data if he moved
    // players[client.id].x = x;
    // players[client.id].y = y;
    // players[client.id].angle = angle;
    // players[client.id].playerName = {
    //   name: playerName.name,
    //   x: playerName.x,
    //   y: playerName.y
    // };
    // players[client.id].speed = {
    //   value: speed.value,
    //   x: speed.x,
    //   y: speed.y
    // };
    // players[client.id].finish = finished;


  //   // Send the data back to the client
  //   client.send("update-players", players);
  // });

  // client.on("subscribeToTimer", interval => {
  //   console.log("client is subscribing to timer with interval ", interval);
  //   setInterval(() => {
  //     client.send("timer", new Date());
  //   }, interval);
  // });
  //io.send("chat", "hello world");
  // client.on('message', function(socket) {
  //   socket.on('chat message', function(msg){
  //       io.send('chat message', msg);
  //     });
  // });

  //     client.on('clicked', function(data) {
  //       clickCount++;
  //       //send a message to ALL connected clients
  //       io.send('buttonUpdate', clickCount);
  // });
});


//const port = 'https://forumla0.herokuapp.com/game';
// server.listen(port, function(err) {
//   if (err) throw err;
//   console.log("listening on port 8000");
// });
//server.listen(port, "127.0.0.1");
// socket.on('disconnect', state => {
//   delete players[socket.id]
//   io.send('update-players', players)
// })

// // When a player moves
