const router = require('express').Router();


// localhost/user/signup
router.use('/signup', require('./signup'));

// localhost/user/login
router.use('/login', require('./login'));

// localhost/user/logout
router.use('/logout', require('./logout'));

module.exports = router;
