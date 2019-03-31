
/**
* Module dependencies. Sourcing from Frontend b/c of React's restrictions
*/
const config = require('../frontend/src/config.js');
const express = require('express')
    , cors = require('cors')
    , routes = require(__dirname + '/routes/index.js')
    , http = require('http')
    , path = require('path')
    , session = require('express-session')
    , app = express()
    , mysql = require('mysql')
    , bodyParser = require("body-parser")
    , connection = mysql.createConnection({
        host     : 'localhost',
        port     : config.MYSQL_PORT,
        user     : config.MYSQL_USER,
        password : config.MYSQL_PASS,
        database : config.DATABASE
    });
connection.connect();
global.db = connection;



// all environments
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../frontend/public/')));
app.use(session({
              secret: 'silence of the goats',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
          }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



// development only
app.use(function (req, res, next){
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});



// handling option requests
app.options('*', cors());



// Get hte user if they exist
app.use(function(req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
    next();
});



var isAuthenticated = function(req, res, next) {
    if (!req.user) return res.status(401).end("access denied");
    next();
};



app.use(routes);



app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});



http.createServer(app).listen(config.BACKEND_PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", config.BACKEND_PORT);
});
