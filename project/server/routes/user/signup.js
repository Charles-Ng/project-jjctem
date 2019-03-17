const router = require('express').Router()
    , mysql = require('mysql');



router.get('/', function(req, res, next){
    return res.send('Success');
});

router.post('/', function(req, res, next){
    // extract data from HTTP request
    if (!('username' in req.body) || !('password' in req.body)) {
        return res.send('Wrong Credentials');
    }
    let post = req.body;
    let email = post.email;
    let username = post.username;
    let pass = post.password;

    // Check existing username
    let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
    let query = db.query(sql, [username], function(err, user){
        if (err) return res.send(err);
        if (user.length) {
            return res.send("username " + username + " already exists");
        }
    });

    // Check existing email
    let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
    let query = db.query(sql, [username], function(err, result){
        if (err) return res.send(err);
        if (result.length > 0) {
            return res.send("email " + email + " already exists");
        }
    });

    // generate a new salt and hash
    let salt = generateSalt();
    let hash = generateHash(password, salt);

    // Creating user
    let sql = "INSERT INTO users (email, username, hash, salt) VALUES (?, ?, ?, ?)";
    let query = db.query(sql, [email, username, hash, salt], function(err, result){
        if (err) return res.send(err);
        let message = "Succesful! Your account has been created.";
        let sql = "SELECT * FROM users WHERE id=?";
        let user = null;
        let sel_query = db.query(sql, result.insertId, function(err, result){
            if (err) return res.send(err);
            user = result;
        });
        return res.json({
            user: user,
            message: message
        });
    });
});
