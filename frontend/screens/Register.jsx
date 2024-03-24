import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import {
  Button,
  WhiteSpace,
  WingBlank,
  Provider,
} from "@ant-design/react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../components/StyleSheet";

const Register = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = () => {
    // Xử lý logic đăng ký ở đây
    console.log("Đăng ký");
  };

  const goToLogin = () => {
    navigation.navigate("Đăng nhập");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <WingBlank>
          <Text style={styles.title}>Đăng ký</Text>
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
          <WhiteSpace size="lg" />
          <Button type="primary" style={styles.button} onPress={handleRegister}>
            Đăng ký
          </Button>
          <WhiteSpace />
          <Button style={styles.button} onPress={goToLogin}>
            Đăng nhập
          </Button>
        </WingBlank>
      </View>
    </Provider>
  );
};

export default Register;
