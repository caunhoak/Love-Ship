import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const OrderCustomerScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { userId, setOrderId, setStoreId } = useContext(CartContext);
  const { navigate } = useNavigation();

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
      setLoading(false); // Hide loading indicator
      setFilteredOrders(sortedOrders); // Initialize filtered orders
    } catch (error) {
      // Handle error
      setLoading(false); // Hide loading indicator
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

  const filterOrders = (status) => {
    if (status === "Other") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  const handleOrderPress = (orderId) => {
    setOrderId(orderId);
    // navigate("PaymentScreen");

    setStoreId(orders.find((order) => order._id === orderId).store_id);
    navigate("ChatScreen");
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleOrderPress(item._id)}
      style={[
        styles.orderItem,
        {
          backgroundColor:
            item.status === "Pending"
              ? "#C1E1C1"
              : item.status === "Canceled"
              ? "#FFC0CB"
              : "#FFFFFF",
        },
      ]}
    >
      <Text style={styles.orderId}>Mã đơn hàng: {item._id}</Text>
      <Text style={styles.orderDate}>Ngày đặt hàng: {item.created_at}</Text>
      <Text style={styles.orderPrice}>Tổng tiền: {item.total_price}</Text>
      <Text style={styles.orderStatus}>Trạng thái: {item.status}</Text>
      <Text style={styles.orderStatus}>Trạng thái: {item.store_id}</Text>
    </TouchableOpacity>
  );

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      <TouchableOpacity
        style={styles.legendItem}
        onPress={() => filterOrders("Pending")}
      >
        <View style={[styles.legendColor, { backgroundColor: "#C1E1C1" }]} />
        <Text style={styles.legendText}>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.legendItem}
        onPress={() => filterOrders("Canceled")}
      >
        <View style={[styles.legendColor, { backgroundColor: "#FFC0CB" }]} />
        <Text style={styles.legendText}>Canceled</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.legendItem}
        onPress={() => filterOrders("Other")}
      >
        <View style={[styles.legendColor, { backgroundColor: "#FFFFFF" }]} />
        <Text style={styles.legendText}>Other</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0069d9" /> // Show loading indicator
      ) : orders.length === 0 ? (
        <Text style={styles.orderNotFound}>Order not found</Text>
      ) : (
        <>
          {renderLegend()}
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item._id}
            renderItem={renderOrderItem}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderNotFound: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
  },
});

export default OrderCustomerScreen;
