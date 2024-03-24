import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import {
  Button,
  WhiteSpace,
  WingBlank,
  Provider,
  Checkbox,
} from "@ant-design/react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../components/StyleSheet";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây
    console.log("Đăng nhập");
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
        <WingBlank>
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
              onChange={(e) => setRememberPassword(e.target.checked)}
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
