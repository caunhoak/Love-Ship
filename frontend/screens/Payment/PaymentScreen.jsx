import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Linking,
} from "react-native";
import axios from "axios";
import { CartContext } from "../../api/CartContext";

const PaymentScreen = () => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const [loading, setLoading] = useState(false);
  const { orderId, userId } = useContext(CartContext);

  const createPaypalPayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${urlLocalHost}/api/payment/createPaypalPayment`,
        {
          orderId: orderId,
          userId: userId,
        }
      );
      const approvalUrl = response.data.approvalUrl;
      // Chuyển hướng người dùng đến trang thanh toán PayPal
      Linking.openURL(approvalUrl);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Screen</Text>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: loading ? "#ccc" : "#007bff" },
        ]}
        onPress={createPaypalPayment}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Processing..." : "Pay with PayPal"}
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
