module.exports = {
    selectScheduleById: "select * from Schedule where id=?",
    selectDTScheduleById: "select date, title where id = ?",
    selectScheduleByDate: "select title, startTime where id = ? and date = ?",
    insertSchedule: "insert into study(id, date,title) values (?, ?,?)",

    selectTest: "SELECT * FROM baeuda.schedule",
    selectSchedulesByMonth: "SELECT * FROM baeuda.schedule as s JOIN baeuda.calendar as c ON s.calendarId=c.id WHERE c.user_id=? AND (MONTH(start)=? OR MONTH(end)=?)"
};