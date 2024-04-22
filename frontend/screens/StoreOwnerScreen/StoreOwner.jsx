import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ProductManagementScreen from "./ProductManagementScreen";
import OrderManagementScreen from "./OrderManagementScreen";
import StatisticsScreen from "./StatisticsScreen";
import ChatScreen from "./ChatScreen";
import AccountManagementScreen from "./AccountManagementScreen";

const Tab = createBottomTabNavigator();

const StoreOwner = () => {
  // const { storeId } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Sản phẩm") {
            iconName = focused ? "basket" : "basket-outline"; // Icon cho Sản phẩm
          } else if (route.name === "Quản lý Đơn hàng") {
            iconName = focused ? "clipboard" : "clipboard-outline"; // Icon cho Quản lý Đơn hàng
          } else if (route.name === "Thống kê") {
            iconName = focused ? "analytics" : "analytics-outline"; // Icon cho Thống kê
          } else if (route.name === "Trò chuyện") {
            iconName = focused ? "chatbox" : "chatbox-outline"; // Icon cho Trò chuyện
          } else if (route.name === "Quản lý Tài khoản") {
            iconName = focused ? "person" : "person-outline"; // Icon cho Quản lý Tài khoản
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff", // Màu nền của Tab.Navigator
          display: "flex",
        },
      })}
    >
      <Tab.Screen
        name="Sản phẩm"
        component={ProductManagementScreen}
        // initialParams={{ storeId }}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Quản lý Đơn hàng"
        component={OrderManagementScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Thống kê"
        component={StatisticsScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Trò chuyện"
        component={ChatScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Quản lý Tài khoản"
        component={AccountManagementScreen}
        options={{ headerTitleAlign: "center" }}
      />
    </Tab.Navigator>
  );
};

export default StoreOwner;
