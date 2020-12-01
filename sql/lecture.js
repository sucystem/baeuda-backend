module.exports = {
    selectLectureById: "SELECT * FROM baeuda.lecture WHERE id=?",
    selectLecturesByProfessorId: "SELECT * FROM baeuda.lecture WHERE prof=?",
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
    selectListRequestStudentsByLectureId: "SELECT u.id, u.user_name, u.univid, u.student_id, u.phone_number from baeuda.user as u JOIN baeuda.lecture_student as l ON l.student_id=u.id WHERE l.lecture_id=? AND l.state=0",
    selectRequestStudentByUserId: "SELECT u.id, u.user_name, u.univid, u.student_id, u.phone_number from baeuda.user as u JOIN baeuda.lecture_student as l ON l.student_id=u.id WHERE l.lecture_id=? AND u.id=? AND l.state=0",
    updateAcceptStudentByUserId: "UPDATE baeuda.lecture_student SET state=1 WHERE lecture_id=? AND student_id=?",
    insertUserLecture: `INSERT INTO baeuda.lecture_student (lecture_id, student_id) VALUES (?, ?)`,
    insertLessonsByLectureIdAndUserId: `INSERT INTO baeuda.lecture_lesson_progress (lesson_id, student_id) VALUES (?, ?)`,

    deleteRegistLectureByLectureIdAndUserId: `DELETE FROM baeuda.lecture_student WHERE lecture_id=? AND student_id=? AND state=?`
};