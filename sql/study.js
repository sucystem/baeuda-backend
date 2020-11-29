module.exports = {
    
    selectStudyById: "select * from study where id=?",
    selectIdNameById: "select id, name from study where id = ? ",
    selectSeatById: "select currentSeat, maxSeat from study where id = ?",
    insertStudy: "insert into study(id, name) values (?, ?)",
}