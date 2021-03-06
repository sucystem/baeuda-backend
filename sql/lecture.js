module.exports = {
    selectLectureById: "SELECT * FROM baeuda.lecture WHERE id=?",
    selectLecturesByProfessorId: "SELECT * FROM baeuda.lecture WHERE prof=?",
    selectLectureByProf: "SELECT * FROM baeuda.lecture WHERE id=? AND prof=?",
    selectLecturesByStudentUserId: `SELECT l.id, l.name, l.prof, u.user_name, l.cur_student, l.max_student, s.grade FROM baeuda.lecture as l 
                                    join lecture_student as s on l.id = s.lecture_id 
                                    join user as u on u.id = l.prof where s.student_id=? AND s.state=?`,
    selectLectureByLectureIdAndUserId: `SELECT * FROM baeuda.lecture_student WHERE lecture_id=? AND student_id=?`,
    selectLessonsByLectureIdAndStudentId: `SELECT * FROM baeuda.lecture_lesson as l 
                                JOIN baeuda.lecture_lesson_progress as p 
                                ON l.id=p.lesson_id
                                WHERE l.lecture_id=? AND student_id=?`,
    selectLessonsByLectureId: `SELECT * FROM baeuda.lecture_lesson WHERE lecture_id=?`,

    selectNoticesByLectureId: `SELECT p.id, p.title, p.content, p.writer, u.user_name, p.file, p.regDate, p.moDate, p.count 
                                FROM baeuda.user as u 
                                JOIN baeuda.post as p ON p.writer=u.id 
                                JOIN baeuda.lecture as l ON l.notice_id=p.board_id
                                WHERE l.id=? ORDER BY p.id DESC`,
    selectQnAsByLectureId: `SELECT p.id, p.title, p.content, p.writer, u.user_name, p.file, p.regDate, p.moDate, p.count 
                                FROM baeuda.user as u 
                                JOIN baeuda.post as p ON p.writer=u.id 
                                JOIN baeuda.lecture as l ON l.qna_id=p.board_id
                                WHERE l.id=? ORDER BY p.id DESC`,
    selectDatasByLectureId: `SELECT p.id, p.title, p.content, p.writer, u.user_name, p.file, p.regDate, p.moDate, p.count 
                                FROM baeuda.user as u 
                                JOIN baeuda.post as p ON p.writer=u.id 
                                JOIN baeuda.lecture as l ON l.data_id=p.board_id
                                WHERE l.id=? ORDER BY p.id DESC`,
    selectNotRegistLectureByUserId: `SELECT DISTINCT
                                    l.id, l.name, l.comment, l.prof, u.user_name as prof_name, l.cur_student, l.max_student
                                    FROM baeuda.lecture as l
                                    JOIN baeuda.user as u
                                    ON u.id=l.prof
                                    WHERE l.id NOT IN 
                                    (SELECT lecture_id as id FROM baeuda.lecture_student WHERE student_id=?)`,


    selectNumberOfStudentByLectureId: `SELECT s.lecture_id, COUNT(if(s.state=1, s.state, null)) as cur_student, l.max_student 
                                       FROM baeuda.lecture as l JOIN baeuda.lecture_student as s 
                                       ON s.lecture_id = l.id WHERE s.lecture_id=? GROUP BY s.lecture_id`,


                                
    checkProfForLecture: "SELECT * FROM baeuda.lecture WHERE id=? AND prof=?",
    selectStudentsByLectureId: "SELECT u.id, u.user_name, u.univid, u.student_id, u.phone_number, l.grade from baeuda.user as u JOIN baeuda.lecture_student as l ON l.student_id=u.id WHERE l.lecture_id=? AND l.state=?",
    selectRequestStudentByUserId: "SELECT u.id, u.user_name, u.univid, u.student_id, u.phone_number from baeuda.user as u JOIN baeuda.lecture_student as l ON l.student_id=u.id WHERE l.lecture_id=? AND u.id=? AND l.state=0",
    updateAcceptStudentByUserId: "UPDATE baeuda.lecture_student SET state=1 WHERE lecture_id=? AND student_id=?",
    insertUserLecture: `INSERT INTO baeuda.lecture_student (lecture_id, student_id) VALUES (?, ?)`,
    insertProfLecture: `INSERT INTO baeuda.lecture_student (lecture_id, student_id, state) VALUES (?, ?, 99)`,
    insertLessonsByLectureIdAndUserId: `INSERT INTO baeuda.lecture_lesson_progress (lesson_id, student_id) VALUES (?, ?)`,
    insertLecture: `INSERT INTO baeuda.lecture (name, comment, max_student, prof, notice_id, data_id, qna_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    updateLectureByLectureId: `UPDATE baeuda.lecture SET name=?, comment=?, max_student=? WHERE id=?`,
    insertLessonsByLectureId: `INSERT INTO baeuda.lecture_lesson (lecture_id, title) VALUES (?, ?)`,

    updateCurStudentByLectureId: `UPDATE baeuda.lecture SET cur_student=cur_student+1 WHERE id=?`,
    minusCurStudentByLectureId: `UPDATE baeuda.lecture SET cur_student=cur_student-1 WHERE id=?`,
    updateGraduateStudentByUserId: `UPDATE baeuda.lecture_student SET state=2, grade=? WHERE lecture_id=? AND student_id=?`,

    deleteRegistLectureByLectureIdAndUserId: `DELETE FROM baeuda.lecture_student WHERE lecture_id=? AND student_id=? AND state=?`,
    deleteLectureByLectureId: `DELETE FROM baeuda.lecture WHERE id=?`,

    selectChatRoomByLectureId: `SELECT * FROM baeuda.chat_room WHERE lecture_id=?`,
    insertChatRoomByLectureId: `INSERT INTO baeuda.chat_room (name, lecture_id) VALUES (?, ?)`,

    selectAssignmentsByLectureId: `SELECT * FROM baeuda.lecture_assignment WHERE lecture_id=?`,
    selectAssignmentById: `SELECT * FROM baeuda.lecture_assignment WHERE id=?`,
    selectFilesByAssignmentId: `SELECT * FROM baeuda.file WHERE assignment_id=?`,
    deleteAssignmentById: `DELETE FROM baeuda.lecture_assignment WHERE id=?`,
    insertAssignFile: `INSERT INTO baeuda.file (name, path, assignment_id, user_id) VALUES (?, ?, ?, ?)`,
    insertAssignment: `INSERT INTO baeuda.lecture_assignment (lecture_id, title, content, dueDate, file) VALUES (?, ?, ?, ?, ?)`,

    insertSubmitFile: `INSERT INTO baeuda.file (name, path, submit_id, user_id) VALUES (?, ?, ?, ?)`,
    insertSubmission: `INSERT INTO baeuda.lecture_assignment_submission (assignment_id, content, user_id, file) VALUES (?, ?, ?, ?)`,

    selectSubmissionsByUserId: `SELECT s.id, s.assignment_id, s.user_id, u.user_name, u.univid, u.student_id, s.submitDate, s.content, f.id as file_id, f.path, f.name
                                FROM baeuda.lecture_assignment_submission as s JOIN baeuda.user as u ON s.user_id=u.id LEFT JOIN baeuda.file as f
                                ON f.submit_id=s.id WHERE s.assignment_id=? AND s.user_id=? ORDER BY submitDate`,
    
    selectSubmissionsByAssignmentId: `SELECT s.id, s.assignment_id, s.user_id, u.user_name, u.univid, u.student_id, s.submitDate, s.content, f.id as file_id, f.path, f.name
                                FROM baeuda.lecture_assignment_submission as s JOIN baeuda.user as u ON s.user_id=u.id LEFT JOIN baeuda.file as f
                                ON f.submit_id=s.id WHERE s.assignment_id=? ORDER BY submitDate`,
};