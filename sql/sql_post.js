module.exports = {
    selectPostByUserId: "SELECT * FROM post WHERE userid=?",
    selectPostByIdx: "SELECT * FROM post WHERE idx = ?", 
    insertPost: "INSERT into post(idx, title, content, writer, postpw, filename, regDate, moDate, count) VALUES(?,?,?,?,?,?,?,?)" ,   
    deletePostByIdx: "DELETE * FROM post WHERE idx = ?",
    deletePostByIdxPw: "DELETE * FROM post WHERE idx = ? and postpw = ? "
    
};