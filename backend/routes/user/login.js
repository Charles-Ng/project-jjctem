const router = require('express').Router()
    , mysql = require('mysql');



function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}



router.post('/', function(req, res, next){
    // extract data from HTTP request
    if (!('username' in req.body) || !('password' in req.body)) {
        return res.send('Wrong Credentials');
    }
    let post  = req.body;
    let username = req.body.username;
    let password = req.body.password;

    let sql="SELECT * FROM `users` WHERE `username`=? LIMIT 1";
    db.query(sql, [username], function(err, users){
        if (err) res.send(err);
        // User doesnt exist
        if (!users.length) {
            return res.send('Wrong Credentials');
        } else {
            let user = users[0];
            if (user.hash !== generateHash(password, user.salt)){
                return res.send('Wrong Credentials');
            }
            req.session.userId = user.id;
            req.session.user = user;
            return res.json(user);
        }
    });
});
module.exports = router;
