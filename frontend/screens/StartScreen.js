// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import { NavigationContainer } from "@react-navigation/native";
// import { View, Image } from "react-native";
// import styles from "../components/StyleSheet";
// import Login from "./Login";
// import Register from "./Register";
// import RePassword from "./RePassword";
// import AccountLogin from "../navigation/AccountLogin";

// const Tab = createBottomTabNavigator();

// const StartScreen = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === "Đăng nhập") {
//               iconName = "log-in";
//             } else if (route.name === "Đăng ký") {
//               iconName = "person-add";
//             } else if (route.name === "Lấy lại mật khẩu") {
//               iconName = "lock-closed";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarInactiveTintColor="gray"
//         tabBarActiveTintColor="tomato"
//       >
//         <Tab.Screen
//           name="Đăng nhập"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="Đăng ký"
//           component={Register}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="Lấy lại mật khẩu"
//           component={RePassword}
//           options={{ headerShown: false }}
//         />
//       </Tab.Navigator>
//       <View style={styles.logoContainer}>
//         <Image source={require("../images/anhavt.jpg")} style={styles.logo} />
//       </View>
//     </NavigationContainer>
//   );
// };

// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import { NavigationContainer } from "@react-navigation/native";
// import { View, Image } from "react-native";
// import styles from "../components/StyleSheet";
// import Login from "./Login";
// import Register from "./Register";
// import RePassword from "./RePassword";
// import AccountLogin from "../navigation/AccountLogin";
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const StartScreen = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === "Đăng nhập") {
//               iconName = "log-in";
//             } else if (route.name === "Đăng ký") {
//               iconName = "person-add";
//             } else if (route.name === "Lấy lại mật khẩu") {
//               iconName = "lock-closed";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarInactiveTintColor="gray"
//         tabBarActiveTintColor="tomato"
//       >
//         <Tab.Screen
//           name="Đăng nhập"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="Đăng ký"
//           component={Register}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="Lấy lại mật khẩu"
//           component={RePassword}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="AccountLogin"
//           component={StackScreen} // Use StackNavigator for AccountLogin
//           options={{ headerShown: false }}
//         />
//       </Tab.Navigator>
//       <View style={styles.logoContainer}>
//         <Image source={require("../images/anhavt.jpg")} style={styles.logo} />
//       </View>
//     </NavigationContainer>
//   );
// };

// // Create a new Stack Navigator screen for Login and Register
// const StackScreen = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="AccountLogin"
//         component={AccountLogin}
//         options={{ headerShown: false }}
//       />
//       {/* Add other screens for Login and Register if needed */}
//     </Stack.Navigator>
//   );
// };

// export default StartScreen;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { View, Image } from "react-native";
import styles from "../components/StyleSheet";
import Login from "./Login";
import Register from "./Register";
import RePassword from "./RePassword";
import AccountLogin from "../navigation/AccountLogin";

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
            } else if (route.name === "AccountLogin") {
              // Add icon for AccountLogin screen
              iconName = "person"; // Change to appropriate icon
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
        <Tab.Screen
          name="AccountLogin"
          component={AccountLogin}
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
