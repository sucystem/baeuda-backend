var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var sql = require('../sql');
var helper = require('../modules/helper');
var tokenUser = require('../modules/user');
const fileUpload = require('express-fileupload')
var crypto = require('crypto');
var fs = require('fs');

router.use(tokenUser.tokenToUser);
router.use(fileUpload());

router.get('/', async function (req, res, next) {
  const { id } = req.user._user;
  try {
    const [rows] = await db.query(sql.lecture.selectLecturesByStudentUserId, [id, 1])
    if (rows.length == 0) {
      res.status(200).send({
        result: 'false',
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

router.get('/manage', async function (req, res, next) {
  const { id } = req.user._user;
  try {
    const [rows] = await db.query(sql.lecture.selectLecturesByProfessorId, [id])
    if (rows.length == 0) {
      res.status(200).send({
        result: 'false',
        data: [],
        msg: '관리할 강의가 없습니다.'
      })
    } else {
      res.status(200).send({
        result: 'true',
        data: rows,
        msg: '관리할 강의 조회에 성공했습니다.'
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
        result: 'false',
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
    const [rows] = await db.query(sql.lecture.selectLessonsByLectureIdAndStudentId, [lecture_id, id]);

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

  try {
    let [rows] = await db.query(sql.lecture.selectLectureByLectureIdAndUserId, [lecture_id, id]);
    if (rows.length == 0) {
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
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/accept/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
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
      [accepts] = await db.query(sql.lecture.selectStudentsByLectureId, [lecture_id, 0]);
      [students] = await db.query(sql.lecture.selectStudentsByLectureId, [lecture_id, 1]);
      [grades] = await db.query(sql.lecture.selectStudentsByLectureId, [lecture_id, 2]);
      res.status(200).send({
        result: 'true',
        data: { accepts, students, grades, rows },
        msg: '해당 강좌 신청 학생 목록을 조회했습니다.'
      })
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.post('/accept/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  const { option, studentId } = req.body;

  try {
    let [rows] = await db.query(sql.lecture.selectLectureByProf, [lecture_id, id]);
    if (rows.length == 0) {
      res.send({
        msg: "권한이 없습니다."
      });
    } else if (rows[0].cur_student >= rows[0].max_student) {
      res.send({
        result: "false",
        msg: "정원이 가득 찼습니다."
      });
    } else {
      [rows] = await db.query(sql.lecture.selectRequestStudentByUserId, [lecture_id, studentId]);
      if (rows.length == 0) {
        res.send({
          msg: "신청한 학생이 아닙니다."
        });
      } else {
        if (option === 'accept') {
          await db.query(sql.lecture.updateAcceptStudentByUserId, [lecture_id, studentId]);
          await db.query(sql.lecture.updateCurStudentByLectureId, [lecture_id]);
          [rows] = await db.query(sql.lecture.selectLessonsByLectureId, [lecture_id]);
          rows.map(async row => {
            await db.query(sql.lecture.insertLessonsByLectureIdAndUserId, [row.id, studentId]);
          })
          res.send({
            msg: "승인되었습니다."
          });
        } else if (option === 'cancel') {
          await db.query(sql.lecture.deleteRegistLectureByLectureIdAndUserId, [lecture_id, studentId, 0]);
          res.status(200).send({
            result: "true",
            data: [],
            msg: "취소되었습니다."
          })          
        }
      }
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.post('/graduate/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  const { grade, studentId } = req.body;

  try {
    let [rows] = await db.query(sql.lecture.selectLectureByProf, [lecture_id, id]);
    if (rows.length == 0) {
      res.send({
        msg: "권한이 없습니다."
      });
    } else {
      await db.query(sql.lecture.updateGraduateStudentByUserId, [grade, lecture_id, studentId]);
      await db.query(sql.lecture.minusCurStudentByLectureId, [lecture_id]);
      res.status(200).send({
        result: "true",
        data: [],
        msg: "이수처리 되었습니다."
      });
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.post('/outstudent/:lecture_id', async function (req, res) {
  const { id } = req.user._user;
  const { lecture_id } = req.params;
  const { grade, option, studentId } = req.body;

  try {
    let [rows] = await db.query(sql.lecture.selectLectureByProf, [lecture_id, id]);
    if (rows.length == 0) {
      res.send({
        msg: "권한이 없습니다."
      });
    } else {
      await db.query(sql.lecture.updateGraduateStudentByUserId, [grade, lecture_id, studentId]);
      await db.query(sql.lecture.minusCurStudentByLectureId, [lecture_id]);
      res.status(200).send({
        result: "true",
        data: [],
        msg: "이수처리 되었습니다."
      });
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/complete', async function (req, res) {
  const { id } = req.user._user;

  try {
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

router.post('/add', async function (req, res){
  const { id } = req.user._user;
  const {name, comment, max_student} = req.body;

  try{
    let [rows] = await db.query(sql.user.checkUserLevel, [id, 2]);
    if (rows.length == 0) {
      res.send({
        result: "false",
        msg: "권한이 없습니다."
      });
    } else {
      let [Notice] = await db.query(sql.board.insertBoard, ['Notice', name, 0, 1, 'lecture']);
      let [Data] = await db.query(sql.board.insertBoard, ['Data', name, 0, 1, 'lecture']);
      let [QnA] = await db.query(sql.board.insertBoard, ['QnA', name, 0, 0, 'lecture']);
      [rows] = await db.query(sql.lecture.insertLecture, [name, comment, max_student, id, Notice.insertId, Data.insertId, QnA.insertId]);
      await db.query(sql.lecture.insertProfLecture, [rows.insertId, id]);
      for(var i=1; i<=10; i++){
        let [lesson] = await db.query(sql.lecture.insertLessonsByLectureId, [rows.insertId, (i+"강")]);
        await db.query(sql.lecture.insertLessonsByLectureIdAndUserId, [lesson.insertId, id]);
      }

      res.send({
        result: "true",
        data: rows,
        msg: "강의가 생성되었습니다."
      })
    }
  }catch(e){
    helper.failedConnectionServer(res, e);
  }
})

router.post('/update/:lecture_id', async function (req, res){
  const { id } = req.user._user;
  const {lecture_id} = req.params;
  const {name, comment, max_student} = req.body;

  try{
    let [rows] = await db.query(sql.lecture.selectLectureByProf, [lecture_id, id]);
    if (rows.length == 0) {
      res.send({
        result: "false",
        msg: "권한이 없습니다."
      });
    } else {
      [rows] = await db.query(sql.lecture.updateLectureByLectureId, [name, comment, max_student, lecture_id]);
      res.status(200).send({
        result: "true",
        data: rows,
        msg: "강좌정보가 수정되었습니다."
      })
    }
  } catch(e){
    helper.failedConnectionServer(res, e);
  }
})

router.post('/delete/:lecture_id', async function (req, res){
  const { id } = req.user._user;
  const {lecture_id} = req.params;

  try{
    let [rows] = await db.query(sql.lecture.selectLectureByProf, [lecture_id, id]);
    if (rows.length == 0) {
      res.send({
        result: "false",
        msg: "권한이 없습니다."
      });
    } else {
      await db.query(sql.lecture.deleteLectureByLectureId, [lecture_id]);
      res.send({
        result: "true",
        msg: "강좌가 삭제되었습니다."
      })
    }
  } catch(e){
    helper.failedConnectionServer(res, e);
  }
})

router.post('/newPost', async function(req,res){
  const { id } = req.user._user;
  const { lectureId, title, content, board } = req.body;
  var file = null;
  var time = new Date();
  var inputFile = 0;
  var board_id;

  if (req.files) {
    file = req.files.file;
  }
  try {
    let [rows] = await db.query(sql.lecture.selectLectureById, [lectureId]);
    if(board === 'notice'){
      board_id = rows[0].notice_id;
    } else if(board === 'qna'){
      board_id = rows[0].qna_id;
    } else if(board === 'data'){
      board_id = rows[0].data_id;
    } else {
      throw(board);
    }
    if (file) {
      if (!file.length) {
        file = [file];
      }
      inputFile = file.length;
    }
    [rows] = await db.query(sql.board.checkWriteLevelByUserId, [board_id, id]);
    if (rows.length == 0) {
      res.send({
        result: "false",
        msg: "권한이 없습니다."
      })
    } else {
      [rows] = await db.query(sql.board.insertPost, [board_id, title, content, id, inputFile]);

      if (file) {
        var name = crypto.createHash('sha256').update(file[0].name + time + id).digest('base64');
        name = name.replace(/\//gi, '++');
        await fs.mkdir(`./files/${name}`, function (err, result) {
          if (err) console.log(err);
        });
        const promise = file.map((file) => {
          file.mv(`./files/${name}/${file.name}`);
          db.query(sql.board.insertFile, [file.name, name, rows.insertId]);
        })
        await Promise.all(promise);
      }

      res.status(200).send({
        result: "true",
        postid: rows.insertId,
        msg: "게시글 등록에 성공했습니다."
      });
    }
  } catch (e) {
    helper.failedConnectionServer(res, e);
  }
});

module.exports = router;