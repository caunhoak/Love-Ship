import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import {
  Button,
  WhiteSpace,
  WingBlank,
  Provider,
  Picker,
  List,
} from "@ant-design/react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../components/StyleSheet";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(["customer"]);

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
        "http://192.168.126.1:3000/api/auth/register",
        {
          username: username,
          email: email,
          phone: phone,
          password: password,
          role: role[0], // Assuming role is an array with single value
        }
      );
      console.log(response.data);
      Alert.alert("Success for register"); // Hiển thị thông báo thành công
    } catch (error) {
      console.error("Registration failed:", error);
      Alert.alert("Registration failed"); // Hiển thị thông báo lỗi
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <WingBlank style={styles.wingBlank}>
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
          <Picker
            data={[
              { value: "admin", label: "Admin" },
              { value: "store_owner", label: "Store Owner" },
              { value: "customer", label: "Customer" },
            ]}
            cols={1}
            value={role}
            onChange={(value) => setRole(value)}
            okText="Ok"
            dismissText="Cancel"
          >
            <List.Item arrow="horizontal" style={styles.listPicker}>
              Role
            </List.Item>
          </Picker>
          <WhiteSpace size="lg" />
          <Button type="primary" style={styles.button} onPress={handleRegister}>
            Đăng ký
          </Button>
        </WingBlank>
      </View>
    </Provider>
  );
};

export default Register;
