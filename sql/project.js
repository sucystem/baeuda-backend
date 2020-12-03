module.exports = {
    
    selectIdNameProjectById: "select id, name from project where id = ? ",
    selectIdNameSeatProjectById: "select id, name, maxSeat, currentSeat  from project where id = ?",
    selectRecruitsProjectById: "select recruitTitle, recruitContent from project where id = ?",

    insertProject: "insert into project(name, recruitTitle, recruitContent, maxSeat) values (?, ?, ?, ?)",
    insertRecruitProject: "insert into project(recruitTitle, recruitContent) values (?,?)",

    selectProjectByUserId: `SELECT * FROM baeuda.project as project 
                          JOIN baeuda.project_student as student 
                          ON project.id=student.project_id
                          WHERE student.student_id=? AND student.state>=1`,
    selectProjectWithRecuit: `SELECT * FROM baeuda.project WHERE state=0`,
    selectProjectById: `SELECT s.id, s.name, s.maxSeat, s.currentSeat, s.recruitTitle, s.recruitContent, s.link, c.id as calendarId
                      FROM baeuda.project as s 
                      JOIN baeuda.calendar as c
                      ON c.project_id=s.id
                      WHERE s.id=?`,

    
    insertUserProject: `INSERT INTO baeuda.project_student (project_id, student_id, state) VALUES (?, ?, ?)`,
    insertFile: `INSERT INTO baeuda.file (name, path, project_id, user_id) VALUES (?, ?, ?, ?)`,
    selectProjectByProjectIdAndUserId: `SELECT * FROM baeuda.project_student WHERE project_id=? AND student_id=?`,
    selectFilesByProjectId: `SELECT f.id, f.path, f.name, f.upload_date, u.user_name
                            FROM baeuda.file as f
                            JOIN baeuda.user as u
                            ON u.id=f.user_id
                            WHERE project_id=?`,
    insertCalendar: `INSERT INTO baeuda.calendar (name, project_id) VALUES (?, ?)`,
    selectMembersByProjectId: `SELECT  s.project_id, u.id, s.state, u.userid, u.user_name, u.univid, u.student_id, u.phone_number
                            FROM baeuda.project_student as s JOIN baeuda.user as u ON s.student_id=u.id WHERE project_id=?`,

    selectChatRoomByProjectId: `SELECT * FROM baeuda.chat_room WHERE project_id=?`,
    insertChatRoomByProjectId: `INSERT INTO baeuda.chat_room (name, project_id) VALUES (?, ?)`,
    selectProjectByLeader: `SELECT * FROM baeuda.project as project 
                          JOIN baeuda.project_student as student 
                          ON project.id=student.project_id
                          WHERE project.id=? AND student.student_id=? AND student.state=2`,
    selectRequestStudentByUserId: `SELECT * FROM baeuda.project as project 
                          JOIN baeuda.project_student as student 
                          ON project.id=student.project_id
                          WHERE project.id=? AND student.student_id=? AND student.state=0`,
    updateAcceptStudentByUserId: "UPDATE baeuda.project_student SET state=1 WHERE project_id=? AND student_id=?",
    updateCurSeatByProjectId: `UPDATE baeuda.project SET currentSeat=currentSeat+1 WHERE id=?`,
    minusCurSeatByProjectId: `UPDATE baeuda.project SET currentSeat=currentSeat-1 WHERE id=?`,
    deleteRegistProjectByProjectIdAndUserId: `DELETE FROM baeuda.project_student WHERE project_id=? AND student_id=? AND state=?`,
}