import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPriceForAllItems, setTotalPriceForAllItems] = useState(0); // Initialize total price for all items
  const { cartId } = useContext(CartContext);

  useEffect(() => {
    fetchCartItems(cartId);
  }, [cartId]);

  const fetchCartItems = async (cartId) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_LOCALHOST}/api/cartItem/items/${cartId}`
      );
      const items = response.data.cartItems;

      // Calculate total price for all items
      let totalPrice = 0;
      items.forEach((item) => {
        totalPrice += item.total_price;
      });
      setTotalPriceForAllItems(totalPrice);

      setCartItems(items);
    } catch (error) {
      // console.error("Error fetching cart items:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.product_name}</Text>
            <Text>Số lượng: {item.quantity}</Text>
            <Text>Thành tiền: {item.total_price}</Text>
          </View>
        )}
      />
      {totalPriceForAllItems !== 0 && (
        <Text style={styles.totalPrice}>Tổng giá: {totalPriceForAllItems}</Text>
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
  },
  cartItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0069d9",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
});

export default CartScreen;
