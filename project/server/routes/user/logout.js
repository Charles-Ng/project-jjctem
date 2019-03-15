const router = require('express').Router()
    , mysql = require('mysql');



router.get('/', function(req, res, next){
    req.session.destroy(function(err) {
        res.redirect("index");
    })
});
