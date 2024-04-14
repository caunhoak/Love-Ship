import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import RegisterStoreScreen from "./RegisterStoreScreen";
import ManagementStore from "../Store/ManagementStore";

const Tab = createBottomTabNavigator();

const StoreScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Thông tin cửa hàng") {
            iconName = focused ? "storefront" : "storefront-outline";
          } else if (route.name === "Tạo cửa hàng") {
            iconName = focused ? "add-circle" : "add-circle-outline";
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
      <Tab.Screen name="Tạo cửa hàng" component={RegisterStoreScreen} />
      <Tab.Screen name="Thông tin cửa hàng" component={ManagementStore} />
    </Tab.Navigator>
  );
};

export default StoreScreen;
