import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ManagementStore = ({ route }) => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const navigation = useNavigation();
  const { storeId } = useContext(CartContext);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`${urlLocalHost}/store/${storeId}`);
        setStore(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStore();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchStore();
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleProductManagement = () => {
    navigation.navigate("StoreOwner");
  };

  const handleProductUpdate = () => {
    navigation.navigate("UpdateStore", {
      storeId: storeId,
    });
  };

  return (
    <View style={styles.container}>
      {store && (
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeHeader}>Thông tin cửa hàng</Text>
          <Image
            source={{ uri: `${urlLocalHost}/api/stores/${store._id}/image` }}
            style={styles.storeImage}
          />
          <View style={styles.storeDetails}>
            <Text style={styles.storeText}>Tên cửa hàng: {store.name}</Text>
            <Text style={styles.storeText}>Địa chỉ: {store.address}</Text>
            <Text style={styles.storeText}>Số điện thoại: {store.phone}</Text>
          </View>
          <TouchableOpacity
            onPress={handleProductUpdate}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Chỉnh sửa cửa hàng</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={handleProductManagement}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Xem cửa hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  storeInfoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  storeHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  storeImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  storeDetails: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  storeText: {
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#0069d9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: "#0069d9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ManagementStore;
