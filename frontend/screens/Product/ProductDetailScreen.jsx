import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";

const ProductDetailScreen = ({ route }) => {
  const { storeId, productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.39:3000/stores/${storeId}/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [storeId, productId]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `http://192.168.1.39:3000/api/products/${product._id}/image`,
        }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Price: {product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      {/* Add more product details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: "50%",
    marginBottom: 10,
  },
  productName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  productDescription: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProductDetailScreen;
