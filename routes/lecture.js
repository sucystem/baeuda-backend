var express = require('express');
var router = express.Router();
var sql = require('../sql')
var db = require('../modules/db')
var helper = require('../modules/helper')

router.get('/', async function(req, res, next) {
  const { id } = req.user._user[0];
  try{
    const [rows] = await db.query(sql.lecture.selectLecturesByUserId, [id])
    if (rows.length == 0) {
      res.status(200).send({
        result: 'true',
        data: [],
        msg: '수강중인 강좌가 없습니다.'
      })
    } else {
      res.status(200).send({
        result: 'true',
        data: rows,
        msg: '수강중인 강좌 조회에 성공했습니다.'
      })
    }
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/all', async function(req, res){
  try{
    const [rows] = await db.query(sql.lecture.selectLecturesByUserId, [id])
    if (rows.length == 0) {
      res.status(200).send({
        result: 'true',
        data: [],
        msg: '강좌가 없습니다.'
      })
    } else {
      res.status(200).send({
        result: 'true',
        data: rows,
        msg: '모든 강좌 조회에 성공했습니다.'
      })
    }
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
});

router.post('/register', async function(req, res){
  const { id } = req.user._user[0];
  const { lecture_id } = req.lecture_id;

  try{
    let [rows] = await db.query(sql.lecture.selectLectureById, [lecture_id]);
    if(rows.length == 0){
      res.status(400).send('존재하지 않는 강좌입니다.');
    }
    else {
      [rows] = await db.query(sql.lecture.selectLecturesByUserId, [id]);
      if (rows.length != 0){
        res.status(200).send({
          msg: '이미 신청한 강좌입니다.'
        })
      } else {
        await db.query(sql.lecture.insertUserLecture, [id, lecture_id]);
        res.status(200).send({
          msg: '신청되었습니다.'
        });
      }
    }
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
});

router.post('/assign', async function(req, res){
  const { id } = req.user._user[0];
  const { lecture_id } = req.lecture_id;

  try{
    let [rows] = await db.query(sql.lecture.selectLectureByProf, [lecture_id, id]);
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
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