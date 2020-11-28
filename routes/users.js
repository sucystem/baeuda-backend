var express = require('express');
var router = express.Router();
const db = require('../modules/db');
const sql = require('../sql')
var crypto = require('crypto');


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

module.exports = router;