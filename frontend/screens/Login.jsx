// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import TextInputField from '../components/TextInputField';
// import AuthButton from '../components/AuthButton';
// import { Picker } from '@react-native-picker/picker'; // Import Picker từ @react-native-picker/picker

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('customer'); // Mặc định là khách hàng

//   const handleLogin = () => {
//     // Kiểm tra tên đăng nhập và mật khẩu
//     if (username === 'admin' && password === 'admin@123' && role === 'admin') {
//       navigation.navigate('AdminScreen');
//     } else if (username === 'store_owner' && password === 'store_owner@123' && role === 'store_owner') {
//       navigation.navigate('StoreScreen');
//     } else if (username === 'customer' && password === 'customer@123' && role === 'customer') {
//       navigation.navigate('CustomerScreen');
//     } else {
//       // Xử lý khi thông tin không hợp lệ
//       console.log('Thông tin đăng nhập không hợp lệ');
//     }
//   };

//   const handleForgotPassword = () => {
//     // Chuyển đến màn hình quên mật khẩu
//     navigation.navigate('ForgotPassword');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInputField
//         placeholder="Tên đăng nhập"
//         autoCapitalizeType="none"
//         onChangeText={text => setUsername(text)}
//         value={username}
//       />
//       <TextInputField
//         placeholder="Mật khẩu"
//         secureTextEntry={true}
//         onChangeText={text => setPassword(text)}
//         value={password}
//       />
//       <TouchableOpacity style={styles.pickerContainer} onPress={() => {}}>
//         <Text style={styles.pickerText}>Vai trò: {role}</Text>
//       </TouchableOpacity>
//       <Picker
//         selectedValue={role}
//         style={styles.picker}
//         onValueChange={(itemValue) => setRole(itemValue)}
//       >
//         <Picker.Item label="Khách hàng" value="customer" />
//         <Picker.Item label="Quản lý cửa hàng" value="store_owner" />
//         <Picker.Item label="Admin" value="admin" />
//       </Picker>
//       <AuthButton title="Đăng nhập" onPress={handleLogin} />
//       <TouchableOpacity onPress={handleForgotPassword}>
//         <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
//       </TouchableOpacity>
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
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginBottom: 20,
//   },
//   pickerText: {
//     fontSize: 16,
//   },
//   picker: {
//     height: 50,
//     width: '80%',
//   },
// });

// export default LoginScreen;
import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../components/StyleSheet";
import AuthButton from "../components/AuthButton";
import { CheckBox } from "@rneui/base";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [savedText, setSavedText] = useState("");

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
      Alert.alert("Tên người dùng hoặc mật khẩu không hợp lệ");
    }
  };

  const handleCheckBoxChange = () => {
    setChecked(!checked);
    if (!checked) {
      console.log("Tài khoản: username, Mật khẩu: password");
    } else {
      console.log("rm");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToRegister = () => {
    navigation.navigate("SignUp");
  };

  const goToRePassword = () => {
    navigation.navigate("ForgotPassword");
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
              placeholder="Tên người dùng"
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
            textStyle={{}}
            title="Không lưu mật khẩu"
            // onPress={() => console.log("onPress()")}
            titleProps={{}}
            uncheckedColor="#F00"
          />
          <TouchableOpacity onPress={goToRePassword}>
            <Text style={{ color: "blue" }}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AuthButton title="Đăng nhập" onPress={handleLogin} />
      <AuthButton title="Đăng ký" onPress={goToRegister} />
    </View>
  );
};

export default Login;
