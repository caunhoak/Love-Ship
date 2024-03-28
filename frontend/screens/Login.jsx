import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import {
  Button,
  WhiteSpace,
  WingBlank,
  Provider,
  Checkbox,
} from "@ant-design/react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../components/StyleSheet";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.126.1:3000/api/auth/login",
        {
          email: username,
          password: password,
        }
      );

      // Nếu đăng nhập thành công, chuyển hướng đến màn hình AccountLogin
      navigation.navigate("AccountLogin", {
        username: username,
        role: response.data.role,
      });
    } catch (error) {
      // Xử lý khi đăng nhập thất bại
      Alert.alert("Invalid username or password");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToRegister = () => {
    navigation.navigate("Đăng ký");
  };

  const goToRePassword = () => {
    navigation.navigate("Lấy lại mật khẩu");
  };

  return (
    <Provider>
      <View style={styles.container}>
        <WingBlank style={styles.wingBlank}>
          <Text style={styles.title}>Đăng nhập</Text>
          <View style={styles.viewInputContainer}>
            <View style={styles.viewInput}>
              <Icon name="user" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Username"
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
          <WhiteSpace />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={rememberPassword}
              onChange={(checked) => setRememberPassword(checked)}
            >
              <Text>Remember password</Text>
            </Checkbox>
            <Text style={{ color: "blue" }} onPress={goToRePassword}>
              Forgot your password?
            </Text>
          </View>
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" style={styles.button} onPress={handleLogin}>
            Đăng nhập
          </Button>
          <WhiteSpace />
          <Button style={styles.button} onPress={goToRegister}>
            Đăng ký
          </Button>
        </WingBlank>
      </View>
    </Provider>
  );
};

export default Login;
