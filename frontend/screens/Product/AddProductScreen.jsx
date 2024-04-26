import React, { useState, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const AddProductScreen = ({ route }) => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productDeliveryTime, setProductDeliveryTime] = useState("");
  const [productCompletionTime, setProductCompletionTime] = useState("");
  const [productImage, setProductImage] = useState(null);
  const navigation = useNavigation();
  const { storeId } = useContext(CartContext);

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("store_id", storeId);
      formData.append("price", productPrice);
      formData.append("description", productDescription);
      formData.append("delivery_time", productDeliveryTime);
      formData.append("completion_time", productCompletionTime);
      formData.append("image", {
        uri: productImage,
        name: "image.jpg",
        type: "image/jpg",
      });

      const response = await axios.post(
        `${urlLocalHost}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Alert.alert("Success", "Product added successfully!");

      // Reset form fields
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductDeliveryTime("");
      setProductCompletionTime("");
      setProductImage(null);

      navigation.navigate("StoreOwner", {
        storeId,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add product!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Description"
          value={productDescription}
          onChangeText={setProductDescription}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Delivery Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Delivery Time"
          value={productDeliveryTime}
          onChangeText={setProductDeliveryTime}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Completion Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Completion Time"
          value={productCompletionTime}
          onChangeText={setProductCompletionTime}
        />
      </View>
      {productImage && (
        <Image
          source={{ uri: productImage }}
          style={{ width: 150, height: 100 }}
        />
      )}

      <View style={styles.submitButtonContainer}>
        <Button
          title="Choose Image"
          onPress={handleChooseImage}
          style={styles.button}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <Button title="Submit" onPress={handleSubmit} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: "5%",
    margin: "5%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  multilineInput: {
    height: 80,
  },
  button: {
    marginVertical: 10,
  },
  submitButtonContainer: {
    marginVertical: 10,
  },
});

export default AddProductScreen;
