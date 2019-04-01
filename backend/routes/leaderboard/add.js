const express = require('express')
    , router = express.Router();

router.post('/', function(req, res, next){
    if (!('username' in req.body) || !('time' in req.body)) {
        return res.json({msg: 'Error: improper parameters'});
    }
    let sql="INSERT INTO leaderboard (username, time) VALUES (?, ?)";
    db.query(sql, [req.body.username, parseFloat(req.body.time)], function(err, r){
        if (err) return res.json({msg: err});
        return res.json({ msg: 'success' });
    });
});

module.exports = router;
