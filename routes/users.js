var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond of users request');
});

router.post('/login', function(req, res){

});

router.post('/register', function(req, res){

});

module.exports = router;