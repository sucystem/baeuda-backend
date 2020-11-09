var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond of study request');
});



router.get('/', function(req,res,next){
  res.send('탭에 필요한 정보 및 하위 기능: ')
});

// 스터디 페이지 1: 스터디 목록
router.get('/showList', function(req,res,next){
  res.send('respond of fronts: joined project Lists ');
});
router.get('/projectRoom', function(req,res,next){
  res.send('respond of fronts: show study Room.');
})


// 스터디 페이지 2: 스터디 일정
router.get('/Calender', function(req,res,next){
  res.send('respond of fronts: Monthly calender showing study Goals\n');
  res.send('1 Large sentence for Name. 2 side tab for Files, Bucket list\n');
    
});

// 스터디 페이지 3: 스터디 모집
router.get('/Recruit/', function(req,res,next){
  res.redirect('/study/Recruit/1');
});
router.get('/Recruit/:page', function(req,res,next){
  res.send('respond of fronts: Board showing avaliable recruits, Finding for teamates');
});
router.get('/write', function(req, res, next){
  res.render('write', {title: "게시판 글 쓰기"});
});

module.exports = router;