module.exports = {
    selectPostByPostId: "SELECT * FROM baeuda.post WHERE id=?",
    selectCommentsByPostId: "SELECT * FROM baeuda.comment WHERE post_id=?",
    selectPostsByBoardId: "SELECT * FROM baeuda.post WHERE board_id=?",
    checkReadLevelByUserId: "SELECT * FROM baeuda.board as b, baeuda.user as u WHERE u.level>=b.read_level AND b.id=? AND u.id=?",
    checkWriteLevelByUserId: "SELECT * FROM baeuda.board as b, baeuda.user as u WHERE u.level>=b.write_level AND b.id=? AND u.id=?",
    insertPost: "INSERT INTO baeuda.post (board_id, title, content, writer, file) VALUES (?, ?, ?, ?, ?)"
}