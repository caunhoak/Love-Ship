import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterStoreScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState(null);
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const owner_id = await AsyncStorage.getItem("userId");
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
        "http://192.168.1.39:3000/api/stores",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const storeId = storeResponse.data._id;
      console.log(storeResponse.data);
      console.log("StoreId created:", storeId);
      if (storeId) {
        // Lưu userId vào AsyncStorage
        await AsyncStorage.setItem("storeId", storeId);

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
      <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
        <Text style={styles.buttonText}>Choose logo</Text>
      </TouchableOpacity>
      {logo && (
        <Image
          source={{ uri: logo }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}
      <Button title="Register" onPress={handleRegister} />
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

export default RegisterStoreScreen;
