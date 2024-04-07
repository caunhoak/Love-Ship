import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ShoppingHome from "./ShoppingHome";
import OrdersScreen from "../Order/OrdersScreen";
import ChatScreen from "../Chat/ChatScreen";
import AccountScreen from "../Account/AccountScreen";

const Tab = createBottomTabNavigator();

const Customer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#C0C0C0",
          display: "flex",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={ShoppingHome}
        options={{ headerShown: false }} // Ẩn thanh header cho màn hình Home
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ headerShown: false }} // Ẩn thanh header cho màn hình Orders
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }} // Ẩn thanh header cho màn hình Chat
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Customer;
