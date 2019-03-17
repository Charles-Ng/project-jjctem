
// exports.index = function(req, res){
//     res.render('index',{message: ''});
// };

const express = require('express')
    , router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.use('/user', require('./user'));

module.exports = router;
