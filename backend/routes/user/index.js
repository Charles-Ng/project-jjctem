const express = require('express')
    , router = express.Router()
    , signup = require(__dirname + '/signup.js')
    , login = require(__dirname + '/login.js')
    , logout = require(__dirname + '/logout.js');


// localhost/user/signup
router.use('/signup', signup);

// localhost/user/login
router.use('/login', login);

// localhost/user/logout
router.use('/logout', logout);

module.exports = router;
