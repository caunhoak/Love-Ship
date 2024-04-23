const socketIO = require("socket.io");

function initializeSocketServer(server) {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Xử lý sự kiện khi client gửi tin nhắn
    socket.on("sendMessage", (messageData) => {
      // Xử lý và lưu trữ tin nhắn vào cơ sở dữ liệu
      // ...

      // Gửi tin nhắn đến các clients khác
      io.emit("newMessage", messageData);
    });

    // Xử lý các sự kiện khác nếu cần
  });
}

module.exports = initializeSocketServer;
