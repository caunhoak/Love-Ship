// export default LoginScreen;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../components/StyleSheet";
import AuthButton from "../components/AuthButton";
import { CheckBox } from "@rneui/base";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import * as Network from "expo-network";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Kiểm tra xem checkbox đã được chọn và có dữ liệu đăng nhập được lưu trữ hay không khi màn hình được tải
    checkCheckbox();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      // Yêu cầu quyền truy cập internet từ người dùng
      const { type } = await Network.getNetworkStateAsync();
      if (type === Network.NetworkStateType.UNKNOWN) {
        console.error("Permission to access internet was denied");
        return;
      }
      // Tiến hành đăng nhập Google
      const authUrl = "http://192.168.1.39:3000/auth/google";
      const response = await WebBrowser.openAuthSessionAsync(authUrl);
      const { type: responseType, url } = response;
      if (responseType === "success") {
        // Xử lý phản hồi từ backend sau khi đăng nhập thành công
        console.log(url);
      }
    } catch (error) {
      console.error("Error opening auth session:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.39:3000/api/auth/login",
        {
          username: username,
          password: password,
        }
      );

      if (checked) {
        await AsyncStorage.setItem("savedUsername", username);
        await SecureStore.setItemAsync("savedPassword", password);
        await AsyncStorage.setItem("isChecked", "true");
      } else {
        await AsyncStorage.removeItem("savedUsername");
        await SecureStore.deleteItemAsync("savedPassword");
        await AsyncStorage.removeItem("isChecked");
      }

      const { redirectScreen } = response.data;
      navigation.navigate(redirectScreen); // Navigate to the screen received from the backend
    } catch (error) {
      Alert.alert("Tên người dùng hoặc mật khẩu không hợp lệ");
    }
  };

  const handleCheckBoxChange = () => {
    setChecked(!checked);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const goToRePassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const checkCheckbox = async () => {
    try {
      // Kiểm tra xem checkbox đã được chọn hay không
      const isChecked = await AsyncStorage.getItem("isChecked");
      if (isChecked === "true") {
        // Kiểm tra xem có dữ liệu đăng nhập đã được lưu trữ hay không
        const savedUsername = await AsyncStorage.getItem("savedUsername");
        const savedPassword = await SecureStore.getItemAsync("savedPassword");
        if (savedUsername !== null && savedPassword !== null) {
          // Nếu có dữ liệu đăng nhập đã được lưu trữ, chuyển hướng trực tiếp đến trang AccountLogin
          navigation.navigate("AccountLogin", {
            username: savedUsername,
            role: "user", // Thay thế bằng dữ liệu vai trò thích hợp từ phản hồi API
          });
        }
      }
    } catch (error) {
      console.error("Error checking checkbox:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wingBlank}>
        <Text style={styles.title}>Đăng nhập</Text>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CheckBox
            checked={checked}
            checkedColor="#0F0"
            checkedTitle="Lưu mật khẩu"
            onIconPress={handleCheckBoxChange}
            size={30}
            title="Không lưu mật khẩu"
            uncheckedColor="#F00"
          />
          <TouchableOpacity onPress={goToRePassword}>
            <Text style={{ color: "blue" }}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AuthButton title="Đăng nhập" onPress={handleLogin} />
      <AuthButton title="Đăng ký" onPress={goToRegister} />
      <Button title="Login with Google" onPress={handleGoogleLogin} />
    </View>
  );
};

export default Login;
