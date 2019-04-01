const router = require('express').Router()
    , cookie = require('cookie')
    , mysql = require('mysql');



router.get('/', function(req, res, next){
    req.session.destroy(function(err) {
        return res.json({msg: "success"});
    })
});
module.exports = router;
