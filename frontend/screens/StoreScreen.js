// StoreScreen.js
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from '@react-navigation/native';

// Import các màn hình
import StoreManagementScreen from '../screens/StoreManagementScreen';
import OrderManagementScreen from '../screens/OrderManagementScreen';
import AccountManagementScreen from '../screens/AccountManagementScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createMaterialBottomTabNavigator();

const StoreScreen = () => {
  const { colors } = useTheme(); // Sử dụng useTheme để lấy màu nền của giao diện

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#808080' }} // Sử dụng màu chính của giao diện
      activeColor="#00FFFF" // Màu chữ khi tab được chọn
      inactiveColor="white" // Màu chữ khi tab không được chọn
    >
      <Tab.Screen name="Quản lý cửa hàng" component={StoreManagementScreen} />
      <Tab.Screen name="Quản lý đơn hàng" component={OrderManagementScreen} />
      <Tab.Screen name="Quản lý tài khoản" component={AccountManagementScreen} />
      <Tab.Screen name="Thống kê" component={StatisticsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default StoreScreen;