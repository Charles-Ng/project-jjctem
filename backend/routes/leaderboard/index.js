const express = require('express')
    , router = express.Router()
    , add = require(__dirname + '/add.js')
    , all = require(__dirname + '/all.js');


router.use('/add', add);

router.get('/all', all);

// Default gets the top 10 players
router.get('/', function(req, res, next){
    let sql="SELECT * FROM `leaderboard` LIMIT 10";
    db.query(sql, function(err, r){
        if (err) return res.json({msg: err});
        // User doesnt exist
        return res.json({
            res: r
        });
    });
});

module.exports = router;
