const router = require('express').Router()
    , mysql = require('mysql');



router.get('/', function(req, res, next){
    req.session.destroy(function(err) {
        return res.send("Success");
    })
});
