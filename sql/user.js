module.exports = {
    selectUserByUserId: "select * from user where userid=?",
    insertUser: "insert into user(userid, password, user_name, univid, student_id, phone_number) values (?, ?, ?, ?, ?, ?)"
};