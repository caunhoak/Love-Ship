import React from "react";
import { View, Text, Button } from "react-native";

const AccountLogin = ({ route, navigation }) => {
  const { username, role } = route.params;

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây (ví dụ: xóa token, đặt lại trạng thái đăng nhập, vv.)
    navigation.navigate("Đăng nhập");
  };

  return (
    <View>
      <Text>Username: {username}</Text>
      <Text>Role: {role}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default AccountLogin;
