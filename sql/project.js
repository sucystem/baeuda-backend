module.exports = {
    
    selectIdNameProjectById: "select id, name from project where id = ? ",
    selectIdNameSeatProjectById: "select id, name, maxSeat, currentSeat  from project where id = ?",
    selectRecruitsProjectById: "select recruitTitle, recruitContent from project where id = ?",

    insertProject: "insert into project(id, name, maxSeat, currentSeat) values (?, ?, ?, ?)",
    insertRecruitProject: "insert into project(recruitTitle, recruitContent) values (?,?)"
}