import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import UpdateOrderStatus from "../../Order/UpdateOrderStatus";
import ChatScreen from "../../Chat/ChatScreen";

const Tab = createBottomTabNavigator();

const StoreComponentScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Chat") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline"; // Thay đổi icon cho mục "ChatScreen"
          } else if (route.name === "Cập nhật đơn hàng") {
            iconName = focused ? "create" : "create-outline"; // Thay đổi icon cho mục "UpdateOrderStatus"
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
        name="Cập nhật đơn hàng"
        component={UpdateOrderStatus}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default StoreComponentScreen;
