
/**
* Module dependencies.
*/
const express = require('express')
    , routes = require(__dirname + '/routes/index.js')
    , http = require('http')
    , path = require('path')
    , session = require('express-session')
    , app = express()
    , mysql = require('mysql')
    , bodyParser = require("body-parser")
    , connection = mysql.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'jjc'
    });
connection.connect();
global.db = connection;



// all environments
app.set('port', 8080);
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



const PORT = 8081;
http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
