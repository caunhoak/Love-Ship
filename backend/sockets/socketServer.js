const socketIO = require("socket.io");
const Chat = require("../models/Chat");

// Hàm xử lý lưu trữ tin nhắn chat vào cơ sở dữ liệu
const saveChat = async (userId, storeId, orderId, message) => {
  try {
    const newChat = new Chat({
      user_id: userId,
      store_id: storeId,
      order_id: orderId,
      message,
    });
    const savedChat = await newChat.save();
    return savedChat;
  } catch (error) {
    throw new Error("Error saving chat message");
  }
};

// Hàm khởi tạo và cấu hình Socket.IO server
const initSocketServer = (httpServer) => {
  const io = socketIO(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("sendMessage", async (data) => {
      try {
        // Lưu tin nhắn vào cơ sở dữ liệu
        const { userId, storeId, orderId, message } = data;
        const savedChat = await saveChat(userId, storeId, orderId, message);

        // Gửi tin nhắn mới cho tất cả các clients đang kết nối
        io.emit("newMessage", savedChat);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = initSocketServer;
