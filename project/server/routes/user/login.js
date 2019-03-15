const router = require('express').Router()
    , mysql = require('mysql');



router.get('/', function(req, res, next){
    res.render('index.js', {message: message});
});



router.post('/', function(req, res, next){
    // extract data from HTTP request
    if (!('username' in req.body) || !('password' in req.body)) {
        message = 'Wrong Credentials.';
        res.render('index.js', {message: message});
    }
    let post  = req.body;
    let username = req.body.username;
    let password = req.body.password;

    let sql="SELECT * FROM `users` WHERE `username`=? LIMIT 1";
    db.query(sql, [username], function(err, users){
        if (err) res.render('index.js', {message: err});
        // User doesnt exist
        if (!users.length) {
            message = 'Wrong Credentials.';
            res.render('index.js', {message: message});
        } else {
            let user = users[0];
            if (user.hash !== generateHash(password, user.salt)){
                message = 'Wrong Credentials.';
                res.render('index.js', {message: message});
            }
            req.session.userId = user.id;
            req.session.user = user;
            console.log(user.id);
            res.redirect('index.js');
        }
    });
});
