// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TextInputField from '../components/TextInputField';
import AuthButton from '../components/AuthButton';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý đăng nhập ở đây
    console.log('Đăng nhập');
  };

  const handleForgotPassword = () => {
    // Chuyển đến màn hình quên mật khẩu
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder="Tên đăng nhập"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInputField
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
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
  forgotPasswordText: {
    color: 'blue',
    marginTop: 10,
  },
});

export default LoginScreen;