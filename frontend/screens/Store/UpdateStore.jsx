import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const UpdateStore = ({ route }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Load store data if available
    const { store } = route.params;
    if (store) {
      setName(store.name);
      setAddress(store.address);
      setPhone(store.phone);
    }
  }, [route.params]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_LOCALHOST}/api/stores/${route.params.storeId}`,
        {
          name,
          address,
          phone,
        }
      );
      Alert.alert("Updated store successfully");
      console.log("Updated store successfully");
      navigation.navigate("ManagementStore", {
        storeId: route.params.storeId,
      });

      // Handle success, navigate to previous screen or show success message
    } catch (error) {
      console.error("Update failed:", error.message);
      // Handle error, show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên cửa hàng:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Địa chỉ:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Text style={styles.label}>Số điện thoại:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <Button title="Cập nhật" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default UpdateStore;
