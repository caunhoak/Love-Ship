// CreateStoreScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateStoreScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreateStore = async () => {
    try {
      const owner_id = await AsyncStorage.getItem("userId");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("owner_id", owner_id);

      const storeResponse = await axios.post(
        "http://192.168.1.39:3000/api/stores",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const storeId = storeResponse.data._id;

      if (storeId) {
        await AsyncStorage.setItem("storeId", storeId);
        navigation.navigate("StoreOwner");
      } else {
        console.error("No storeId returned from server");
      }
    } catch (error) {
      console.error("Error creating store:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register Store</Text>
      <TextInput
        placeholder="Store Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateStore}>
        <Text style={styles.buttonText}>Create Store</Text>
      </TouchableOpacity>
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CreateStoreScreen;
