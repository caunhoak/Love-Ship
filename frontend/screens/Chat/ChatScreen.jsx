import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import { Text, View, TextInput, Button, FlatList } from "react-native";
import io from "socket.io-client";
import axios from "axios";

const SERVER_URL = "http://192.168.1.39:3000"; // Đổi lại URL của server của bạn

const ChatScreen = () => {
  const { userId, storeId, orderId } = useContext(CartContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = io.connect(SERVER_URL);

  useEffect(() => {
    socket.on("newMessage", handleNewMessage);
    fetchChatMessages(); // Gọi hàm để lấy dữ liệu chat khi component được mount

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", { userId, storeId, orderId, message });
      setMessage(""); // Xóa nội dung tin nhắn ở ô nhập
    }
  };

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/chat/${orderId}`);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.message}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
          }}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;
