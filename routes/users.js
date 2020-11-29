var express = require('express');
var router = express.Router();
const db = require('../modules/db');
const sql = require('../sql')
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond of users request');
});

router.post('/signup', async function (req, res) {
  var { userid, password, user_name, univid, student_id, phone_number } = req.body;
  var converted = String(req.body.password);
  var password = crypto.createHash('sha256').update(converted).digest('base64');
  try {
    const [rows] = await db.query(sql.user.selectUserByUserId, [userid]);
    if (rows.length == 1) {
      res.send({
        code: 200,
        msg: "중복된 아이디가 있습니다."
      })
    }
    else {
      await db.query(sql.user.insertUser, [userid, password, user_name, univid, student_id, phone_number]).then((response) => {
        res.send({
          code: 200,
          msg: "회원가입에 성공하였습니다."
        });
      });
    }
  } catch (e) {
    console.log(e)
  }
});

router.post('/login', async function (req, res) {
  var { userid, password } = req.body;
  var converted = String(req.body.password);
  var password = crypto.createHash('sha256').update(converted).digest('base64');
  try {
    var [rows] = await db.query(sql.user.selectUserByUserId, [userid]);
    if (rows.length == 0)
      res.status(200).send("존재하지 않는 아이디입니다.");
    else {
      rows = rows[0]
      if (password == rows.password) {
        req.session.username = rows.userid;
        req.session.login = 'login';
        flag = true;
        req.session.save(() => {
          const token = jwt.sign({ _user: rows }, process.env.TOKEN_SECRET);
          delete rows.password;
          res.header('auth-token',token).send({
            user: rows,
            jwt: token
          });
        });
      } else {
        res.status(200).send("비밀번호를 확인해주세요.");
      }
    }
  } catch (e) {
    console.log(e)
  }
});

router.get('/logout', function (req, res) {
  res.status(200);
  req.session.destroy((err) => {
    if (err) {
      console.log("Session destroy Error");
    } else {
      res.redirect('/');
    }
  })
});

module.exports = router;