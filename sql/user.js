module.exports = {
    selectUserByUserId: "select * from user where userid=?",
    selectUserById: "select * from user where id=?",
    insertUser: "insert into user(userid, password, user_name, univid, student_id, phone_number) values (?, ?, ?, ?, ?, ?)",

    checkUserLevel: "select * from user where id=? AND level=?"
};