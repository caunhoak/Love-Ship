import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import hook useNavigation

const HomeScreen = () => {
  const navigation = useNavigation(); // Sử dụng hook useNavigation để truy cập vào navigation
  const [searchText, setSearchText] = useState("");
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;

  const [stores, setStores] = useState([]);

  // Lấy danh sách cửa hàng từ backend
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get(`${urlLocalHost}/api/stores`);
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
            uri: `${urlLocalHost}/api/stores/${item._id}/image`,
          }}
          style={styles.logo}
        />
      )}
      <Text style={styles.storeInfo}>{item.address}</Text>
      <Text style={styles.storeInfo}>{item.phone}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleStore(item._id)} // Truyền storeId vào hàm handleStore
      >
        <Text style={styles.touchInput}>Xem cửa hàng</Text>
      </TouchableOpacity>
    </View>
  );

  const handleStore = (storeId) => {
    // Nhận storeId như một tham số
    navigation.navigate("ProductList", { storeId }); // Chuyển hướng và truyền storeId
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm cửa hàng"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <MaterialIcons name="search" size={24} color="black" />
        </View>
      </View>
      <FlatList
        data={stores.filter((store) =>
          store.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        renderItem={renderStoreItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.storeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "3%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: "3%",
    margin: "3%",
    flex: 1,
  },
  searchInput: {
    flex: 1,
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
    textAlign: "center",
  },
  logo: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  storeInfo: {
    marginBottom: "1%",
    textAlign: "center",
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
});

export default HomeScreen;
