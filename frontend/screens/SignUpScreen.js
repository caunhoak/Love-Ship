import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native'; // Thêm Alert từ react-native
import TextInputField from '../components/TextInputField';
import AuthButton from '../components/AuthButton';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = () => {
    let isValid = true;
  
    // Kiểm tra mật khẩu có đủ 6 ký tự không
    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
      isValid = false;
    }
  
    // Kiểm tra mật khẩu có chứa ký tự đặc biệt không
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialChars.test(password)) {
      Alert.alert('Lỗi', 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.');
      isValid = false;
    }
  
    // Kiểm tra xác nhận mật khẩu
    if (password !== rePassword) {
      Alert.alert('Lỗi', 'Xác nhận mật khẩu không khớp.');
      isValid = false;
    }
  
    // Kiểm tra định dạng email
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(mail)) {
      Alert.alert('Lỗi', 'Email không hợp lệ.');
      isValid = false;
    }
  
    // Nếu tất cả điều kiện đều được đáp ứng, thực hiện đăng ký
    if (isValid) {
      // Thêm xử lý đăng ký ở đây
      console.log('Đăng ký');
    }
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
      <TextInputField
        placeholder="Xác nhận lại mật khẩu"
        secureTextEntry={true}
        onChangeText={text => setRePassword(text)}
        value={rePassword}
      />
      <TextInputField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalizeType="none"
        onChangeText={text => setMail(text)}
        value={mail}
      />
      <TextInputField
        placeholder="Số điện thoại"
        keyboardType="numeric"
        onChangeText={text => setPhone(text)}
        value={phone}
      />
      <AuthButton title="Đăng ký" onPress={handleSignUp} />
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
});

export default SignUpScreen;