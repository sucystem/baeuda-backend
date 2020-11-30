var express = require('express');
var router = express.Router();
var sql = require('../sql')
var db = require('../modules/db')
var helper = require('../modules/helper')

router.get('/', function (req, res) {
    res.send("board");
});

router.get('/:board_id', async function (req, res) {
    const { id } = req.user._user[0];
    const { board_id } = req.params;
    try {
        let [rows] = await db.query(sql.board.checkReadLevelByUserId, [board_id, id]);
        if (rows.length == 0) {
            res.send({
                result: 'false',
                data: [],
                msg: "권한이 없습니다."
            })
        } else {
            [rows] = await db.query(sql.board.selectPostsByBoardId, [board_id]);
            res.send({
                result: 'true',
                data: rows,
                msg: "게시글 목록을 읽었습니다."
            });
        }
    } catch (e) {
        helper.failedConnectionServer(res, e);
    }
});

router.get('/post/:post_id', async function (req, res) {
    const { id } = req.user._user[0];
    const { post_id } = req.params;
    try {
        const [post] = await db.query(sql.board.selectPostByPostId, [post_id]);
        const [comment] = await db.query(sql.board.selectCommentsByPostId, [post_id]);
        res.send({
            result: 'true',
            data: { post, comment },
            msg: "게시글 읽기 성공"
        })
    } catch (e) {
        helper.failedConnectionServer(res, e);
    }
});

router.post('/:board_id/newPost', async function (req, res) {
    const id = JSON.parse(req.headers.user).id;
    const { title, content } = req.body;
    const { board_id } = req.params;
    try {
        let [rows] = await db.query(sql.board.checkWriteLevelByUserId, [board_id, id]);
        if (rows.length == 0) {
            res.send({
                msg: "권한이 없습니다."
            })
        } else {
            await db.query(sql.board.insertPost, [board_id, title, content, id, null]);
            res.status(200).send({
                msg: "게시글 등록에 성공했습니다."
            });
        }
    } catch (e) {
        helper.failedConnectionServer(res, e);
    }
});

module.exports = router;