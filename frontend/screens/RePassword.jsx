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

const RePassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Xử lý logic quên mật khẩu ở đây
    console.log("Quên mật khẩu");
  };

  const goToLogin = () => {
    navigation.navigate("Đăng nhập");
  };

  return (
    <Provider>
      <View style={styles.container}>
        <WingBlank style={styles.wingBlank}>
          <Text style={styles.title}>Lấy lại mật khẩu</Text>
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
          <WhiteSpace size="lg" />
          <Button
            type="primary"
            style={styles.button}
            onPress={handleForgotPassword}
          >
            Gửi yêu cầu
          </Button>
        </WingBlank>
      </View>
    </Provider>
  );
};

export default RePassword;
