import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductManagementScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const storeId = await AsyncStorage.getItem("storeId");

      const response = await axios.get(
        `http://10.25.82.74:3000/stores/${storeId}`
      );
      const { products } = response.data; // Trích xuất danh sách sản phẩm từ response.data
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const handleEditProduct = (productId) => {
    navigation.navigate("EditProductScreen", { productId });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://10.25.82.74:3000/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const renderProductItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{
            uri: `http://10.25.82.74:3000/api/products/${item._id}/image`,
          }}
          style={{ width: 50, height: 50, marginRight: 16 }}
        />
        <View>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => handleEditProduct(item._id)}>
          <Text style={{ marginRight: 16, color: "green" }}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteProduct(item._id)}>
          <Text style={{ color: "red" }}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 16,
          padding: 10,
        }}
        placeholder="Tìm kiếm sản phẩm"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
      />
      <TouchableOpacity onPress={() => navigation.navigate("AddProductScreen")}>
        <View
          style={{ backgroundColor: "blue", padding: 16, alignItems: "center" }}
        >
          <Text style={{ color: "white" }}>Thêm sản phẩm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductManagementScreen;
