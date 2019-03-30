import openSocket from 'socket.io-client';
import Phaser from "phaser";
const socket = openSocket.connect("https://formula0.julesyan.com:8081", { secure: true, reconnect: true, rejectUnauthorized: false });
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function newPlayer(cb) {
    socket.on('slat', slat => cb(slat));
    socket.emit('newPlayer', {id: 'hello'});
}

// function connect(cb) {
//     // listen for any messages coming through
//     // of type 'chat' and then trigger the
//     // callback function with said message
//     socket.on("chat", message => {
//       // console.log the message for posterity
//       console.log(message);
//       // trigger the callback passed in when
//       // our App component calls connect
//       cb(message);
//     });
//   }

function buttonClicked(cb) {
    socket.emit('clicked');
    socket.on('buttonUpdate', function(data){
        //document.getElementById("buttonCount").innerHTML = 'The button has been clicked ' + data + ' times.';
        cb(data);
    });
}
export { subscribeToTimer,  buttonClicked, newPlayer};
