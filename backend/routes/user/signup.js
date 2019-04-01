const express = require('express')
    , cookie = require('cookie')
    , router = express.Router()
    , cors = require('cors')
    , crypto = require('crypto')
    , mysql = require('mysql');



function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}



function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}




router.get('/', function(req, res, next){
    return res.json({msg: "Success"});
});

router.post('/', function(req, res, next){
    // extract data from HTTP request
    if (!('username' in req.body) || !('password' in req.body)) {
        return res.json({msg: 'Wrong Credentials'});
    }
    let post = req.body;
    // let email = post.email;
    let username = post.username;
    let pass = post.password;
    let done = false;

    // Check existing username
    let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
    let query = db.query(sql, [username], function(err, user){
        if (err) return res.json({msg: err});
        if (user.length) {
            done = true;
            return res.json({msg: "Username " + username + " already exists"});
        }
    });

    // generate a new salt and hash
    let salt = generateSalt();
    let hash = generateHash(pass, salt);

    // Creating user
    // sql = "INSERT INTO users (email, username, hash, salt) VALUES (?, ?, ?, ?)";
    if (!done){
        sql = "INSERT INTO users (username, hash, salt) VALUES (?, ?, ?)";
        query = db.query(sql, [username, hash, salt], function(err, r){
            if (err) return res.json({msg: err});
            let message = "success";
            sql = "SELECT * FROM users WHERE id = ?";
            db.query(sql, [r.insertId], function(err, r){
                if (err) return res.json({msg: err});
                return res.json({
                    user: JSON.parse(JSON.stringify(r[0])),
                    insertId: r.insertId,
                    msg: message
                });
            });
        });
    }
});
module.exports = router;
