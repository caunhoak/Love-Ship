import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ForgotPasswordScreen from "./screens/RePassword";
import AdminScreen from "./screens/AdminScreen";
import ResetPassword from "./screens/ResetPassword";
// import StoreScreen from "./screens/StoreScreen";
// import CustomerScreen from "./screens/CustomerScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Đăng nhập" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Đăng ký" }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: "Quên mật khẩu" }}
        />
        <Stack.Screen
          name="AccountLogin"
          component={AdminScreen}
          options={{ title: "Admin" }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ title: "Lấy lại mật khẩu" }}
        />
        {/* <Stack.Screen
          name="CustomerScreen"
          component={CustomerScreen}
          options={{ title: "Khách hàng" }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
