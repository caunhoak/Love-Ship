import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import axios from "axios";

const ProductDetailScreen = ({ route }) => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const { storeId, productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${urlLocalHost}/stores/${storeId}/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false); // Mark data as loaded
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [storeId, productId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${urlLocalHost}/api/products/${product._id}/image`,
        }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Price: {product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
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
  productImage: {
    width: "100%",
    height: "50%",
    marginBottom: 10,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ProductDetailScreen;
