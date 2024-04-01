// import React, { useState } from 'react';
// import { View, StyleSheet, Alert } from 'react-native';
// import TextInputField from '../components/TextInputField';
// import AuthButton from '../components/AuthButton';
// import { Picker } from '@react-native-picker/picker'; // Import Picker từ @react-native-picker/picker

// const SignUpScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rePassword, setRePassword] = useState('');
//   const [mail, setMail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [role, setRole] = useState('user'); // Mặc định là người dùng

//   const handleSignUp = () => {
//     let isValid = true;

//     if (password.length < 6) {
//       Alert.alert('Lỗi', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
//       isValid = false;
//     }

//     const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//     if (!specialChars.test(password)) {
//       Alert.alert('Lỗi', 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.');
//       isValid = false;
//     }

//     if (password !== rePassword) {
//       Alert.alert('Lỗi', 'Xác nhận mật khẩu không khớp.');
//       isValid = false;
//     }

//     const emailPattern = /\S+@\S+\.\S+/;
//     if (!emailPattern.test(mail)) {
//       Alert.alert('Lỗi', 'Email không hợp lệ.');
//       isValid = false;
//     }

//     if (isValid) {
//       console.log('Đăng ký với vai trò:', role); // In vai trò đã chọn vào console
//       // Thêm xử lý đăng ký ở đây
//     }
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
//       <TextInputField
//         placeholder="Xác nhận lại mật khẩu"
//         secureTextEntry={true}
//         onChangeText={text => setRePassword(text)}
//         value={rePassword}
//       />
//       <TextInputField
//         placeholder="Email"
//         keyboardType="email-address"
//         autoCapitalizeType="none"
//         onChangeText={text => setMail(text)}
//         value={mail}
//       />
//       <TextInputField
//         placeholder="Số điện thoại"
//         keyboardType="numeric"
//         onChangeText={text => setPhone(text)}
//         value={phone}
//       />
//       {/* Picker cho vai trò */}
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={role}
//           onValueChange={(itemValue, itemIndex) =>
//             setRole(itemValue)
//           }>
//           <Picker.Item label="Người dùng" value="user" />
//           <Picker.Item label="Quản lý cửa hàng" value="store_owner" />
//         </Picker>
//       </View>

//       <AuthButton title="Đăng ký" onPress={handleSignUp} />
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
//     borderRadius: 5,
//     borderColor: '#ccc',
//     width: '80%',
//     marginBottom: 20,
//   },
// });

// export default SignUpScreen;

import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import AuthButton from "../components/AuthButton";
import styles from "../components/StyleSheet";

const Register = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");

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
        "http://192.168.1.39:3000/api/auth/login",
        {
          username: username,
          email: email,
          phone: phone,
          password: password,
          role: role,
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
    <View style={styles.container}>
      <View style={styles.wingBlank}>
        <Text style={styles.title}>Đăng ký</Text>
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
        <TouchableOpacity style={styles.viewPicker}>
          <Picker
            selectedValue={role}
            style={{ width: "100%" }}
            onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
          >
            <Picker.Item label="Vai trò: Khách hàng" value="customer" />
            <Picker.Item
              label="Vai trò: Quản lý cửa hàng"
              value="store_owner"
            />
          </Picker>
        </TouchableOpacity>
      </View>
      <AuthButton title="Đăng ký" onPress={handleRegister} />
      <AuthButton
        title="Đăng nhập"
        onPress={() => navigation.goBack("Login")}
      />
    </View>
  );
};

export default Register;
