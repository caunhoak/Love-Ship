import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TextInputField from '../components/TextInputField';
import AuthButton from '../components/AuthButton';
import { Picker } from '@react-native-picker/picker'; // Import Picker từ @react-native-picker/picker

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Mặc định là khách hàng

  const handleLogin = () => {
    // Kiểm tra tên đăng nhập và mật khẩu
    if (username === 'admin' && password === 'admin@123' && role === 'admin') {
      navigation.navigate('AdminScreen');
    } else if (username === 'store_owner' && password === 'store_owner@123' && role === 'store_owner') {
      navigation.navigate('StoreScreen');
    } else if (username === 'customer' && password === 'customer@123' && role === 'customer') {
      navigation.navigate('CustomerScreen');
    } else {
      // Xử lý khi thông tin không hợp lệ
      console.log('Thông tin đăng nhập không hợp lệ');
    }
  };

  const handleForgotPassword = () => {
    // Chuyển đến màn hình quên mật khẩu
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder="Tên đăng nhập"
        autoCapitalizeType="none"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInputField
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.pickerContainer} onPress={() => {}}>
        <Text style={styles.pickerText}>Vai trò: {role}</Text>
      </TouchableOpacity>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Khách hàng" value="customer" />
        <Picker.Item label="Quản lý cửa hàng" value="store_owner" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <AuthButton title="Đăng nhập" onPress={handleLogin} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  pickerText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '80%',
  },
});

export default LoginScreen;