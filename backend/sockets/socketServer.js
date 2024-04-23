const socketIO = require("socket.io");
const Chat = require("../models/Chat");

const initSocketServer = (httpServer) => {
  const io = socketIO(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("sendMessage", async (data) => {
      try {
        // Lưu tin nhắn vào cơ sở dữ liệu
        const { userId, storeId, orderId, message } = data;
        const newChat = new Chat({
          user_id: userId,
          store_id: storeId,
          order_id: orderId,
          message,
        });
        const savedChat = await newChat.save();

        // Gửi tin nhắn tới tất cả các clients đang kết nối
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
