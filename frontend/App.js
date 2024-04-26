import React from "react";
import { CartProvider } from "./api/CartContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import ForgotPasswordScreen from "./screens/Auth/RePassword";
import AdminScreen from "./screens/Admin/AdminScreen";
import CustomerScreen from "./screens/CustomerScreen/Customer";
import ResetPassword from "./screens/Auth/ResetPassword";
import EditUser from "./screens/Admin/EditUser";
import ProductList from "./screens/Product/ProductList";
import RegisterStoreScreen from "./screens/StoreOwnerScreen/RegisterStoreScreen";
import EditProductScreen from "./screens/Product/EditProductScreen";
import AddProductScreen from "./screens/Product/AddProductScreen";
import StoreOwner from "./screens/StoreOwnerScreen/StoreOwner";
import ProductDetailScreen from "./screens/Product/ProductDetailScreen";
import StoreScreen from "./screens/StoreOwnerScreen/StoreScreen";
import ProductManagementScreen from "./screens/StoreOwnerScreen/ProductManagementScreen";
import ManagementStore from "./screens/Store/ManagementStore";
import UpdateStore from "./screens/Store/UpdateStore";
import CartScreen from "./screens/Cart/CartScreen";
import UpdateOrderStatus from "./screens/Order/UpdateOrderStatus";
import PaymentScreen from "./screens/Payment/PaymentScreen";
import ChatScreen from "./screens/Chat/ChatScreen";
import StoreComponentScreen from "./screens/StoreOwnerScreen/StoreComponent/StoreComponentScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AdminScreen" component={AdminScreen} />
          <Stack.Screen
            name="CustomerScreen"
            component={CustomerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterStoreScreen"
            component={RegisterStoreScreen}
          />
          <Stack.Screen name="StoreScreen" component={StoreScreen} />
          <Stack.Screen
            name="StoreOwner"
            component={StoreOwner}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="EditUser" component={EditUser} />
          <Stack.Screen
            name="ProductList"
            component={ProductList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="EditProductScreen"
            component={EditProductScreen}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Thêm sản phẩm"
            component={AddProductScreen}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="ProductManagementScreen"
            component={ProductManagementScreen}
          />
          <Stack.Screen
            name="ManagementStore"
            component={ManagementStore}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateStore"
            component={UpdateStore}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Giỏ Hàng"
            component={CartScreen}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="UpdateOrderStatus"
            component={UpdateOrderStatus}
          />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="QUẢN LÝ ĐƠN HÀNG"
            component={StoreComponentScreen}
            options={{ headerTitleAlign: "center" }}
          />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;
