import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import TextInputField from '../components/TextInputField';
import AuthButton from '../components/AuthButton';
import { Picker } from '@react-native-picker/picker'; // Import Picker từ @react-native-picker/picker

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user'); // Mặc định là người dùng

  const handleSignUp = () => {
    let isValid = true;

    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
      isValid = false;
    }

    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialChars.test(password)) {
      Alert.alert('Lỗi', 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.');
      isValid = false;
    }

    if (password !== rePassword) {
      Alert.alert('Lỗi', 'Xác nhận mật khẩu không khớp.');
      isValid = false;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(mail)) {
      Alert.alert('Lỗi', 'Email không hợp lệ.');
      isValid = false;
    }

    if (isValid) {
      console.log('Đăng ký với vai trò:', role); // In vai trò đã chọn vào console
      // Thêm xử lý đăng ký ở đây
    }
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
      {/* Picker cho vai trò */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue, itemIndex) =>
            setRole(itemValue)
          }>
          <Picker.Item label="Người dùng" value="user" />
          <Picker.Item label="Quản lý cửa hàng" value="store_owner" />
        </Picker>
      </View>

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
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 20,
  },
});

export default SignUpScreen;