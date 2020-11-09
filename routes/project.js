var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.send('respond of project request');
  // project와 study 내가 해보기.

});
router.get('/write', function(req, res, next){
    res.render('write', {title: "게시판 글 쓰기"});
});

router.post('/write', function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title, content, passwd];

//    var sql = "insert into board(name, title, content, regdate, modidate, passwd, hit) values(?,?,?,now(), now(), ?, 0)"
})
module.exports = router;