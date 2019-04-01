
/**
* Module dependencies. Sourcing from Frontend b/c of React's restrictions
*/
const config = require('../frontend/src/config.js')
    , cookie = require('cookie')
    , express = require('express')
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
var whitelist = ['https://formula0.julesyan.com', 'https://julesyan.com', 'http://localhost'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
};
app.options('*', cors(corsOptionsDelegate));
// app.options('*', function(req, res, next){
//     return cors();
// });



// Get hte user if they exist
app.use(function(req, res, next){
    if ('user' in req.session){
        req.user = req.session.user;
        // res.setHeader('Set-Cookie', cookie.serialize('username', req.user.username, {
        //       path : '/',
        //       maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
        // }));
    } else {req.user = null;}
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
