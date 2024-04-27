import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";
import axios from "axios";

const SERVER_URL = process.env.EXPO_PUBLIC_LOCALHOST;

const ChatScreen = () => {
  const { userId, storeId, orderId } = useContext(CartContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = io.connect(SERVER_URL);

  useEffect(() => {
    socket.on("newMessage", handleNewMessage);
    fetchChatMessages();

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]); // Thêm tin nhắn mới vào đầu danh sách
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", { userId, storeId, orderId, message });
      setMessage("");
    }
  };

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/chat/${orderId}`);
      setMessages(response.data.reverse()); // Đảo ngược danh sách tin nhắn khi nhận được từ server
    } catch (error) {
      console.error(error);
    }
  };

  const renderChatItem = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          { alignSelf: item.user_id === userId ? "flex-end" : "flex-start" },
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: item.user_id === userId ? "#DCF8C6" : "#E8E8E8",
            },
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>{item.username}: </Text>
          <Text>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        inverted // Đảo ngược thứ tự của danh sách để hiển thị tin nhắn mới nhất ở dưới cùng
      />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
          }}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 10,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
  },
});

export default ChatScreen;
