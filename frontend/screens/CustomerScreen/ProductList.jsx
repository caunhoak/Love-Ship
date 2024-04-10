import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const route = useRoute(); // Sử dụng hook useRoute để truy cập vào route
  const { storeId } = route.params; // Lấy storeId từ route params

  const { goBack, navigate } = useNavigation();

  useEffect(() => {
    fetchProducts(storeId); // Sử dụng storeId để fetch sản phẩm từ cửa hàng tương ứng
  }, [storeId]); // Fetch lại sản phẩm khi storeId thay đổi

  const fetchProducts = async (storeId) => {
    try {
      const response = await axios.get(
        `http://10.25.82.74:3000/stores/${storeId}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateCartAndQuantities = (updatedCart, updatedQuantities) => {
    setCart(updatedCart);
    setProductQuantities(updatedQuantities);
  };

  const increaseQuantity = (productId) => {
    const updatedQuantities = {
      ...productQuantities,
      [productId]: (productQuantities[productId] || 0) + 1,
    };
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: updatedQuantities[productId] }
        : item
    );
    updateCartAndQuantities(updatedCart, updatedQuantities);
  };

  const decreaseQuantity = (productId) => {
    const updatedQuantities = {
      ...productQuantities,
      [productId]: Math.max((productQuantities[productId] || 0) - 1, 0),
    };
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: updatedQuantities[productId] }
        : item
    );
    updateCartAndQuantities(updatedCart, updatedQuantities);
  };

  const handleCartOrder = () => {
    console.log("Order");
  };

  const handleDetailProducts = (productId) => {
    // Chuyển hướng sang trang chi tiết sản phẩm và truyền storeId và productId
    navigate("ProductDetail", { storeId, productId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            /* Xử lý khi nhấn vào icon back */
            goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <MaterialIcons name="search" size={24} color="black" />
        </View>
        <TouchableOpacity onPress={handleCartOrder}>
          <MaterialIcons name="shopping-cart" size={24} color="black" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {Object.values(productQuantities).reduce(
                (total, quantity) => total + quantity,
                0
              )}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image
              source={{
                uri: `http://10.25.82.74:3000/api/products/${item._id}/image`,
              }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>Giá: {item.price}</Text>
              <View style={styles.quantityButtons}>
                <TouchableOpacity onPress={() => decreaseQuantity(item._id)}>
                  <MaterialIcons name="remove" size={24} color="black" />
                </TouchableOpacity>
                <Text>{productQuantities[item._id] || 0}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item._id)}>
                  <MaterialIcons name="add" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => handleDetailProducts(item._id)}
            >
              <Text style={styles.detailButtonText}>Chi tiết sản phẩm</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleCartOrder}>
        <Text style={styles.touchInput}>Đi đến giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "3%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: "3%",
    margin: "3%",
    flex: 1,
  },
  searchInput: {
    flex: 1,
  },
  cartBadge: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: "absolute",
    top: -5,
    right: -5,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
  },
  productItem: {
    flexDirection: "row",
    marginBottom: "10%",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#0069d9",
    padding: 10,
    borderRadius: 10,
  },
  touchInput: {
    textAlign: "center",
    color: "white",
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailButton: {
    backgroundColor: "green",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  detailButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductListScreen;
