var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.send('respond of project request');
  // project와 study 내가 해보기.

});
// progect에서 하는건?  팀 프로젝트 목록 표시, 모집, 일정 표시. \
router.get('/showList', function(req,res,next){
    res.send('respond of fronts: joined project Lists ')
});

router.get('/showCalender', function(req,res,next){
    res.send('respond of fronts: Monthly calender showing project Goals')
});
router.get('/showRecruit', function(req,res,next){
    res.send('respond of fronts: Board showing avaliable recruits, Finding for teamates')
});


router.get('/write', function(req, res, next){
    res.render('write', {title: "게시판 글 쓰기"});
});

router.post('/write', function(req,res,next){
    // 아직 구체화 하지 않은 변수 목록. 
    // 팀프로젝트 모집에 쓸 글들.
    
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title, content, passwd];

//    var sql = "insert into board(name, title, content, regdate, modidate, passwd, hit) values(?,?,?,now(), now(), ?, 0)"
})
module.exports = router;