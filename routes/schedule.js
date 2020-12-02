var express = require('express');
var router = express.Router();
var sql = require('../sql')
var db = require('../modules/db')
var helper = require('../modules/helper')
var tokenUser = require('../modules/user')
const moment = require('moment')

router.use(tokenUser.tokenToUser);

router.get('/', function (req, res) {
    res.send("schedule");
});

router.get('/month/:month', async function(req, res){
    const { id } = req.user._user;
    const { month } = req.params;

    try{
        //const [rows] = await db.query(sql.schedule.selectTest);
        var [rows] = await db.query(sql.schedule.selectSchedulesByMonth, [id, month, month]);
        rows.map((row) => {
            row.id = String(row.id);
            row.calendarId = String(row.calendarId);
            row.start = moment(row.start).format("YYYY-MM-DDThh:mm:ss+09:00")
            row.end = moment(row.end).format("YYYY-MM-DDThh:mm:ss+09:00")
            if(row.dueDateClass == null) row.dueDateClass = '';
        });
        res.status(200).send({
            result: "true",
            data: rows,
            msg: "월간 일정을 불러왔습니다."
        })
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
});

router.get('/thisweek', async function(req, res){
    const { id } = req.user._user;
    try{
        //const [rows] = await db.query(sql.schedule.selectTest);
        var [rows] = await db.query(sql.schedule.selectWeekSchedules, [id]);
        rows.map((row) => {
            row.id = String(row.id);
            row.calendarId = String(row.calendarId);
            row.start = moment(row.start).format("YYYY-MM-DDThh:mm:ss+09:00")
            row.end = moment(row.end).format("YYYY-MM-DDThh:mm:ss+09:00")
            if(row.dueDateClass == null) row.dueDateClass = '';
        });
        res.status(200).send({
            result: "true",
            data: rows,
            msg: "이번주 일정을 불러왔습니다."
        })
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
});

router.get('/today', async function(req, res){
    const { id } = req.user._user;
    try{
        //const [rows] = await db.query(sql.schedule.selectTest);
        var [rows] = await db.query(sql.schedule.selectTodaySchedules, [id]);
        /*rows.map((row) => {
            row.id = String(row.id);
            row.calendarId = String(row.calendarId);
            row.start = moment(row.start).format("YYYY-MM-DDThh:mm:ss+09:00")
            row.end = moment(row.end).format("YYYY-MM-DDThh:mm:ss+09:00")
            if(row.dueDateClass == null) row.dueDateClass = '';
        });*/
        res.status(200).send({
            result: "true",
            data: rows,
            msg: "오늘 일정을 불러왔습니다."
        })
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
});

router.post('/add', async function(req, res){
    const { id } = req.user._user;
    const { calendarId, title, start, end, category } = req.body;

    try{
        await db.query(sql.schedule.insertSchedule, [calendarId, title, category, start, end]);
        res.status(200).send({
            result: "true",
            msg: "스케쥴 생성에 성공했습니다."
        })
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
});

router.post('/delete', async function(req, res){
    const { id } = req.body;

    try{
        await db.query(sql.schedule.deleteScheduleById, [id]);
        res.status(200).send({
            result: "true",
            msg: "스케쥴 삭제에 성공했습니다."
        })
    } catch(e) {
        helper.failedConnectionServer(res, e);
    }
});

module.exports = router;