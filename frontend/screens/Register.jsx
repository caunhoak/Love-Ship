import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, InputItem, WhiteSpace, WingBlank, Provider, Picker, List } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../components/StyleSheet';
// import customStyles from '../components/customStyles';
// import en_US from '../locales/en_US';

const Register = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState([]);

  const handleRegister = () => {
    // Xử lý logic đăng ký ở đây
    console.log('Đăng ký');
  };

  const goToLogin = () => {
    navigation.navigate('Đăng nhập');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <WingBlank>
          <Text style={styles.title}>Đăng ký</Text>
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
              placeholder="Email" 
              labelNumber={2}
              value={email}
              onChange={(value) => setEmail(value)}
            >
              <Icon name="mail" style={styles.icon}/>
            </InputItem>
          </List>
          <List style={styles.listInputItem}>
            <InputItem 
              placeholder="Phone" 
              labelNumber={2}
              value={phone}
              onChange={(value) => setPhone(value)}
            >
              <Icon name="phone" style={styles.icon}/>
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
              <Icon name="lock" style={styles.icon}/>
            </InputItem>
          </List>
            <Picker 
              data={[
                { value: 'admin', label: 'Admin' },
                { value: 'store_owner', label: 'Store Owner' },
                { value: 'customer', label: 'Customer' },
              ]}
              cols={1}
              value={role}
              onChange={(value) => setRole(value)}
              okText='Ok'
              dismissText='Cancel'
            >
              <List.Item arrow="horizontal">Role</List.Item>
            </Picker>
          <WhiteSpace size="lg" />
          <Button type="primary" onPress={handleRegister}>Đăng ký</Button>
          <WhiteSpace />
          <Button onPress={goToLogin}>Đăng nhập</Button>
        </WingBlank>
      </View>
    </Provider>
  );
};

export default Register;