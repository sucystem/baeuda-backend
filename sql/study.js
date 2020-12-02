module.exports = {
    
    selectIdNameStudyById: "select id, name from study where id = ? ",
    selectIdNameSeatStudyById: "select id, name, maxSeat, currentSeat  from study where id = ?",
    selectRecruitsStudyById: "select recruitTitle, recruitContent from study where id = ?",

    insertStudy: "insert into study(id, name, maxSeat, currentSeat) values (?, ?, ?, ?)",
    insertRecruitStudy: "insert into study(recruitTitle, recruitContent) values (?,?)",

    selectStudyByUserId: `SELECT * FROM baeuda.study as study 
                          JOIN baeuda.study_student as student 
                          ON study.id=student.study_id
                          WHERE student.student_id=?`,
    selectStudyWithRecuit: `SELECT * FROM baeuda.study WHERE state=0`,
    selectStudyById: `SELECT * FROM baeuda.study WHERE id=?`
}