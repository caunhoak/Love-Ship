import React, { useState, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RegisterStoreScreen = () => {
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState(null);
  const navigation = useNavigation();
  const { userId, setStoreId } = useContext(CartContext);

  const handleRegister = async () => {
    try {
      const owner_id = userId;

      console.log("owner_id:", owner_id);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("owner_id", owner_id);

      if (logo) {
        formData.append("logo", {
          uri: logo,
          name: `logo.jpg`,
          type: `image/jpg`,
        });
      }

      const storeResponse = await axios.post(
        `${urlLocalHost}/api/stores`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const storeId = storeResponse.data._id;
      console.log("StoreId created:", storeId);
      if (storeId) {
        setStoreId(storeId);
        navigation.navigate("StoreOwner");
      } else {
        console.error("No storeId returned from server");
        Alert.alert("Lỗi đăng nhập", "Không có storeId trả về từ máy chủ");
      }
    } catch (error) {
      console.error("Error creating store:", error);
      Alert.alert("Error", "Failed to create store.");
    }
  };

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setLogo(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Store Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Store Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <Button
          title="Choose Image"
          onPress={handleChooseImage}
          style={styles.button}
        />
      </View>
      {logo && (
        <Image
          source={{ uri: logo }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}
      <View style={styles.submitButtonContainer}>
        <Button
          title="Register"
          onPress={handleRegister}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "5%",
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
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default RegisterStoreScreen;
