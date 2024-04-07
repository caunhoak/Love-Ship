// export default SignUpScreen;

import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import AuthButton from "../../components/AuthButton";
import styles from "../../components/StyleSheet";

const Register = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");

  const handleRegister = async () => {
    try {
      // Kiểm tra điều kiện nhập
      if (!username || !email || !phone || !password || !confirmPassword) {
        Alert.alert("Please enter all required fields");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Password incorrect");
        return;
      }

      // Kiểm tra mật khẩu
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        Alert.alert("Password is not secure");
        return;
      }

      // Kiểm tra email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Invalid email");
        return;
      }

      const response = await axios.post(
        "http://192.168.1.39:3000/api/auth/register",
        {
          username: username,
          email: email,
          phone: phone,
          password: password,
          role: role,
        }
      );
      console.log(response.data);
      Alert.alert("Success for register"); // Hiển thị thông báo thành công
      navigation.goBack("Login");
    } catch (error) {
      console.error("Registration failed:", error);
      Alert.alert("Registration failed"); // Hiển thị thông báo lỗi
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wingBlank}>
        <Text style={styles.title}>Đăng ký</Text>
        <View style={styles.viewInputContainer}>
          <View style={styles.viewInput}>
            <Icon name="user" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Tên đăng nhập"
              value={username}
              onChangeText={(value) => setUsername(value)}
            />
          </View>
        </View>
        <View style={styles.viewInputContainer}>
          <View style={styles.viewInput}>
            <Icon name="lock" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
            <Icon
              style={{ ...styles.icon, position: "absolute", right: 10 }}
              name={showPassword ? "eye" : "eyeo"}
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <View style={styles.viewInputContainer}>
          <View style={styles.viewInput}>
            <Icon name="lock" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
            />
            <Icon
              style={{ ...styles.icon, position: "absolute", right: 10 }}
              name={showPassword ? "eye" : "eyeo"}
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <View style={styles.viewInputContainer}>
          <View style={styles.viewInput}>
            <Icon name="mail" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
        </View>
        <View style={styles.viewInputContainer}>
          <View style={styles.viewInput}>
            <Icon name="phone" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Phone"
              value={phone}
              onChangeText={(value) => setPhone(value)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.viewPicker}>
          <Picker
            selectedValue={role}
            style={{ width: "100%" }}
            onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
          >
            <Picker.Item label="Vai trò: Khách hàng" value="customer" />
            <Picker.Item
              label="Vai trò: Quản lý cửa hàng"
              value="store_owner"
            />
          </Picker>
        </TouchableOpacity>
      </View>
      <AuthButton title="Đăng ký" onPress={handleRegister} />
      <AuthButton
        title="Đăng nhập"
        onPress={() => navigation.goBack("Login")}
      />
    </View>
  );
};

export default Register;
