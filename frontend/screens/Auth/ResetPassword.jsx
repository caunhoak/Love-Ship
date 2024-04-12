import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../../components/StyleSheet";
import AuthButton from "../../components/AuthButton";
import axios from "axios"; // Import axios for making HTTP requests

const ResetPassword = ({ navigation }) => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    // Kiểm tra resetToken và newPassword trước khi thực hiện reset mật khẩu
    if (!resetToken || !newPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      // Gửi yêu cầu reset mật khẩu
      const response = await axios.post(
        `${urlLocalHost}/api/auth/reset-password`,
        {
          resetToken,
          newPassword,
        }
      );

      // Hiển thị thông báo và chuyển về trang đăng nhập nếu reset mật khẩu thành công
      Alert.alert("Thành công", response.data.message);
      navigation.navigate("Login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Nếu resetToken không hợp lệ hoặc đã hết hạn
        Alert.alert("Lỗi", "Mã reset không hợp lệ hoặc đã hết hạn");
      } else {
        // Xử lý các lỗi khác
        console.error("Lỗi:", error);
        Alert.alert("Lỗi", "Đã xảy ra lỗi trong quá trình đặt lại mật khẩu");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wingBlank}>
        <Text style={styles.title}>Đặt lại mật khẩu</Text>
        <View style={styles.viewInputContainer}>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Token reset"
              value={resetToken}
              onChangeText={(value) => setResetToken(value)}
            />
          </View>
        </View>
        <View style={styles.viewInputContainer}>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu mới"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(value) => setNewPassword(value)}
            />
          </View>
        </View>
      </View>
      <AuthButton title="Đặt lại mật khẩu" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;
