var express = require('express');
const { connect } = require('../app');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond of study request');
});


// 스터디 메인 페이지.
router.get('/', function(req,res,next){
  res.send('탭에 필요한 정보 및 하위 기능: ');
});

// 스터디 페이지 1: 스터디 목록
router.get('/showList', function(req,res,next){
  res.send('respond of fronts: joined project Lists ');
  var sql;

  connect.query(sql, function(err,row){
    if(err) console.error(err);
    res.render('showList', {title: "스터디 목록", rows: rows});
  });

});
router.get('/projectRoom', function(req,res,next){
  res.send('respond of fronts: show study Room.');
})


// 스터디 페이지 2: 스터디 일정
router.get('/Calender', function(req,res,next){
  res.send('respond of fronts: Monthly calender showing study Goals\n');
  res.send('1 Large sentence for Name. 2 side tab for Files, Bucket list\n');
    
  var sql;
  connect.query(sql, function(err, row){
    if(err) console.err(err);
    res.render('Calender', {title: "스터디 일정", rows: rows});
  });
});


// 스터디 페이지 3: 스터디 모집
router.get('/Recruit/', function(req,res,next){
  res.redirect('/study/Recruit/1');
});
router.get('/Recruit/:page', function(req,res,next){
  res.send('respond of fronts: Board showing avaliable recruits, Finding for teamates');
  var page = req.params.page;
  var sql;

  connect.query(sql, function(err,rows){
    if(err) console.error(err);
    res.render('Recruit', {title: "스터디 모집 페이지", row:rows, page:page, length: rows.length-1, page_num:10, pass:true});
  });
});

router.get('/write', function(req, res, next){
  res.render('write', {title: "게시판 글 쓰기"});
});
router.post('/write', function(req, res, next){
  var name = req.body.name;
  var title = req.body.title;
  var content = req.body.content;
  var passwd = req.body.passwd;
  var datas = [name, title, contetn, idx, passwd];  // 위 모든 데이터 받아오는 배열.

  var sql;
//  var sql = "insert into ____(name, title, content, )"
  connect.query(sql,datas,function(err,result){
      if(err) console.error("err: "+ err);
      res.redirect('/study/Recruit');
  })
})
module.exports = router;