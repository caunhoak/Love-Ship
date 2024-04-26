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
  const [isTyping, setIsTyping] = useState(false);
  const socket = io.connect(SERVER_URL);

  let typingTimeout = null;

  useEffect(() => {
    socket.on("newMessage", handleNewMessage);
    socket.on("userTyping", handleUserTyping);

    fetchChatMessages();

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("userTyping", handleUserTyping);
    };
  }, []);

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]); // Thêm tin nhắn mới vào đầu danh sách
    // Sau khi nhận tin nhắn mới từ người gửi, ẩn hiệu ứng "..."
    setIsTyping(false);
  };

  const handleUserTyping = ({ senderId }) => {
    // Chỉ hiển thị hiệu ứng "..." trên màn hình của người nhận
    if (senderId !== userId) {
      setIsTyping(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", { userId, storeId, orderId, message });
      setMessage(""); // Xóa nội dung tin nhắn ở ô nhập
      setIsTyping(false); // Người dùng gửi tin nhắn, không còn đang nhập
    }
  };

  const handleTyping = (text) => {
    setMessage(text);

    // Clear previous timeout
    clearTimeout(typingTimeout);

    // Set a new timeout to send "typing" event after 500ms of inactivity
    typingTimeout = setTimeout(() => {
      if (text.trim() !== "") {
        socket.emit("typing", { senderId: userId });
      } else {
        setIsTyping(false); // Nếu ô nhập trống, không đang nhập tin nhắn
      }
    }, 500);
  };

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/chat/${orderId}`);
      setMessages(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const renderChatItem = ({ item, index }) => {
    if (item.isTyping) {
      // Chỉ hiển thị hiệu ứng "..." trên màn hình của người nhận
      return (
        <Text
          style={[styles.typingIndicator, { top: -25, alignSelf: "center" }]}
        >
          ...
        </Text>
      );
    }

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
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={handleTyping}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
      {isTyping && (
        <Text
          style={[
            styles.typingIndicator,
            { fontSize: 50, alignSelf: "center", top: 10 },
          ]}
        >
          ...
        </Text>
      )}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  typingIndicator: {
    position: "absolute",
    fontSize: 50,
    color: "gray",
    marginTop: 700,
    alignSelf: "center",
  },
});

export default ChatScreen;
