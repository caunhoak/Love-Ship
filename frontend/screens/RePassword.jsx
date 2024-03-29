// // ForgotPasswordScreen.js
// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput, Text } from 'react-native';
// import AuthButton from '../components/AuthButton';

// const ForgotPasswordScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');

//   const handlePasswordReset = () => {
//     // Xử lý gửi email để lấy lại mật khẩu
//     console.log('Gửi email để lấy lại mật khẩu cho:', email);
//     // Sau khi xử lý xong, quay lại màn hình đăng nhập
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Nhập địa chỉ email để lấy lại mật khẩu</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={text => setEmail(text)}
//         value={email}
//         placeholder="Địa chỉ email"
//       />
//       <AuthButton title="Gửi yêu cầu" onPress={handlePasswordReset} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//     width: '80%',
//   },
// });

// export default ForgotPasswordScreen;

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../components/StyleSheet";
import AuthButton from "../components/AuthButton";

const RePassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Xử lý logic quên mật khẩu ở đây
    console.log("Gửi email để lấy lại mật khẩu cho:", email);
  };

  const goToLogin = () => {
    navigation.navigate("Đăng nhập");
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
    </View>
  );
};

export default RePassword;
