
const express = require('express')
    , router = express.Router()
    , user = require(__dirname + '/user/index.js');

router.use('/user', user);

module.exports = router;
