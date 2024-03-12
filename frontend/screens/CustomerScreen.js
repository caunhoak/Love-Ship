// CustomerScreen.js
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from '@react-navigation/native';

// Import các màn hình
import ShoppingScreen from '../screens/ShoppingScreen';
import OrderScreen from '../screens/OrderScreen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderManagementScreen from '../screens/OrderManagementScreen';
import AccountManagementScreen from '../screens/AccountManagementScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createMaterialBottomTabNavigator();

const CustomerScreen = () => {
  const { colors } = useTheme(); // Sử dụng useTheme để lấy màu nền của giao diện

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#808080' }} // Sử dụng màu chính của giao diện
      activeColor="#00FFFF" // Màu chữ khi tab được chọn
      inactiveColor="white" // Màu chữ khi tab không được chọn
    >
      <Tab.Screen name="Mua sắm" component={ShoppingScreen} />
      <Tab.Screen name="Đặt hàng" component={OrderScreen} />
      <Tab.Screen name="Thanh toán" component={PaymentScreen} />
      <Tab.Screen name="Quản lý đơn hàng" component={OrderManagementScreen} />
      <Tab.Screen name="Quản lý tài khoản" component={AccountManagementScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default CustomerScreen;