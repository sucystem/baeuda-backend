
var express = require('express');
var router = express.Router();
const db = require('../modules/db');
const helper = require('../modules/helper');
const sql = require('../sql')


router.get('/', function(req, res, next) {
  res.send('respond of study request');
});


// 스터디 메인 페이지.
router.get('/', function(req,res,next){
  res.send('탭에 필요한 정보 및 하위 기능: ');
});
router.get('/main', function(req, res, next){
  // 스터디 목록, 스터디 일정, 스터디 모집 세 페이지를 간략적으로 보여주는 메인 페이지.
  // 페이지에서  보여줄 정보: 스터디 목록의 제목들. 스터디 일정의 제목들과 올린 시간. 스터디 모집의 제목들과 사람 수.       id를 필요로 함.
  res.send('respond of fronts: main page of each page. 3 Area.   1. 스터디 목록의 제목. 2. 스터디 일정들의 제목. 3. 스터디 모집의 제목.');
  // 필요 정보 1. 스터디 목록의 제목.   DB :  study
  // 필요 정보 2. 스터디 일정의 제목.   DB :  
  // 필요 정보 3. 스터디 모집의 제목.   DB :  board/post

  var sql_studyList;
  var sql_studyCalList;
  var sql_studyRecList;
  
  const { id } = req.user._user[0];
  try{
    const [rows1] = await db.query(sql.study.selectIdNameStudyById, [id]);
    const [rows2] = await db.query(sql.schedule.selectScheduleByDate, [id, curdate()]);
    const [rows3] = await db.query(sql.study.selectIdNameStudyById, [id]);
    if (rows1.length == 0) {
      res.status(200).send({
        result: 'true',
        data: [],
        msg: '목록이 비었습니다.'
      })
    } else {
      res.status(200).send({
        result: 'true',
        data: rows1,
        msg: '수강중인 강좌 조회에 성공했습니다.'
      })
    }
    if (rows2.length == 0) {
      res.status(200).send({
        result: 'true',
        data: [],
        msg: '오늘은 스터디가 없어요!'
      })
    } else {
      res.status(200).send({
        result: 'true',
        data: rows2,
        msg: '오늘의 스터디 목록입니다..'
      })
    }
    if (rows3.length == 0) {
      res.status(200).send({
        result: 'true',
        data: [],
        msg: '모집중인 스터디가 없습니다.'
      })
    } else {
      res.status(200).send({
        result: 'true',
        data: rows3,
        msg: '현재 모집중인 스터디 목록입니다.'
      })
    }
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
  

});
// 스터디 페이지 1: 스터디 목록
router.get('/showList', function(req,res,next){
  // 탭으로 들어온 스터디 목록 페이지.
  // 페이지에서 보여줄 정보: 스터디 제목. 스터디 인수. 
  res.send('respond of fronts: joined project Lists ');
  var sql;
  const { id } = req.user._user[0];

  try{
    const [rows] = await db.query(sql.study.selectAllStudyById, [id]);

    if (rows.length == 0){
        res.status(200).send({
          result: 'true',
          data: [],
          msg: '현재 스터디가 없습니다.'
        })
    }else {
      res.status(200).send({
        result: 'true',
        data: rows,
        msg: '수강중인 스터디 조회 성골.'
      })
    }
  }catch(e){
    helper.failedConnectionServer(res,e);
  }

});
//router.get('/studyRoom', function(req,res,next){
// res.send('respond of fronts: show study Room.');
//})


// 스터디 페이지 2: 스터디 일정
router.get('/Calender', function(req,res,next){
  // 탭으로 들어온 스터디 일정 페이지.
  // 페이지에서 보여줄 정보: 표(프론트), 색으로 표시된 일정들? 
  res.send('respond of fronts: Monthly calender showing study Goals\n');
  res.send('1 Large sentence for Name. 2 side tab for Files, Bucket list\n');
    
  const { id } = req.user._user[0];

  try{
    var dateMax = 31;

    for(var i=0;i<dateMax;i++)               // for문은 일정 DB를 하루단위로 증가시키면서 데이터를 select함.
//    const [rows] = await db.query(, [id]);
      if (rows.length == 0){
         res.status(200).send({
           result: 'true',
           data: [],
           msg: ' ' // 현재 날짜에는 일정이 없음.
         })
     }else {
       res.status(200).send({
         result: 'true',
         data: rows,  // 해당 날짜에 해당하는 일정 input
         msg: '수강중인 스터디 조회 성골.'  
       })
     }
  }catch(e){
    helper.failedConnectionServer(res,e);
  }

});


// 스터디 페이지 3: 스터디 모집
router.get('/Recruit/', function(req,res,next){
  // 탭으로 들어오면 바로 1페이지로 이동.
  res.redirect('/study/Recruit/1');
});

router.get('/Recruit/:page', function(req,res,next){
  // 페이지에서 보여줄 정보: (페이지 형식) 스터디 제목. 참여인원수, 참여인원 최대 
  res.send('respond of fronts: Board showing avaliable recruits, Finding for teamates');
  var page = req.params.page;
  // var sql;
  //  sql = "select idx, name, title, date_format(moDate,'%Y-%m-%d %H:%i:%s') moDate, " +
  //  "date_format(regDate,'%Y-%m-%d %H:%i:%s') regDate,hit from board";

  try{
    const [rows] = await db.query("select recruitTitle, currentSeat, maxSeat ",[]);
    if(rows.length == 0){
      res.status(200).send({
        result : 'true',
        data : [],
        msg: ''  
      })
    }else{      // 잠깐 보류 : 201130/06:40
      res.status(200).send({
        result: 'true',
        data: rows,
        msg: '모든 스터디 목록 조회'
      })
      res.render('Recruit', {title: "스터디 모집 페이지"})
    }

  }catch(e){
    helper.failedConnectionServer
  }

  connect.query(sql, function(err,rows){
    if(err) console.error(err);
    res.render('Recruit', {title: "스터디 모집 페이지", rows:rows, page:page, length: rows.length-1, page_num:10, pass:true});
    console.log(rows.length-1);
  });
});

router.get('/write', function(req, res, next){
  res.render('write', {title: "게시판 글 쓰기"});
});

router.post('/write', function(req, res, next){

  var boardId_sRecruit;
  var {name, title, content, writer, postpw, filename} = req.body;
  try{
    await db.query(sql.sql_post.inserPost,[boardId_sRecruit, name, title, content, writer,postpw,now(),now()]);
    res.status(200).send({
      msg: '글이 작성되었습니다.'
    });
  }catch(e){
    helper.failedConnectionServer
  }

});

router.post('/delete', function(req,res,next){
  var [idx, postpw] = req.body;

  try{
    await db.query(sql.sql_post.deletePostByIdxPw,[idx,postpw]);
    res.status(200).send({
      msg: '글이 작성되었습니다.'
    });
  }catch(e){
    helper.failedConnectionServer
  }
});



router.get('/post/:post_id', async function(req, res){
  const { post_id } = req.params;
  try{
    const [post] = await db.query(sql.board.selectPostByPostId, [post_id]);
    const [comment] = await db.query(sql.board.selectCommentsByPostId, [post_id]);
    res.send({
      result: 'true',
      data: { post, comment },
      msg: "게시글 읽기 성공"
    })
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
});

module.exports = router;