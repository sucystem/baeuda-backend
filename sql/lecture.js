module.exports = {
    selectLectureById: "SELECT * FROM baeuda.lecture WHERE id=?",
    selectLecturesByUserId: "SELECT * FROM baeuda.lecture as l join lecture_student as s on l.id = s.lecture_id where student_id=?",
    checkProfForLecture: "SELECT * FROM baeuda.lecture WHERE id=? AND prof=?"
};