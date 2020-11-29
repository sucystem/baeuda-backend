var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var sql = require('../sql');
var helper = require('../modules/helper')

router.get('/', async function(req, res, next) {
  try{
    const [rows] = await db.query(sql.community.selectCommunityBoardList);
    res.send({
      result: 'true',
      data: rows,
      msg: "커뮤니티 게시판 목록 조회완료"
    });
  } catch(e) {
    helper.failedConnectionServer(res, e);
  }
});

router.get('/post/:post_id', async function(req, res){
  const { post_id } = req.params;
  try{
    const [post] = await db.query(sql.community.selectPostByPostId, [post_id]);
    const [comment] = await db.query(sql.community.selectCommentsByPostId, [post_id]);
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