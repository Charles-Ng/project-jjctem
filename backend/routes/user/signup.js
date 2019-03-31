const express = require('express')
    , router = express.Router()
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
    return res.send('Success');
});

router.post('/', function(req, res, next){
    // extract data from HTTP request
    if (!('username' in req.body) || !('password' in req.body)) {
        return res.send('Wrong Credentials');
    }
    let post = req.body;
    // let email = post.email;
    let username = post.username;
    let pass = post.password;
    let done = false;

    // Check existing username
    let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
    let query = db.query(sql, [username], function(err, user){
        if (err) return res.send(err);
        if (user.length) {
            done = true;
            return res.send("username " + username + " already exists");
        }
    });

    // Check existing email
    // sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
    // query = db.query(sql, [username], function(err, result){
    //     if (err) return res.send(err);
    //     if (result.length > 0) {
    //         return res.send("email " + email + " already exists");
    //     }
    // });

    // generate a new salt and hash
    let salt = generateSalt();
    let hash = generateHash(pass, salt);

    // Creating user
    // sql = "INSERT INTO users (email, username, hash, salt) VALUES (?, ?, ?, ?)";
    if (!done){
        sql = "INSERT INTO users (username, hash, salt) VALUES (?, ?, ?)";
        db.query(sql, [username, hash, salt], function(err, result){
            if (err) return res.send(err);
            let message = "Succesful! Your account has been created.";
            sql = "SELECT * FROM users WHERE id = ?";
            db.query(sql, [result.insertId], function(err, r){
                if (err) return res.send(err);
                return res.json({
                    user: JSON.parse(JSON.stringify(r[0])),
                    insertId: result.insertId,
                    sql: sql,
                    message: message
                });
            });
        });
    }
});
module.exports = router;
