var express = require('express');
const { connect } = require('../app');
var router = express.Router();
// var conn = mysql_odbc.init();    // mysql_odbc은 mysql의 접속 정보가 담긴 객체 



router.get('/', function(req, res, next) {
  res.send('respond of project request');
  // project와 study 내가 해보기.

});

// progect에서 하는건?  팀 프로젝트 목록 표시, 모집, 일정 표시. 

// 기능 페이지 1: 팀 프로젝트 목록
router.get('/showList', function(req,res,next){
    res.send('respond of fronts: joined project Lists ');
    var sql;

    connect.query(sql, function(err,rows){
        if(err) console.error("err: " + err);
        res.render('showList', {title: "팀 프로젝트 목록", rows:rows});
    });
});
router.get('/projectRoom', function(req,res,next){
    res.send('respond of fronts: show teamProject Room.');
    res.send('1 Large sentence for Name. 2 side tab for Files, Bucket list\n');
})


// 기능 페이지 2: 팀 프로젝트 일정
router.get('/Calender', function(req,res,next){
  res.send('respond of fronts: Monthly calender showing project Goals\n');
    
});


// 기능 페이지 3: 팀 프로젝트 모집
router.get('/Recruit/', function(req,res,next){
    res.redirect('/project/Recruit/1');
});
router.get('/Recruit/:page', function(req,res,next){
    res.send('respond of fronts: Board showing avaliable recruits, Finding for teamates');
});
router.get('/write', function(req, res, next){
    res.render('write', {title: "게시판 글 쓰기"});
});
router.post('/write', function(req,res,next){     // 팀프로젝트 모집에 쓸 글들.
    
    // 아직 구체화 하지 않은 변수 목록. 
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title, content, passwd];

//    var sql = "insert into board(name, title, content, regdate, modidate, passwd, hit) values(?,?,?,now(), now(), ?, 0)"
//    conn.query(sql, function(err,rows){
//     if(err) 
//          console.error("err: " + err);
//     res.redirect('/project/Recruit');
//});

})
module.exports = router;