module.exports = {
    selectScheduleById: "select * from Schedule where id=?",
    selectDTScheduleById: "select date, title where id = ?",
    selectScheduleByDate: "select title, startTime where id = ? and date = ?",
    insertSchedule: "insert into study(id, date,title) values (?, ?,?)",
}