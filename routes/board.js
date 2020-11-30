var express = require('express');
var router = express.Router();
var sql = require('../sql')
var db = require('../modules/db')
var helper = require('../modules/helper')
var tokenUser = require('../modules/user');

router.use(tokenUser.tokenToUser);

router.get('/', function (req, res) {
    res.send("board");
});

router.get('/:board_id', async function (req, res) {
    const { id } = req.user._user;
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

router.get('/:board_id/post/:post_id', async function (req, res) {
    const { id } = req.user._user;
    const { board_id, post_id } = req.params;
    try {
        let [rows] = await db.query(sql.board.checkReadLevelByUserId, [board_id, id]);
        if (rows.length == 0) {
            res.send({
                result: 'false',
                data: [],
                msg: "권한이 없습니다."
            })
        } else {
            await db.query(sql.board.increaseCountByPostId, [post_id]);
            const [post] = await db.query(sql.board.selectPostByPostId, [post_id]);
            const [comments] = await db.query(sql.board.selectCommentsByPostId, [post_id]);
            res.status(200).send({
                result: 'true',
                data: { post, comments },
                msg: "게시글 읽기 성공"
            })
        }
    } catch (e) {
        helper.failedConnectionServer(res, e);
    }
});

router.get('/:board_id/:post_id/comments', async function (req, res) {
    const { id } = req.user._user;
    const { board_id, post_id } = req.params;
    try {
        let [rows] = await db.query(sql.board.checkReadLevelByUserId, [board_id, id]);
        if (rows.length == 0) {
            res.send({
                result: 'false',
                data: [],
                msg: "권한이 없습니다."
            })
        } else {
            [rows] = await db.query(sql.board.selectCommentsByPostId, [post_id]);
            res.send({
                result: 'true',
                data: rows,
                msg: "댓글 목록을 읽었습니다."
            });
        }
    } catch (e) {
        helper.failedConnectionServer(res, e);
    }
});

router.post('/:board_id/newPost', async function (req, res) {
    const { id } = req.user._user;
    const { title, content } = req.body;
    const { board_id } = req.params;
    try {
        let [rows] = await db.query(sql.board.checkWriteLevelByUserId, [board_id, id]);
        if (rows.length == 0) {
            res.send({
                result: "false",
                msg: "권한이 없습니다."
            })
        } else {
            [rows] = await db.query(sql.board.insertPost, [board_id, title, content, id, null]);
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

router.post('/:board_id/:post_id/addcomment', async function (req, res) {
    const { id } = req.user._user;
    const { comment } = req.body;
    const { board_id, post_id } = req.params;
    try {
        let [rows] = await db.query(sql.board.checkReadLevelByUserId, [board_id, id]);
        if (rows.length == 0) {
            res.status(200).send({
                msg: "권한이 없습니다."
            })
        } else {
            [rows] = await db.query(sql.board.insertComment, [post_id, id, comment]);
            res.status(200).send({
                msg: "댓글 등록에 성공했습니다."
            })
        }
    } catch (e) {
        helper.failedConnectionServer(res, e);
    }
});

module.exports = router;