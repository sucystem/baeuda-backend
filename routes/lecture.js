var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond of lecture request');
});

router.get('/takeLesson', function(req,res,next){
  res.send('수강하기 탭에 필요 정보 및 하위 기능: 미팅룸입장, 수강하기');
  
})
router.get('/Notice', function(req,res,next){
  res.send('공지사항 탭에 필요 정보 및 하위 기능: 공지사항 열람.');
})
router.get('/LearningMaterial', function(req,res,next){
  res.send('학습자료에 필요 정보 및 하위 기능: 자료 열람');
})
router.get('QnA', function(req,res,next){
  res.send('질문과 답변에 필요 정보 및 하위 기능: 질문하기');
})
module.exports = router;