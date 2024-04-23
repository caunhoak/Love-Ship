const Chat = require("../models/Chat");

// Xử lý và lưu trữ tin nhắn vào cơ sở dữ liệu
async function saveMessage(sender_id, receiver_id, message) {
  try {
    const chatMessage = new Chat({
      sender_id,
      receiver_id,
      message,
    });

    await chatMessage.save();
    return chatMessage;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  saveMessage,
};
