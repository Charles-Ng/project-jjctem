
const express = require('express')
    , router = express.Router()
    , user = require(__dirname + '/user/index.js')
    , leaderboard = require(__dirname + '/leaderboard/index.js');

router.use('/user', user);
router.use('/leaderboard', leaderboard);

module.exports = router;
