module.exports = {
    
    selectIdNameStudyById: "select id, name from study where id = ? ",
    selectIdNameSeatStudyById: "select id, name, maxSeat, currentSeat  from study where id = ?",
    selectRecruitsStudyById: "select recruitTitle, recruitContent from study where id = ?",

    insertStudy: "insert into study(name, recruitTitle, recruitContent, maxSeat) values (?, ?, ?, ?)",
    insertRecruitStudy: "insert into study(recruitTitle, recruitContent) values (?,?)",

    selectStudyByUserId: `SELECT * FROM baeuda.study as study 
                          JOIN baeuda.study_student as student 
                          ON study.id=student.study_id
                          WHERE student.student_id=? AND student.state>=1`,
    selectStudyWithRecuit: `SELECT * FROM baeuda.study WHERE state=0`,
    selectStudyById: `SELECT s.id, s.name, s.maxSeat, s.currentSeat, s.recruitTitle, s.recruitContent, s.link, c.id as calendarId
                      FROM baeuda.study as s 
                      JOIN baeuda.calendar as c
                      ON c.study_id=s.id
                      WHERE s.id=?`,

    
    insertUserStudy: `INSERT INTO baeuda.study_student (study_id, student_id, state) VALUES (?, ?, ?)`,
    insertFile: `INSERT INTO baeuda.file (name, path, study_id, user_id) VALUES (?, ?, ?, ?)`,
    selectStudyByStudyIdAndUserId: `SELECT * FROM baeuda.study_student WHERE study_id=? AND student_id=?`,
    selectFilesByStudyId: `SELECT f.id, f.path, f.name, f.upload_date, u.user_name
                            FROM baeuda.file as f
                            JOIN baeuda.user as u
                            ON u.id=f.user_id
                            WHERE study_id=?`,
    insertCalendar: `INSERT INTO baeuda.calendar (name, study_id) VALUES (?, ?)`,
    selectMembersByStudyId: `SELECT  s.study_id, u.id, s.state, u.userid, u.user_name, u.univid, u.student_id, u.phone_number
                            FROM baeuda.study_student as s JOIN baeuda.user as u ON s.student_id=u.id WHERE study_id=?`,

    insertChatRoomByStudyId: `INSERT INTO baeuda.chat_room (name, study_id) VALUES (?, ?)`

}