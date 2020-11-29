module.exports = {
    selectPostByUserId: "select * from board_Project where userid=?",
    insertPost: "insert into board_Project(idx, title, content,writer, filename, regDate, moDate, count) values(?,?,?,?,?,?,?,?)"    
    // 이게 맞나....
};