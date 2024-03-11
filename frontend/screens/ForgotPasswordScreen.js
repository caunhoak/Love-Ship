// ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import AuthButton from '../components/AuthButton';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    // Xử lý gửi email để lấy lại mật khẩu
    console.log('Gửi email để lấy lại mật khẩu cho:', email);
    // Sau khi xử lý xong, quay lại màn hình đăng nhập
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập địa chỉ email để lấy lại mật khẩu</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Địa chỉ email"
      />
      <AuthButton title="Gửi yêu cầu" onPress={handlePasswordReset} />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '80%',
  },
});

export default ForgotPasswordScreen;