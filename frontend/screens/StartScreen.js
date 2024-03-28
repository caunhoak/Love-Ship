import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { View, Image } from "react-native";
import styles from "../components/StyleSheet";
import Login from "./Login";
import Register from "./Register";
import RePassword from "./RePassword";

const Tab = createBottomTabNavigator();

const StartScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Đăng nhập") {
              iconName = "log-in";
            } else if (route.name === "Đăng ký") {
              iconName = "person-add";
            } else if (route.name === "Lấy lại mật khẩu") {
              iconName = "lock-closed";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarInactiveTintColor="gray"
        tabBarActiveTintColor="tomato"
      >
        <Tab.Screen
          name="Đăng nhập"
          component={Login}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Đăng ký"
          component={Register}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Lấy lại mật khẩu"
          component={RePassword}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
      <View style={styles.logoContainer}>
        <Image source={require("../images/anhavt.jpg")} style={styles.logo} />
      </View>
    </NavigationContainer>
  );
};

export default StartScreen;
