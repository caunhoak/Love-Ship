import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import ForgotPasswordScreen from "./screens/Auth/RePassword";
import AdminScreen from "./screens/Admin/AdminScreen";
import CustomerScreen from "./screens/CustomerScreen/Customer";
import ResetPassword from "./screens/Auth/ResetPassword";
import EditUser from "./screens/Admin/EditUser";
// import UserManagementScreen from "./screens/UserManagementScreen";
import ProductList from "./screens/CustomerScreen/ProductList";
// import RegisterStoreScreen from "./screens/StoreOwnerScreen/RegisterStoreScreen";
import EditProductScreen from "./screens/Product/EditProductScreen";
import AddProductScreen from "./screens/Product/AddProductScreen";
import StoreOwner from "./screens/StoreOwnerScreen/StoreOwner";
import ProductDetailScreen from "./screens/Product/ProductDetailScreen";
import StoreScreen from "./screens/StoreOwnerScreen/StoreScreen";

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
          name="AdminScreen"
          component={AdminScreen}
          options={{ title: "Admin" }}
        />
        <Stack.Screen
          name="CustomerScreen"
          component={CustomerScreen}
          options={{ title: "Customer" }}
        />
        {/* <Stack.Screen
          name="StoreScreen"
          component={RegisterStoreScreen}
          options={{ title: "Store" }}
        /> */}
        <Stack.Screen
          name="StoreScreen"
          component={StoreScreen}
          options={{ title: "Store" }}
        />
        <Stack.Screen
          name="StoreOwner"
          component={StoreOwner}
          options={{ title: "Store" }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ title: "Lấy lại mật khẩu" }}
        />
        <Stack.Screen
          name="EditUser"
          component={EditUser}
          options={{ title: "Khách hàng" }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: "Store" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "Chi Tiết sản phẩm" }}
        />
        <Stack.Screen
          name="EditProductScreen"
          component={EditProductScreen}
          options={{ title: "Store" }}
        />
        <Stack.Screen
          name="AddProductScreen"
          component={AddProductScreen}
          options={{ title: "Store" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
