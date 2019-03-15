const router = require('express').Router()
    , mysql = require('mysql');



router.get('/', function(req, res, next){
    res.render('signup');
});

router.post('/', function(req, res, next){
    let message = '';

    // extract data from HTTP request
    if (!('username' in req.body) || !('password' in req.body)) {
        message = 'Wrong Credentials.';
        res.render('index.js', {message: message});
    }
    let post = req.body;
    let email = post.email;
    let username = post.username;
    let pass = post.password;

    let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
    let query = db.query(sql, [username], function(err, user){
        if (err) res.render('index.js', {message: err});
        if (user.length) {
            message = "username " + username + " already exists";
            res.render('signup.js', {message: message});
        }
        let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
        let query = db.query(sql, [username], function(err, res){
            message = "email " + email + " already exists";
            res.render('signup.js', {message: message});
        });
        // generate a new salt and hash
        let salt = generateSalt();
        let hash = generateHash(password, salt);
        let sql = "INSERT INTO users (email, username, hash, salt) VALUES (?, ?, ?, ?)";
        let query = db.query(sql, [email, username, hash, salt], function(err, res){
            message = "Succesful! Your account has been created.";
            res.render('signup.js', {message: message});
        });
    });
});
