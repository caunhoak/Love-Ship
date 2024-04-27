const socketIO = require("socket.io");
const Chat = require("../models/Chat");
const Store = require("../models/Store");
const User = require("../models/User");

const saveChat = async (userId, storeId, orderId, message) => {
  try {
    // Lấy tên cửa hàng từ storeId
    const store = await Store.findById(storeId);
    const storeName = store ? store.name : "";

    // Lấy tên người dùng từ userId
    const user = await User.findById(userId);
    const username = user ? user.username : "";

    const newChat = new Chat({
      user_id: userId,
      store_id: storeId,
      order_id: orderId,
      message,
      store_name: storeName,
      username: username,
    });

    const savedChat = await newChat.save();
    return savedChat;
  } catch (error) {
    throw new Error("Error saving chat message");
  }
};

const initSocketServer = (httpServer) => {
  const io = socketIO(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("sendMessage", async (data) => {
      try {
        const { userId, storeId, orderId, message } = data;
        const savedChat = await saveChat(userId, storeId, orderId, message);

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
