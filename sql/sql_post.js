module.exports = {
    selectPostByUserId: "SELECT * FROM post WHERE userid=?",
    selectPostByIdx: "SELECT * FROM post WHERE idx = ?", 
    insertPost: "INSERT into post(idx, board_id, title, content, writer, postpw,  regDate, moDate) VALUES(?,?,?,?,?,?,?)" ,   
    deletePostByIdx: "DELETE * FROM post WHERE idx = ?",
    deletePostByIdxPw: "DELETE * FROM post WHERE idx = ? and postpw = ? "
    
};
