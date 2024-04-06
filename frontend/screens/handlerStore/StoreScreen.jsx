import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";

const StoreScreen = () => {
  const [stores, setStores] = useState([]);

  // Lấy danh sách cửa hàng từ backend
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get("http://192.168.1.39:3000/api/stores");
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Render một mục cửa hàng
  const renderStoreItem = ({ item }) => (
    <View style={styles.storeContainer}>
      <Text style={styles.storeName}>{item.name}</Text>
      {item.logo_data && (
        <Image
          source={{
            uri: `http://192.168.1.39:3000/api/stores/${item._id}/image`,
          }}
          style={styles.logo}
        />
      )}
      <Text style={styles.storeInfo}>{item.address}</Text>
      <Text style={styles.storeInfo}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TÌM KIẾM CỬA HÀNG</Text>
      <FlatList
        data={stores}
        renderItem={renderStoreItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.storeList}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "3%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  storeList: {
    paddingBottom: "3%",
  },
  storeContainer: {
    marginBottom: "3%",
    backgroundColor: "#f0f0f0",
    padding: "3%",
    borderRadius: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  logo: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  storeInfo: {
    marginBottom: "1%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "3%",
  },
  footerButton: {
    padding: "3%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
});

export default StoreScreen;
