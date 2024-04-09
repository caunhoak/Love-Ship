import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const EditUserScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get(`http://192.168.1.39:3000/api/auth/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [userId]);

  const handleSaveChanges = () => {
    const { _id, username, ...updates } = user;

    axios
      .put(`http://192.168.1.39:3000/api/auth/user/${userId}`, updates)
      .then((response) => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chỉnh sửa thông tin người dùng</Text>
      <TextInput
        style={styles.input}
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
        placeholder="Tên người dùng"
        editable={false} // Không cho phép chỉnh sửa trường username
      />
      <TextInput
        style={styles.input}
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={user.phone}
        onChangeText={(text) => setUser({ ...user, phone: text })}
        placeholder="Số điện thoại"
      />
      <TextInput
        style={styles.input}
        value={user.role}
        onChangeText={(text) => setUser({ ...user, role: text })}
        placeholder="Vai trò"
        editable={false} // Không cho phép chỉnh sửa trường role
      />
      <Button title="Lưu thay đổi" onPress={handleSaveChanges} />
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditUserScreen;
