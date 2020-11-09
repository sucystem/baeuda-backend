var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond of project request');
  // project와 study 내가 해보기.

});
router.get('/write', function(req, res, next){
    res.render('write', {title: "게시판 글 쓰기"});
});
module.exports = router;