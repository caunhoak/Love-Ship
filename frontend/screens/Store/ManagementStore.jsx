import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ManagementStore = ({ route }) => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const navigation = useNavigation();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const { storeId } = route.params;

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
    navigation.navigate("StoreOwner", {
      storeId: route.params.storeId,
    });
  };

  const handleProductUpdate = () => {
    navigation.navigate("UpdateStore", {
      storeId: route.params.storeId,
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
            <Text>Tên cửa hàng: {store.name}</Text>
            <Text>Địa chỉ: {store.address}</Text>
            <Text>Số điện thoại: {store.phone}</Text>
          </View>
          <Button
            title="Chỉnh sửa cửa hàng"
            onPress={handleProductUpdate}
            style={styles.editButton}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Xem cửa hàng"
          onPress={handleProductManagement}
          style={styles.viewButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  },
  storeDetails: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  editButton: {
    borderRadius: 30,
    marginTop: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
  },
  viewButton: {
    borderRadius: 30,
  },
});

export default ManagementStore;
