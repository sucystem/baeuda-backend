module.exports = {
    
    selectIdNameStudyById: "select id, name from study where id = ? ",
    selectIdNameSeatStudyById: "select id, name, maxSeat, currentSeat  from study where id = ?",
    selectRecruitsStudyById: "select recruitTitle, recruitContent from study where id = ?",

    insertStudy: "insert into study(name, recruitTitle, recruitContent, maxSeat) values (?, ?, ?, ?)",
    insertRecruitStudy: "insert into study(recruitTitle, recruitContent) values (?,?)",

    selectStudyByUserId: `SELECT * FROM baeuda.study as study 
                          JOIN baeuda.study_student as student 
                          ON study.id=student.study_id
                          WHERE student.student_id=?`,
    selectStudyWithRecuit: `SELECT * FROM baeuda.study WHERE state=0`,
    selectStudyById: `SELECT s.id, s.name, s.maxSeat, s.currentSeat, s.recruitTitle, s.recruitContent, s.link, c.id as calendarId
                      FROM baeuda.study as s 
                      JOIN baeuda.calendar as c
                      ON c.study_id=s.id
                      WHERE s.id=?`,

    
    insertUserStudy: `INSERT INTO baeuda.study_student (study_id, student_id) VALUES (?, ?)`,
    insertFile: `INSERT INTO baeuda.file (name, path, study_id, user_id) VALUES (?, ?, ?, ?)`,
    selectStudyByStudyIdAndUserId: `SELECT * FROM baeuda.study_student WHERE study_id=? AND student_id=?`,
    selectFilesByStudyId: `SELECT f.id, f.path, f.name, f.upload_date, u.user_name
                            FROM baeuda.file as f
                            JOIN baeuda.user as u
                            ON u.id=f.user_id
                            WHERE study_id=?`
}