import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import AdminScreen from './screens/AdminScreen';
import StoreScreen from './screens/StoreScreen';
import CustomerScreen from './screens/CustomerScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ title: 'Start' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Đăng nhập' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Đăng ký' }} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Quên mật khẩu' }}
        />
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ title: 'Admin' }} />
        <Stack.Screen name="StoreScreen" component={StoreScreen} options={{ title: 'Quản lý cửa hàng' }} />
        <Stack.Screen name="CustomerScreen" component={CustomerScreen} options={{ title: 'Khách hàng' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;