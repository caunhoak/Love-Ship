import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CartContext } from "../../api/CartContext";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const OrderCustomerScreen = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useContext(CartContext);
  console.log(userId);

  const fetchOrdersByUserId = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_LOCALHOST}/api/order/user/${userId}`
      );

      // Sort the orders by the latest order date
      const sortedOrders = response.data.orders.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setOrders(sortedOrders);
    } catch (error) {
      // Handle error
    }
  };

  // Call fetchOrdersByUserId on initial render and when the screen is focused
  useEffect(() => {
    fetchOrdersByUserId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrdersByUserId();
    }, [])
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Mã đơn hàng: {item._id}</Text>
      <Text style={styles.orderDate}>Ngày đặt hàng: {item.created_at}</Text>
      <Text style={styles.orderPrice}>Tổng tiền: {item.total_price}</Text>
      <Text style={styles.orderStatus}>Trạng thái: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách đơn hàng</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
  },
  orderId: {
    fontWeight: "bold",
  },
  orderDate: {
    marginTop: 8,
  },
  orderPrice: {
    marginTop: 8,
  },
  orderStatus: {
    marginTop: 8,
  },
});

export default OrderCustomerScreen;
