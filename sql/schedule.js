module.exports = {
    selectScheduleById: "select * from baeuda.schedule where id=?",
    selectDTScheduleById: "select date, title from baeuda.schedule where id = ?",
    selectScheduleByDate: "select title, start from baeuda.schedule where id = ? and date = ?",
    insertSchedule: "INSERT INTO baeuda.schedule (calendarId, title, category, start, end) values (?, ?, ?, ?, ?)",

    selectSchedulesByMonth: "SELECT s.id, s.calendarId, s.title, s.category, s.dueDateClass, s.start, s.end FROM baeuda.schedule as s JOIN baeuda.calendar as c ON s.calendarId=c.id WHERE c.user_id=? AND (MONTH(start)=? OR MONTH(end)=?)",
    selectWeekSchedules: "SELECT s.id, s.calendarId, s.title, s.category, s.dueDateClass, s.start, s.end FROM baeuda.schedule as s JOIN baeuda.calendar as c ON s.calendarId=c.id WHERE c.user_id=? AND ((YEARWEEK(start) = YEARWEEK(now())) OR (YEARWEEK(end) = YEARWEEK(now())))",
    selectTodaySchedules: "SELECT s.id, s.calendarId, s.title, s.category, s.dueDateClass, s.start, s.end FROM baeuda.schedule as s JOIN baeuda.calendar as c ON s.calendarId=c.id WHERE c.user_id=? AND (DAY(start)=DAY(now()) AND DAY(end)=DAY(now())) ORDER BY start",

    selectScheduleByStudyId: `SELECT s.id, s.calendarId, s.title, s. category, s.dueDateClass, s.start, s.end 
                                FROM baeuda.schedule as s 
                                JOIN baeuda.calendar as c
                                ON c.id=s.calendarId
                                WHERE c.study_id=?`,

    selectScheduleByProjectId: `SELECT s.id, s.calendarId, s.title, s. category, s.dueDateClass, s.start, s.end 
                                FROM baeuda.schedule as s 
                                JOIN baeuda.calendar as c
                                ON c.id=s.calendarId
                                WHERE c.project_id=?`,
    
    deleteScheduleById: `DELETE FROM baeuda.schedule WHERE id=?`
};