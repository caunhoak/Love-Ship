import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ManagementStore = ({ route }) => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const navigation = useNavigation();
  const [store, setStore] = useState(null); // Lưu thông tin cửa hàng thay vì danh sách sản phẩm

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const { storeId } = route.params;

        const response = await axios.get(`${urlLocalHost}/store/${storeId}`); // Sử dụng endpoint mới
        setStore(response.data); // Lưu thông tin của cửa hàng
      } catch (error) {
        console.error(error);
      }
    };

    fetchStore(); // Gọi hàm fetchStore ngay khi component được mount

    const unsubscribe = navigation.addListener("focus", () => {
      fetchStore(); // Gọi hàm fetchStore khi màn hình được focus
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleProductManagement = () => {
    navigation.navigate("StoreOwner", {
      storeId: route.params.storeId,
    });
  };

  //   const handleProductManagement = () => {
  //     navigation.navigate("StoreOwner", {
  //       screen: "Sản phẩm",
  //       params: { storeId: route.params.storeId },
  //     });
  //   };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {store && (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Thông tin cửa hàng
          </Text>
          <Text>Tên cửa hàng: {store.name}</Text>
          <Text>Địa chỉ: {store.address}</Text>
          <Text>Số điện thoại: {store.phone}</Text>
          <Text>Logo:</Text>
          <Image
            source={{ uri: `${urlLocalHost}/api/stores/${store._id}/image` }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      )}

      <TouchableOpacity onPress={handleProductManagement}>
        <View
          style={{ backgroundColor: "blue", padding: 16, alignItems: "center" }}
        >
          <Text style={{ color: "white" }}>Xem cửa hàng</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ManagementStore;
