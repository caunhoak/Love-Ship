import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../../components/StyleSheet";
import AuthButton from "../../components/AuthButton";
import axios from "axios"; // Import axios for making HTTP requests

const RePassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    // Kiểm tra email trước khi gửi yêu cầu
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }

    try {
      // Gửi yêu cầu kiểm tra email có tồn tại hay không
      const response = await axios.post(
        "http://192.168.126.1:3000/api/auth/request-reset-password",
        { email }
      );

      // Hiển thị thông báo và chuyển đến trang ResetPassword nếu email tồn tại trong hệ thống
      navigation.navigate("ResetPassword", { email: email });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Nếu email không tồn tại trong hệ thống
        Alert.alert("Lỗi", "Email không tồn tại trong hệ thống");
      } else {
        // Xử lý các lỗi khác
        console.error("Lỗi:", error);
        Alert.alert("Lỗi", "Đã xảy ra lỗi trong quá trình xử lý yêu cầu");
      }
    }
  };

  const goToLogin = () => {
    navigation.goBack("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wingBlank}>
        <Text style={styles.title}>Yêu cầu lấy lại mật khẩu</Text>
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
      </View>
      <AuthButton title="Gửi yêu cầu" onPress={handleForgotPassword} />
      <AuthButton title="Đăng nhập" onPress={goToLogin} />
    </View>
  );
};

export default RePassword;
