// export default LoginScreen;
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../api/CartContext";
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
import styles from "../../components/StyleSheet";
import AuthButton from "../../components/AuthButton";
import { CheckBox } from "@rneui/base";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import * as Network from "expo-network";

const Login = ({ navigation }) => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const { setUserId } = useContext(CartContext);
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
      // const authUrl = "http://10.25.82.74:3000/auth/google";
      const response = await WebBrowser.openAuthSessionAsync(
        `${urlLocalHost}/auth/google`
      );
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
    if (!username || !password) {
      Alert.alert("Lỗi đăng nhập", "Vui lòng nhập tên người dùng và mật khẩu");
      return;
    }
    try {
      const response = await axios.post(`${urlLocalHost}/api/auth/login`, {
        username: username,
        password: password,
      });

      const { redirectScreen, userId, storeId } = response.data;

      if (userId) {
        // Lưu userId vào CartContext
        setUserId(userId);

        if (checked) {
          await AsyncStorage.setItem("savedUsername", username);
          await SecureStore.setItemAsync("savedPassword", password);
          await AsyncStorage.setItem("isChecked", "true");
        } else {
          await AsyncStorage.removeItem("savedUsername");
          await SecureStore.deleteItemAsync("savedPassword");
          await AsyncStorage.removeItem("isChecked");
        }

        if (redirectScreen === "ManagementStore") {
          // Nếu là store_owner, kiểm tra storeId
          if (storeId) {
            navigation.navigate(redirectScreen, { storeId: storeId });
            console.log("StoreId:", storeId);
          } else {
            console.error("No storeId returned from server");
            Alert.alert("Lỗi đăng nhập", "Không có storeId trả về từ máy chủ");
            return; // Dừng hàm nếu không có storeId
          }
        } else if (redirectScreen === "RegisterStoreScreen") {
          navigation.navigate(redirectScreen);
        } else {
          navigation.navigate(redirectScreen); // Navigate to the screen received from the backend
        }
      } else {
        Alert.alert("Lỗi đăng nhập", "Tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      Alert.alert("Lỗi đăng nhập", "Tên người dùng hoặc mật khẩu không hợp lệ");
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
          const response = await axios.post(`${urlLocalHost}/api/auth/login`, {
            username: savedUsername,
            password: savedPassword,
          });
          const { redirectScreen } = response.data;
          navigation.navigate(redirectScreen); // Navigate to the screen received from the backend
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
