import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ProductManagementScreen = () => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // State to indicate loading
  const { storeId } = useContext(CartContext);

  const fetchProducts = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(`${urlLocalHost}/stores/${storeId}`);
      const { products } = response.data;
      setProducts(products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
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
      await axios.delete(`${urlLocalHost}/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <Image
          source={{ uri: `${urlLocalHost}/api/products/${item._id}/image` }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleEditProduct(item._id)}>
          <Text style={[styles.button, styles.editButton]}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteProduct(item._id)}>
          <Text style={[styles.button, styles.deleteButton]}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    navigation.navigate("Thêm sản phẩm");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? ( // Display loading indicator if loading is true
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id}
        />
      )}
      <TouchableOpacity onPress={handleAddProduct}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  productDetails: {},
  productName: {
    fontWeight: "bold",
  },
  productPrice: {},
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  editButton: {
    backgroundColor: "green",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
  },
  addButton: {
    backgroundColor: "blue",
    padding: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
  },
});

export default ProductManagementScreen;
