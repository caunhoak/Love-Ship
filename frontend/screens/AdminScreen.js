// AdminScreen.js
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "@react-navigation/native";

// Import các màn hình
import UserManagementScreen from "../screens/UserManagementScreen";
import StoreManagementScreen from "../screens/StoreManagementScreen";
import AdminAccountManagementScreen from "../screens/AdminAccountManagementScreen";

const Tab = createMaterialBottomTabNavigator();

const AdminScreen = () => {
  const { colors } = useTheme(); // Sử dụng useTheme để lấy màu nền của giao diện

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#808080" }} // Sử dụng màu chính của giao diện
      activeColor="#00FFFF" // Màu chữ khi tab được chọn
      inactiveColor="white" // Màu chữ khi tab không được chọn
    >
      <Tab.Screen name="Quản lý người dùng" component={UserManagementScreen} />
      <Tab.Screen name="Quản lý cửa hàng" component={StoreManagementScreen} />
      <Tab.Screen
        name="Quản lý tài khoản admin"
        component={AdminAccountManagementScreen}
      />
    </Tab.Navigator>
  );
};

export default AdminScreen;
