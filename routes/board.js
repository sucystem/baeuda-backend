var express = require('express');
var router = express.Router();
var sql = require('../sql')
var db = require('../modules/db')
var helper = require('../modules/helper')
var tokenUser = require('../modules/user');
const fileUpload = require('express-fileupload')
var crypto = require('crypto');

router.use(tokenUser.tokenToUser);
router.use(fileUpload());

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

router.post('/delete/post', async function(req, res){
    const { id } = req.user._user;
    const { boardId, postId } = req.body;
    try{
        let [rows] = await db.query(sql.board.selectPostByPostIdAndUserId, [postId, id]);
        if (rows.length == 0) {
            res.send({
                result: 'false',
                data: [],
                msg: "권한이 없습니다."
            })
        } else {
            [rows] = await db.query(sql.board.deletePostByPostId, [postId]);
            res.send({
                result: 'true',
                data: rows,
                msg: "게시글을 삭제했습니다."
            });
        }
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
})

router.post('/delete/comment', async function(req, res){
    const { id } = req.user._user;
    const { commentId } = req.body;
    try{
        let [rows] = await db.query(sql.board.selectCommentByCommentIdAndUserId, [commentId, id]);
        if (rows.length == 0) {
            res.send({
                result: 'false',
                data: [],
                msg: "권한이 없습니다."
            })
        } else {
            [rows] = await db.query(sql.board.deleteCommentByCommentId, [commentId]);
            res.send({
                result: 'true',
                data: rows,
                msg: "댓글을 삭제했습니다."
            });
        }
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
})

router.post('/post/:post_id', async function (req, res){
    const { id } = req.user._user;
    const { post_id } = req.params;
    try{
            await db.query(sql.board.increaseCountByPostId, [post_id]);
            const [post] = await db.query(sql.board.selectPostByPostId, [post_id]);
            const [comment] = await db.query(sql.board.selectCommentsByPostId, [post_id]);
            var comments = []
            const promise = comment.map(async row => {
                if(row.user_id == id){
                    row['delete'] = '[삭제]';
                }
                comments.push(row);
            })

            await Promise.all(promise);
            res.status(200).send({
                result: 'true',
                data: { post, comments },
                msg: "게시글 읽기 성공"
            })
    } catch(e) {
        helper.failedConnectionServer(res.e);
    }
})

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
            let [comment] = await db.query(sql.board.selectCommentsByPostId, [post_id]);
            let [files] = await db.query(sql.board.selectFilesByPostId, [post_id]);
            
            var comments = []
            const promise = comment.map(async row => {
                if(row.user_id == id){
                    row['delete'] = '[삭제]';
                }
                comments.push(row);
            })

            await Promise.all(promise);
            res.status(200).send({
                result: 'true',
                data: { post, comments, files },
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

            var data = []
            const promise = rows.map(async row => {
                if(row.user_id == id){
                    row['delete'] = 'x';
                }
                console.log(row);
                data.push(row);
            })

            await Promise.all(promise);
            res.send({
                result: 'true',
                data: data,
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
    var { file } = req.files || null;
    const { board_id } = req.params;
    var time = new Date();

    try {
        if(!file.length){
            file = [file];
        }
        let [rows] = await db.query(sql.board.checkWriteLevelByUserId, [board_id, id]);
        if (rows.length == 0) {
            res.send({
                result: "false",
                msg: "권한이 없습니다."
            })
        } else {
            [rows] = await db.query(sql.board.insertPost, [board_id, title, content, id, file.length]);
            
            const promise = file.map((file) => {
                var name = crypto.createHash('sha256').update(file.name + time).digest('base64');
                name = name.replace(/\//gi, '++');
                file.mv(`./files/'${name}'`);
                db.query(sql.board.insertFile, [file.name, name, rows.insertId]);
            })

            await Promise.all(promise);
            
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