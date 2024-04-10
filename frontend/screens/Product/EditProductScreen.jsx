import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { Buffer } from "buffer";

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productDeliveryTime, setProductDeliveryTime] = useState("");
  const [productCompletionTime, setProductCompletionTime] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProductDetails(productId);
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://10.25.82.74:3000/api/products/${productId}`
      );
      const productData = response.data;

      setProductName(productData.name);
      setProductPrice(productData.price.toString());
      setProductDescription(productData.description);
      setProductDeliveryTime(productData.delivery_time);
      setProductCompletionTime(productData.completion_time);

      // Fetch product image
      const responseImage = await axios.get(
        `http://10.25.82.74:3000/api/products/${productId}/image`,
        { responseType: "arraybuffer" }
      );
      const base64Image = Buffer.from(responseImage.data, "binary").toString(
        "base64"
      );
      setProductImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveProduct = async () => {
    try {
      const productData = {
        name: productName,
        price: productPrice,
        description: productDescription,
        delivery_time: productDeliveryTime,
        completion_time: productCompletionTime,
      };

      const response = await axios.put(
        `http://10.25.82.74:3000/api/products/${productId}`,
        productData
      );

      if (!response.data) {
        throw new Error("Failed to save product changes");
      }

      Alert.alert("Success", "Product changes saved successfully!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save product changes");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          value={productName}
          onChangeText={setProductName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter description"
          value={productDescription}
          onChangeText={setProductDescription}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Delivery Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter delivery time"
          value={productDeliveryTime}
          onChangeText={setProductDeliveryTime}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Completion Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter completion time"
          value={productCompletionTime}
          onChangeText={setProductCompletionTime}
        />
      </View>
      {productImage && (
        <Image source={{ uri: productImage }} style={styles.image} />
      )}
      {uploading && <Text>Uploading...</Text>}
      <Button title="Save Changes" onPress={handleSaveProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 20,
  },
  label: {
    marginRight: 10,
    width: 100,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default EditProductScreen;
