var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var sql = require('../sql');
var helper = require('../modules/helper');
var tokenUser = require('../modules/user');

router.use(tokenUser.tokenToUser);

router.get('/', async function (req, res, next) {
  const { id } = req.user._user;
  try {
    const [rows] = await db.query(sql.lecture.selectLecturesByStudentUserId, [id, 1])
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
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/all', async function (req, res) {
  try {
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
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/info/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  try {
    const [rows] = await db.query(sql.lecture.selectLectureById, [lecture_id]);

    res.status(200).send({
      result: "true",
      data: rows[0],
      msg: "강의 정보를 불러왔습니다."
    })
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/lessons/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  try {
    const [rows] = await db.query(sql.lecture.selectLessonsByLectureId, [lecture_id]);

    res.status(200).send({
      result: "true",
      data: rows,
      msg: "강좌 목록을 불러왔습니다."
    })
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/room/notices/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  try {
    const [rows] = await db.query(sql.lecture.selectNoticesByLectureId, [lecture_id]);

    res.status(200).send({
      result: "true",
      data: rows,
      msg: "공지사항을 불러왔습니다"
    })
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/room/qnas/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  try {
    const [rows] = await db.query(sql.lecture.selectQnAsByLectureId, [lecture_id]);

    res.status(200).send({
      result: "true",
      data: rows,
      msg: "QnA를 불러왔습니다"
    })
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/room/datas/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  try {
    const [rows] = await db.query(sql.lecture.selectDatasByLectureId, [lecture_id]);

    res.status(200).send({
      result: "true",
      data: rows,
      msg: "학습자료를 불러왔습니다"
    })
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/getnumber/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  try {
    const [rows] = await db.query(sql.lecture.selectNumberOfStudentByLectureId, [lecture_id]);
    res.status(200).send({
      result: "true",
      data: rows,
      msg: "강의의 학생 수를 불러왔습니다."
    })
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/notregist', async function (req, res) {
  const { id } = req.user._user;
  try {
    var [rows] = await db.query(sql.lecture.selectNotRegistLectureByUserId, [id]);
    if (rows.length == 0) {
      res.status(200).send({
        result: "false",
        data: [],
        msg: "신청하지 않은 강의가 없습니다."
      })
    } else {
      res.status(200).send({
        result: "true",
        data: rows,
        msg: "신청 가능한 강의 목록을 불러왔습니다."
      });
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.post('/regist', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.body;

  try {
    let [rows] = await db.query(sql.lecture.selectLectureById, [lecture_id]);
    if (rows.length == 0) {
      res.status(200).send({
        msg: '존재하지 않는 강좌입니다.'
      });
    }
    else {
      [rows] = await db.query(sql.lecture.selectLectureByLectureIdAndUserId, [lecture_id, id]);
      if (rows.length != 0) {
        res.status(200).send({
          msg: '이미 신청한 강좌입니다.'
        })
      } else {
        await db.query(sql.lecture.insertUserLecture, [lecture_id, id]);
        res.status(200).send({
          msg: '신청되었습니다.'
        });
      }
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/regist', async function (req, res) {
  const { id } = req.user._user;

  try {
    const [rows] = await db.query(sql.lecture.selectLecturesByStudentUserId, [id, 0]);
    if (rows.length == 0) {
      res.status(200).send({
        result: "false",
        data: [],
        msg: "대기 중인 강의가 없습니다."
      })
    } else {
      res.status(200).send({
        result: "true",
        data: rows,
        msg: "대기 중인 강의 목록"
      });
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.post('/registcancel', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.body;

  try{
    let [rows] = await db.query(sql.lecture.selectLectureByLectureIdAndUserId, [lecture_id, id]);
    if(rows.length == 0) {
      res.status(200).send({
        result: "false",
        data: [],
        msg: "신청한 강의가 아닙니다."
      })
    } else if (rows[0].state != 0) {
      res.status(200).send({
        result: "false",
        data: [],
        msg: "이미 승인된 강의입니다."
      })
    } else {
      await db.query(sql.lecture.deleteRegistLectureByLectureIdAndUserId, [lecture_id, id, 0]);
      res.status(200).send({
        result: "true",
        data: [],
        msg: "취소되었습니다."
      })
    }
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/:lecture_id/accept', async function (req, res) {
  const { id } = req.user._user[0];
  const { lecture_id } = req.params;

  try {
    let [rows] = await db.query(sql.lecture.selectLectureByProf, [lecture_id, id]);
    if (rows.length == 0) {
      res.status(200).send({
        result: 'false',
        data: [],
        msg: "권한이 없습니다."
      })
    } else {
      [rows] = await db.query(sql.lecture.selectListRequestStudentsByLectureId, [lecture_id]);
      res.status(200).send({
        result: 'true',
        data: rows,
        msg: '해당 강좌 신청 학생 목록을 조회했습니다.'
      })
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/complete', async function(req, res) {
  const { id } = req.user._user;
  
  try{
    const [rows] = await db.query(sql.lecture.selectLecturesByStudentUserId, [id, 2]);
    if (rows.length == 0) {
      res.status(200).send({
        result: "false",
        data: [],
        msg: "이수한 강의가 없습니다."
      })
    } else {
      res.status(200).send({
        result: "true",
        data: rows,
        msg: "이수한 강의 목록"
      });
    }

  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.put('/:lecture_id/accept', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  const { studentId } = req.body;

  try {
    let [rows] = await db.query(sql.lecture.selectLectureByProf, [lecture_id, id]);
    if (rows.length == 0) {
      res.send({
        msg: "권한이 없습니다."
      });
    } else {
      [rows] = await db.query(sql.selectRequestStudentByUserId, [lecture_id, studentId]);
      if (rows.length == 0) {
        res.send({
          msg: "신청한 학생이 아닙니다."
        });
      } else {
        await db.query(sql.lecture.updateAcceptStudentByUserId, [lecture_id, studentId]);
        res.send({
          msg: "승인되었습니다."
        });
      }
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/takeLesson', function (req, res, next) {
  res.send('수강하기 탭에 필요 정보 및 하위 기능: 미팅룸입장, 수강하기');

})
router.get('/Notice', function (req, res, next) {
  res.send('공지사항 탭에 필요 정보 및 하위 기능: 공지사항 열람.');
})
router.get('/LearningMaterial', function (req, res, next) {
  res.send('학습자료에 필요 정보 및 하위 기능: 자료 열람');
})
router.get('QnA', function (req, res, next) {
  res.send('질문과 답변에 필요 정보 및 하위 기능: 질문하기');
})
module.exports = router;