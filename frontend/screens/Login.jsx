import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, InputItem, List, WhiteSpace, WingBlank, Provider } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../components/StyleSheet';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây
    console.log('Đăng nhập');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToRegister = () => {
    navigation.navigate('Đăng ký');
  };

  const goToRePassword = () => {
    navigation.navigate('Lấy lại mật khẩu');
  };

  return (
    <Provider>
      <View style={styles.container}>
        <WingBlank>
        <Text style={styles.title}>Đăng nhập</Text>
          <List style={styles.listInputItem}>
            <InputItem 
              placeholder="Username"
              labelNumber={2}
              value={username}
              onChange={(value) => setUsername(value)}
            >
              <Icon name="user" style={styles.icon}/>
            </InputItem>
          </List>
          <List style={styles.listInputItem}>
            <InputItem 
              placeholder="Mật khẩu"
              labelNumber={2}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(value) => setPassword(value)}
              extra={<Icon style={styles.icon} name={showPassword ? 'eye' : 'eyeo'} onPress={toggleShowPassword} />}
            >
              <Icon style={styles.icon} name="lock" />
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onPress={handleLogin}>Đăng nhập</Button>
          <WhiteSpace />
          <Button onPress={goToRePassword}>Quên mật khẩu</Button>
          <WhiteSpace />
          <Button onPress={goToRegister}>Đăng ký</Button>
        </WingBlank>
      </View>
    </Provider>
  );
};

export default Login;