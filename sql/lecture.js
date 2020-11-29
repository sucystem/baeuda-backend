module.exports = {
    selectLectureById: "SELECT * FROM baeuda.lecture WHERE id=?",
    selectLecturesByUserId: "SELECT * FROM baeuda.lecture as l join lecture_student as s on l.id = s.lecture_id where student_id=?",
    checkProfForLecture: "SELECT * FROM baeuda.lecture WHERE id=? AND prof=?",
    selectListRequestStudentsByLectureId: "SELECT u.id, u.user_name, u.univid, u.student_id, u.phone_number from baeuda.user as u JOIN baeuda.lecture_student as l ON l.student_id=u.id WHERE l.lecture_id=? AND l.state=0",
    selectRequestStudentByUserId: "SELECT u.id, u.user_name, u.univid, u.student_id, u.phone_number from baeuda.user as u JOIN baeuda.lecture_student as l ON l.student_id=u.id WHERE l.lecture_id=? AND u.id=? AND l.state=0",
    updateAcceptStudentByUserId: "UPDATE baeuda.lecture_student SET state=1 WHERE lecture_id=? AND student_id=?"
};