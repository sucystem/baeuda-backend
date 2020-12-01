module.exports = {
    selectLectureById: "SELECT * FROM baeuda.lecture WHERE id=?",
    selectLecturesByStudentUserId: `SELECT l.id, l.name, l.prof, u.user_name FROM baeuda.lecture as l 
                                    join lecture_student as s on l.id = s.lecture_id 
                                    join user as u on u.id = l.prof where s.student_id=? AND s.state=1`,
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
    checkProfForLecture: "SELECT * FROM baeuda.lecture WHERE id=? AND prof=?",
    selectListRequestStudentsByLectureId: "SELECT u.id, u.user_name, u.univid, u.student_id, u.phone_number from baeuda.user as u JOIN baeuda.lecture_student as l ON l.student_id=u.id WHERE l.lecture_id=? AND l.state=0",
    selectRequestStudentByUserId: "SELECT u.id, u.user_name, u.univid, u.student_id, u.phone_number from baeuda.user as u JOIN baeuda.lecture_student as l ON l.student_id=u.id WHERE l.lecture_id=? AND u.id=? AND l.state=0",
    updateAcceptStudentByUserId: "UPDATE baeuda.lecture_student SET state=1 WHERE lecture_id=? AND student_id=?"
};