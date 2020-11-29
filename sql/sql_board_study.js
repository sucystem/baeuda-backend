module.exports = {
    selectPostByUserId: "select * from board_Study where userid=?",
    selectPost: "select * from board_Study where idx =?", 
    insertPost: "insert into board_Study(idx, title, content,writer, filename, regDate, moDate, count) values(?,?,?,?,?,?,?,?)"    
};