import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AuthButton from "../components/AuthButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const UserManagementScreen = ({ navigation }) => {
  const [savedUsername, setSavedUsername] = useState("");

  useEffect(() => {
    retrieveSavedUsername();
  }, []);

  const retrieveSavedUsername = async () => {
    try {
      const username = await AsyncStorage.getItem("savedUsername");
      setSavedUsername(username);
    } catch (error) {
      console.error("Error retrieving saved username:", error);
    }
  };

  const handleLogout = async () => {
    try {
      Alert.alert(
        "Lưu thông tin đăng nhập?",
        `Chúng tôi sẽ lưu thông tin đăng nhập cho ${
          savedUsername ? savedUsername : "người dùng"
        } để bạn không cần đăng nhập vào lần sau.`,
        [
          {
            text: "Lúc khác",
            onPress: async () => {
              // Xóa toàn bộ thông tin đăng nhập từ AsyncStorage và SecureStore
              await AsyncStorage.removeItem("savedUsername");
              await SecureStore.deleteItemAsync("savedPassword");
              await AsyncStorage.removeItem("isChecked");
              navigation.navigate("Login");
            },
            style: "cancel",
          },
          {
            text: "Lưu",
            onPress: () => {
              // Chuyển hướng đến màn hình "Login"
              navigation.navigate("Login");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      Alert.alert("Đã xảy ra lỗi khi đăng xuất");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Đây là màn hình AccountLogin</Text>
      <AuthButton title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
};

export default UserManagementScreen;
