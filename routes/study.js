
var express = require('express');
var router = express.Router();
const db = require('../modules/db');
const helper = require('../modules/helper');
const sql = require('../sql');
var tokenUser = require('../modules/user');

router.use(tokenUser.tokenToUser);

router.get('/', function(req, res, next) {
  res.send('respond of study request');
});


// 스터디 메인 페이지.
router.get('/', function(req,res,next){
  res.send('탭에 필요한 정보 및 하위 기능: ');
});

router.get('/info/:studyId', async function(req, res){
  const { id } = req.user._user;
  const { studyId } = req.params;

  try{
    const [rows] = await db.query(sql.study.selectStudyById, [studyId]);
    if(rows.length == 0){
      res.status(200).send({
        result: "false",
        data: [],
        msg: "존재하지 않는 스터디입니다."
      });
    } else {
      res.status(200).send({
        result: "true",
        data: rows,
        msg: "스터디 정보를 조회했습니다."
      })
    }
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/reference/:studyId', async function(req, res){
  const { id } = req.user._user;
  const { studyId } = req.params;

  try{
    const [rows] = await db.query(sql.study.selectStudyById, [studyId]);
    if(rows.length == 0){
      res.status(200).send({
        result: "false",
        data: [],
        msg: "존재하지 않는 스터디입니다."
      });
    } else {
      res.status(200).send({
        result: "true",
        data: rows,
        msg: "스터디 자료를 조회했습니다."
      })
    }
  }catch(e){
    helper.failedConnectionServer(res, e);
  }
})

router.get('/schedule/:studyId', async function(req, res){
  const { id } = req.user._user;
  const { studyId } = req.params;

  try{
    const [rows] = await db.query(sql.study.selectStudyById, [studyId]);
    if(rows.length == 0){
      res.status(200).send({
        result: "false",
        data: [],
        msg: "존재하지 않는 스터디입니다."
      });
    } else {
      res.status(200).send({
        result: "true",
        data: rows,
        msg: "스터디 일정을 조회했습니다."
      })
    }
  }catch(e){
    helper.failedConnectionServer(res, e);
  }
})

router.get('/main',async  function(req, res, next){
  // 스터디 목록, 스터디 일정, 스터디 모집 세 페이지를 간략적으로 보여주는 메인 페이지.
  // 페이지에서  보여줄 정보: 스터디 목록의 제목들. 스터디 일정의 제목들과 올린 시간. 스터디 모집의 제목들과 사람 수.       id를 필요로 함.
  // 필요 정보 1. 스터디 목록의 제목.   DB :  study
  // 필요 정보 2. 스터디 일정의 제목.   DB :  
  // 필요 정보 3. 스터디 모집의 제목.   DB :  board/post

  const { id } = req.user._user;
  try{
    const [rows1] = await db.query(sql.study.selectStudyByUserId, [id]);
    const [rows2] = await db.query(sql.schedule.selectWeekSchedules, [id]);
    const [rows3] = await db.query(sql.study.selectStudyWithRecuit);
    if (rows1.length == 0) {
        msg1 = '목록이 비었습니다.';
    } else {
        msg1 = '수강중인 강좌 조회에 성공했습니다.';
    }
    if (rows2.length == 0) {
        msg2 = '오늘은 스터디가 없어요!';
    } else {
        msg2 = '오늘의 스터디 목록입니다..';
    }
    if (rows3.length == 0) {
        msg3 = '모집중인 스터디가 없습니다.';
    } else {
        msg3 = '현재 모집중인 스터디 목록입니다.';
    }
    res.status(200).send({
      result : 'true',
      data : {row1 : rows1, row2 : rows2, row3 : rows3},
      msg : {row1 : msg1, row2 : msg2, row3 : msg3}
    })
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
  

});
// 스터디 페이지 1: 스터디 목록
router.get('/showList',async  function(req,res,next){
  // 탭으로 들어온 스터디 목록 페이지.
  // 페이지에서 보여줄 정보: 스터디 제목. 스터디 인수. 
  const { id } = req.user._user;

  try{
    const [rows] = await db.query(sql.study.selectStudyByUserId, [id]);

    if (rows.length == 0){
        res.status(200).send({
          result: 'false',
          data: [],
          msg: '현재 스터디가 없습니다.'
        })
    }else {
      res.status(200).send({
        result: 'true',
        data: rows,
        msg: '수강중인 스터디 조회 성공.'
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
router.get('/Calender',async  function(req,res,next){
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
router.get('/recruit',async function(req,res,next){
  const { id } = req.user._user;

  try{
    const [rows] = await db.query(sql.study.selectStudyWithRecuit);
    res.status(200).send({
      result: "true", 
      data: rows,
      msg: '모집중인 스터디 목록 조회 성공'
    })
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/Recruit/:page',async  function(req,res,next){
  // 페이지에서 보여줄 정보: (페이지 형식) 스터디 제목. 참여인원수, 참여인원 최대 
  res.send('respond of fronts: Board showing avaliable recruits, Finding for teamates');
  var page = req.params.page;
  // var sql;
  //  sql = "select idx, name, title, date_format(moDate,'%Y-%m-%d %H:%i:%s') moDate, " +
  //  "date_format(regDate,'%Y-%m-%d %H:%i:%s') regDate,hit from board";
  // connect.query(sql, function(err,rows){
  //  if(err) console.error(err);
  // res.render('Recruit', {title: "스터디 모집 페이지", rows:rows, page:page, length: rows.length-1, page_num:10, pass:true});
  //  console.log(rows.length-1);
 // });

  try{
    const [rows] = await db.query("select recruitTitle, currentSeat, maxSeat ",[]);
    if(rows.length == 0){
      res.status(200).send({
        result : 'true',
//        data : [],
        rows:rows,
        page:page,
        length:rows.length-1,
        page_num: 10,
        msg: "등록된 모집 게시물 없음."  
      })
    }else{      // 잠깐 보류 : 201130/06:40
      res.status(200).send({
        result: 'true',
//        data: rows,
        rows:rows,
        page:page,
        length:rows.length-1,
        page_num: 10,
        msg: '모든 스터디 목록 조회'
      })
      res.render('Recruit', {title: "스터디 모집 페이지"})
    }

  }catch(e){
    helper.failedConnectionServer
  }


});

router.get('/write',async  function(req, res, next){
  res.render('write', {title: "게시판 글 쓰기"});
});

router.post('/write', async function(req, res, next){

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

router.post('/delete',async  function(req,res,next){
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

router.post('/apply/:studyId', async function(req, res){
  const { id } = req.user._user;
  const { studyId } = req.params;

  try {
    let [rows] = await db.query(sql.study.selectStudyById, [studyId]);
    if (rows.length == 0) {
      res.status(200).send({
        msg: '존재하지 않는 강좌입니다.'
      });
    }
    else {
      [rows] = await db.query(sql.study.selectStudyByStudyIdAndUserId, [studyId, id]);
      if (rows.length != 0) {
        res.status(200).send({
          msg: '이미 신청한 강좌입니다.'
        })
      } else {
        await db.query(sql.study.insertUserStudy, [studyId, id]);
        res.status(200).send({
          msg: '신청되었습니다.'
        });
      }
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

module.exports = router;