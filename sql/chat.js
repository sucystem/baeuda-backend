module.exports = {
    //selectChatRoomByUserId: `SELECT * FROM baeuda.chat_room WHERE member1=? OR member2=? ORDER BY id`,
    selectChatRoomByUserId: `SELECT * FROM baeuda.chat_room JOIN chat_member ON chatroom_id=id WHERE user_id=?`,
    selectChattingByChatRoomId: `SELECT c.id, c.sender, u.user_name, c.chat 
                                FROM baeuda.chat as c
                                JOIN baeuda.user as u
                                ON u.id=c.sender
                                WHERE chat_room=?
                                ORDER BY c.id`,
    insertChattingBychatRoomId: `INSERT INTO baeuda.chat (chat_room, sender, chat) VALUES (?, ?, ?)`,
    insertMemberByChatRoomId: `INSERT INTO baeuda.chat (chatroom_id, user_id) VALUES (?, ?)`
}