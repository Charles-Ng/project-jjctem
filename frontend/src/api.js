// import openSocket from 'socket.io-client';
// import Phaser from "phaser";
// // const socket = openSocket("https://formula0.julesyan.com", {path:'/socket', secure: true, reconnect: true, rejectUnauthorized: false});
// // const socket = openSocket.connect("https://formula0.julesyan.com", { path:'/socket',secure: true, reconnect: true, rejectUnauthorized: false });
// const  socket = openSocket("http://formula0.julesyan.com", {path:'/socket'});
// // const socket = openSocket.connect("https://formula0.julesyan.com:8081", {path: "/", rejectUnauthorized: false, secure: true});

// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }

// function newPlayer(cb) {
//     socket.on('slat', slat => cb(slat));
//     socket.emit('newPlayer', {id: 'hello'});
// }

// // function connect(cb) {
// //     // listen for any messages coming through
// //     // of type 'chat' and then trigger the
// //     // callback function with said message
// //     socket.on("chat", message => {
// //       // console.log the message for posterity
// //       console.log(message);
// //       // trigger the callback passed in when
// //       // our App component calls connect
// //       cb(message);
// //     });
// //   }

// function buttonClicked(cb) {
//     socket.emit('clicked');
//     socket.on('buttonUpdate', function(data){
//         //document.getElementById("buttonCount").innerHTML = 'The button has been clicked ' + data + ' times.';
//         cb(data);
//     });
// }

// function checkSocketIoConnect() {
//     return new Promise(function(resolve, reject) {
//         var errAlready = false;
//         var timeout = timeout || 50000;

//         // success
//         socket.on("connect", function() {
//             clearTimeout(timer);
//             resolve();
//             socket.close();
//         });

//         // set our own timeout in case the socket ends some other way than what we are listening for
//         var timer = setTimeout(function() {
//             timer = null;
//             error("local timeout");
//         }, timeout);

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

//         // errors
//         socket.on("connect_error", error);
//         socket.on("connect_timeout", error);
//         socket.on("error", error);
//         socket.on("disconnect", error);

//     });
// }

// export { subscribeToTimer,  buttonClicked, newPlayer, checkSocketIoConnect};
