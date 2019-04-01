const express = require('express')
    , router = express.Router();


router.get('/', function(req, res, next){
    let sql="SELECT * FROM `leaderboard`";
    db.query(sql, function(err, r){
        if (err) return res.json({msg: err});
        // User doesnt exist
        return res.json({
            res: r
        });
    });
});

module.exports = router;
