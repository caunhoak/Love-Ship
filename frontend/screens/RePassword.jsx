import React from 'react';
import { View, Text } from 'react-native';
import { Button, InputItem, List, WhiteSpace, WingBlank, Provider } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../components/StyleSheet';

const RePassword = ({ navigation }) => {
  const handleForgotPassword = () => {
    // Xử lý logic quên mật khẩu ở đây
    console.log('Quên mật khẩu');
  };

  const goToLogin = () => {
    navigation.navigate('Đăng nhập');
  };

  return (
    <Provider>
      <View style={styles.container}>
        <WingBlank>
          <Text style={styles.title}>Lấy lại mật khẩu</Text>
          <List>
            <InputItem placeholder="Email" labelNumber={2}>
              <Icon style={styles.icon} name="mail" />
            </InputItem>
          </List>
          <WhiteSpace size="lg" />
          <Button type="primary" onPress={handleForgotPassword}>Gửi yêu cầu</Button>
          <WhiteSpace />
          <Button onPress={goToLogin}>Đăng nhập</Button>
        </WingBlank>
      </View>
    </Provider>
  );
};

export default RePassword;