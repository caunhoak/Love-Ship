import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Import hook useNavigation

const AdminScreen = () => {
  const navigation = useNavigation(); // Sử dụng hook useNavigation để truy cập vào navigation
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Gửi yêu cầu API để lấy danh sách người dùng từ backend
    axios
      .get("http://10.25.82.74:3000/api/auth/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEditUser = (userId) => {
    // Điều hướng đến màn hình chỉnh sửa người dùng với userId cụ thể
    navigation.navigate("EditUser", { userId });
  };

  const handleDeleteUser = (userId) => {
    // Gửi yêu cầu API để xóa người dùng từ backend
    axios
      .delete(`http://10.25.82.74:3000/api/auth/user/${userId}`)
      .then((response) => {
        // Cập nhật danh sách người dùng sau khi xóa thành công
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách người dùng</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.username}>{item.username}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.role}</Text>
            <TouchableOpacity onPress={() => handleEditUser(item._id)}>
              <Text style={styles.button}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteUser(item._id)}>
              <Text style={styles.button}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    color: "blue",
    marginTop: 5,
  },
});

export default AdminScreen;
