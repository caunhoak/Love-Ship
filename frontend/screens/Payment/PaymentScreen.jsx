import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import axios from "axios";
import { CartContext } from "../../api/CartContext";

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);
  const { orderId, userId } = useContext(CartContext);
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST; // Thay YOUR_BACKEND_URL bằng URL của backend của bạn

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20 }}>Payment Screen</Text>
      <Button
        title="Pay with PayPal"
        onPress={createPaypalPayment}
        disabled={loading}
      />
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </View>
  );
};

export default PaymentScreen;
