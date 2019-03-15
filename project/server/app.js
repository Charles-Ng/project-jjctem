
/**
* Module dependencies.
*/
const express = require('express')
    , reactEngine = require('react-engine')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , session = require('express-session')
    , app = express()
    , mysql = require('mysql')
    , bodyParser = require("body-parser")
    , engine = reactEngine.server.create({});
    , connection = mysql.createConnection({
        host     : 'localhost',
        port     : '8889',
        user     : 'root',
        password : 'root',
        database : 'jjc'
    });
connection.connect();
global.db = connection;



// all environments
app.set('port', process.env.PORT || 8080);
app.engine('.js', engine);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'js');
app.set('view', require('react-engine/lib/expressView'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'silence of the goats',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
          }));



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



function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}



function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}


// app.get('/', routes.index);//call for main index page
// app.get('/signup', user.get_signup);//call for signup page
// app.post('/signup', user.post_signup);//call for signup post
// app.get('/login', routes.index);//call for login page
// app.post('/login', user.post_login);//call for login post
app.use(routes);



app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});



const PORT = 3001;
http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
