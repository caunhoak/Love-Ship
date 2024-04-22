import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const UpdateOrderStatus = ({ route }) => {
  const [status, setStatus] = useState("");
  const { orderId } = route.params;
  const { goBack } = useNavigation();

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_LOCALHOST}/api/order/updateStatus`,
        {
          orderId: orderId,
          status: status,
        }
      );
      // Handle success
      Alert.alert("Cập nhật trạng thái đơn hàng thành công");
      goBack();
    } catch (error) {
      // Handle error
      Alert.alert("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật trạng thái đơn hàng</Text>
      <TouchableOpacity
        style={[styles.button, status === "Confirmed" && styles.activeButton]}
        onPress={() => setStatus("Confirmed")}
      >
        <Text
          style={[
            styles.buttonText,
            status === "Confirmed" && styles.activeButtonText,
          ]}
        >
          Confirmed
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, status === "Shipping" && styles.activeButton]}
        onPress={() => setStatus("Shipping")}
      >
        <Text
          style={[
            styles.buttonText,
            status === "Shipping" && styles.activeButtonText,
          ]}
        >
          Shipping
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, status === "Completed" && styles.activeButton]}
        onPress={() => setStatus("Completed")}
      >
        <Text
          style={[
            styles.buttonText,
            status === "Completed" && styles.activeButtonText,
          ]}
        >
          Completed
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, status === "Canceled" && styles.activeButton]}
        onPress={() => setStatus("Canceled")}
      >
        <Text
          style={[
            styles.buttonText,
            status === "Canceled" && styles.activeButtonText,
          ]}
        >
          Canceled
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateStatus}
        disabled={!status} // Disable button if status is not selected
      >
        <Text style={styles.updateButtonText}>Cập nhật trạng thái</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#6fa832", // Green color for active button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activeButtonText: {
    color: "#fff", // White color for active button text
  },
  updateButton: {
    backgroundColor: "#1e90ff", // Blue color for update button
    padding: 15,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
  },
  updateButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default UpdateOrderStatus;
