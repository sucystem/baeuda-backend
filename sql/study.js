module.exports = {
    
    selectIdNameStudyById: "select id, name from study where id = ? ",
    selectIdNameSeatStudyById: "select id, name, maxSeat, currentSeat  from study where id = ?",
    selectRecruitsStudyById: "select recruitTitle, recruitContent from study where id = ?",

    insertStudy: "insert into study(id, name, maxSeat, currentSeat) values (?, ?, ?, ?)",
    insertRecruitStudy: "insert into study(recruitTitle, recruitContent) values (?,?)"
}