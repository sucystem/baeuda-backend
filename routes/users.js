var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond of users request');
});

router.post('/signup', function(req, res){
  res.send({
    code: 200,
    msg: "회원가입에 성공하였습니다."
  });
});

module.exports = router;