import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductListScreen = () => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const route = useRoute();
  const { storeId, userId } = route.params;
  const { goBack, navigate } = useNavigation();

  useEffect(() => {
    fetchProducts(storeId, userId);
  }, [storeId, userId]);

  const fetchProducts = async (storeId, userId) => {
    try {
      const response = await axios.get(`${urlLocalHost}/stores/${storeId}`, {
        params: { userId },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateCartAndQuantities = (updatedCart, updatedQuantities) => {
    setCart(updatedCart);
    setProductQuantities(updatedQuantities);
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

  const addToCart = (productId) => {
    if (cart.find((item) => item._id === productId)) {
      // Product already exists in cart, update quantity
      const updatedCart = cart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      setProductQuantities({
        ...productQuantities,
        [productId]: (productQuantities[productId] || 0) + 1,
      });
    } else {
      // Product does not exist in cart, add to cart
      const updatedCart = [
        ...cart,
        {
          _id: productId,
          quantity: 1,
        },
      ];
      setCart(updatedCart);
      setProductQuantities({
        ...productQuantities,
        [productId]: 1,
      });
    }
  };

  const handleCartOrder = async () => {
    try {
      const cartId = await createCart(userId, storeId);
      const items = cart.map((item) => ({
        productId: item._id,
        quantity: productQuantities[item._id],
        total_price: item.price * productQuantities[item._id],
      }));
      await createCartItems(cartId, items);
      navigate("CartScreen", { cartId: cartId });
    } catch (error) {
      console.error("Error handling cart order:", error);
    }
  };

  const handleDetailProducts = (productId) => {
    navigate("ProductDetail", { storeId, productId });
  };

  const createCart = async (userId) => {
    try {
      const response = await axios.post(`${urlLocalHost}/api/cart/create`, {
        userId,
        storeId,
      });
      return response.data.cart._id;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  };

  const createCartItems = async (cartId, items) => {
    try {
      await axios.post(`${urlLocalHost}/api/cartItem/createItems`, {
        cartId,
        items,
      });
    } catch (error) {
      // console.error("Error creating cart items:", error);
      // throw error;

      Alert.alert("Bạn chưa thêm sản phẩm nào vào giỏ!!!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
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
                uri: `${urlLocalHost}/api/products/${item._id}/image`,
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
                <TouchableOpacity onPress={() => addToCart(item._id)}>
                  <MaterialIcons name="add" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => handleDetailProducts(item._id)}
            >
              <Text style={styles.detailButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.CartButton}
        onPress={() => handleCartOrder()}
      >
        <Text style={styles.CartButtonText}>Xem giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 8,
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
  CartButton: {
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  CartButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductListScreen;
