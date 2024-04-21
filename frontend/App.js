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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="AdminScreen" component={AdminScreen} />
          <Stack.Screen name="CustomerScreen" component={CustomerScreen} />
          <Stack.Screen
            name="RegisterStoreScreen"
            component={RegisterStoreScreen}
          />
          <Stack.Screen name="StoreScreen" component={StoreScreen} />
          <Stack.Screen name="StoreOwner" component={StoreOwner} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="EditUser" component={EditUser} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen
            name="EditProductScreen"
            component={EditProductScreen}
          />
          <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
          <Stack.Screen
            name="ProductManagementScreen"
            component={ProductManagementScreen}
          />
          <Stack.Screen name="ManagementStore" component={ManagementStore} />
          <Stack.Screen name="UpdateStore" component={UpdateStore} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;
