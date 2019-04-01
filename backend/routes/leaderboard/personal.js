const express = require('express')
    , router = express.Router();


router.get('/', function(req, res, next){
    if (!('username' in req.query)) {
        return res.json({msg: 'Error: improper parameters'});
    }
    let sql='SELECT * FROM (SELECT(@row_number:=@row_number + 1) AS num, username, time FROM leaderboard,(SELECT @row_number:=0) AS t ORDER BY time ASC ) AS r WHERE username="'+req.query.username+'"';
    db.query(sql, function(err, r){
        if (err) return res.json({msg: err});
        if (r.length <= 0) return res.json({msg: "No race was recorded for this user"});
        return res.json({
            rank: r[0].num,
            username: r[0].username,
            time: r[0].time
        });
    });
});

module.exports = router;
