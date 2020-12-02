module.exports = {
    selectPostByPostId: "SELECT p.id, p.board_id, p.title, p.content, p.writer, u.user_name, p.file, p.regDate, p.moDate, p.count FROM baeuda.user as u JOIN baeuda.post as p ON p.writer=u.id WHERE p.id=?",
    selectCommentsByPostId: "SELECT c.id, c.content, c.date, c.user_id, u.user_name FROM baeuda.user as u JOIN baeuda.comment as c ON c.user_id=u.id WHERE post_id=? ORDER BY c.date",
    selectPostsByBoardId: "SELECT p.id, p.title, p.content, p.writer, u.user_name, p.file, p.regDate, p.moDate, p.count FROM baeuda.user as u JOIN baeuda.post as p ON p.writer=u.id WHERE p.board_id=? ORDER BY p.id DESC Limit 15",
    checkReadLevelByUserId: "SELECT * FROM baeuda.board as b, baeuda.user as u WHERE u.level>=b.read_level AND b.id=? AND u.id=?",
    checkWriteLevelByUserId: "SELECT * FROM baeuda.board as b, baeuda.user as u WHERE u.level>=b.write_level AND b.id=? AND u.id=?",
    insertPost: "INSERT INTO baeuda.post (board_id, title, content, writer, file) VALUES (?, ?, ?, ?, ?)",
    insertComment: "INSERT INTO baeuda.comment (post_id, user_id, content) VALUES (?, ?, ?)",
    increaseCountByPostId: "UPDATE baeuda.post SET count = count + 1 WHERE id=?",

    selectPostByPostIdAndUserId: `SELECT * FROM baeuda.post WHERE id=? AND writer=?`,
    deletePostByPostId: "DELETE FROM baeuda.post WHERE id=?",
    selectCommentByCommentIdAndUserId: `SELECT * FROM baeuda.comment WHERE id=? AND user_id=?`,
    deleteCommentByCommentId: "DELETE FROM baeuda.comment WHERE id=?",

    insertBoard: `INSERT INTO baeuda.board (name, comment, read_level, write_level, level) VALUES (?, ?, ?, ?, ?)`
}