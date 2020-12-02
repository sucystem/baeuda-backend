var express = require('express');
var router = express.Router();
var sql = require('../sql')
var db = require('../modules/db')
var helper = require('../modules/helper')
var tokenUser = require('../modules/user');

router.use(tokenUser.tokenToUser);

router.get('/', async function (req, res) {
    const { id } = req.user._user;
    try {
        var [rows] = await db.query(sql.chat.selectChatRoomByUserId, [id]);
        /*const data = [];
        const promise = rows.map(async row => {
            var person = row.member2;
            if(row.member2 == id) person = row.member1;

            var [user] = await db.query(sql.user.selectUserById, [person]);
            data.push({
                id: row.id,
                receiver: user[0].user_name
            })
        })
        await Promise.all(promise);*/
        res.status(200).send({
            result: "true",
            data: rows,
            msg: "채팅방 목록"
        });
    } catch (e) {
        helper.failedConnectionServer(res, e);
    }
});

router.post('/', async function (req,res) {
    const { id } = req.user._user;
    const { chatId, chat } = req.body;
    try{
        await db.query(sql.chat.insertChattingBychatRoomId, [chatId, id, chat]);
        const [rows] = await db.query(sql.chat.selectChattingByChatRoomId, [chatId]);
        res.status(200).send({
            result: "true",
            data: rows,
            msg: "채팅"
        });
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
})

router.get('/chatting/:chatId', async function (req, res) {
    const { id } = req.user._user;
    const { chatId } = req.params;
    try {
        const [rows] = await db.query(sql.chat.selectChattingByChatRoomId, [chatId]);
        res.status(200).send({
            result: "true",
            data: rows,
            msg: "채팅"
        });
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
})

module.exports = router;