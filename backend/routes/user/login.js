const router = require('express').Router()
    , cookie = require('cookie')
    , crypto = require('crypto')
    , mysql = require('mysql');



function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}



router.post('/', function(req, res, next){
    // extract data from HTTP request
    if (!('username' in req.body) || !('password' in req.body)) {
        return res.json({msg: 'Wrong Credentials'});
    }
    let post  = req.body;
    let username = req.body.username;
    let password = req.body.password;

    let sql="SELECT * FROM `users` WHERE `username`=? LIMIT 1";
    db.query(sql, [username], function(err, users){
        if (err) return res.json({msg: err});
        // User doesnt exist
        if (users.length == 0) {
            return res.json({msg: "Wrong Credentials"});
        } else {
            let user = users[0];
            if (user.hash !== generateHash(password, user.salt)){
                return res.json({msg: "Wrong Credentials"});
            }
            req.session.userId = user.id;
            req.session.user = user;
            return res.json({
                user: user,
                msg: 'success'
            });
        }
    });
});
module.exports = router;
